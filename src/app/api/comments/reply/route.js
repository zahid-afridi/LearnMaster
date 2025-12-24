import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import redis from "../../../../config/redis.js";

const CACHE_TTL = 60 * 5; // 5 minutes

/* ======================
   Redis Key Helpers
====================== */
const REPLIES_KEY = (commentId) => `replies:comment:${commentId}`;

/* ======================
   Redis Safe Helpers
====================== */
async function getCache(key) {
  try {
    return await redis.get(key);
  } catch (err) {
    console.warn("⚠ Redis GET failed:", err.message);
    return null;
  }
}

async function setCache(key, value, ttl = CACHE_TTL) {
  try {
    await redis.set(key, value, "EX", ttl);
  } catch (err) {
    console.warn("⚠ Redis SET failed:", err.message);
  }
}

async function invalidateCache(commentId) {
  if (!commentId) return;
  try {
    await redis.del(REPLIES_KEY(commentId));
  } catch (err) {
    console.warn("⚠ Redis DEL failed:", err.message);
  }
}

/* ======================
   POST — Add Reply
====================== */
export async function POST(req) {
  try {
    const { user_id, post_id = null, comment_id, comment_text } = await req.json();

    if (!user_id || !comment_id || !comment_text?.trim()) {
      return NextResponse.json(
        { success: false, message: "user_id, comment_id and comment_text are required" },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      `INSERT INTO comment_replies (user_id, post_id, comment_id, comment_text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, post_id, comment_id, comment_text.trim()]
    );

    await invalidateCache(comment_id);

    return NextResponse.json(
      {
        success: true,
        message: "Reply added successfully",
        data: rows[0],
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Reply Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to add reply" },
      { status: 500 }
    );
  }
}

/* ======================
   GET — Fetch Replies
====================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("comment_id");

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "comment_id is required" },
        { status: 400 }
      );
    }

    /* -------- Redis First -------- */
    const cachedReplies = await getCache(REPLIES_KEY(commentId));
    if (cachedReplies) {
      let data = [];

      try {
        data = JSON.parse(cachedReplies);
      } catch {
        await invalidateCache(commentId); // corrupted cache
      }

      return NextResponse.json({
        success: true,
        count: data.length,
        replies: data,
        cached: true,
      });
    }

    /* -------- DB Fallback -------- */
    const { rows } = await pool.query(
      `SELECT 
         r.reply_id,
         r.comment_text,
         r.created_at,
         u.user_id,
         u.username,
         u.profile_images
       FROM comment_replies r
       JOIN users u ON u.user_id = r.user_id
       WHERE r.comment_id = $1
       ORDER BY r.created_at ASC`,
      [commentId]
    );

    await setCache(REPLIES_KEY(commentId), JSON.stringify(rows));

    return NextResponse.json({
      success: true,
      count: rows.length,
      replies: rows,
      cached: false,
    });
  } catch (err) {
    console.error("GET Replies Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}
