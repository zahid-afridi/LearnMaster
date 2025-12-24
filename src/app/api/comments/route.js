import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import redis from "../../../config/redis.js";

const CACHE_TTL = 60 * 5; // 5 minutes

/* ======================
   Redis Key Helpers
====================== */
const COMMENTS_KEY = (postId) => `comments:post:${postId}`;
const COUNT_KEY = (postId) => `comments:count:${postId}`;

/* ======================
   Redis Helpers (Safe)
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

async function invalidateCache(postId) {
  if (!postId) return;
  try {
    await Promise.all([
      redis.del(COMMENTS_KEY(postId)),
      redis.del(COUNT_KEY(postId)),
    ]);
  } catch (err) {
    console.warn("⚠ Redis DEL failed:", err.message);
  }
}

/* ======================
   POST — Add Comment
====================== */
export async function POST(req) {
  try {
    const { user_id, post_id, comment_text } = await req.json();

    if (!user_id || !post_id || !comment_text?.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      `INSERT INTO comments (user_id, post_id, comment_text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, post_id, comment_text.trim()]
    );

    await invalidateCache(post_id);

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      data: rows[0],
    });
  } catch (err) {
    console.error("POST Comment Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ======================
   GET — Comments / Count
====================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("post_id");
    const countOnly = searchParams.get("count") === "true";

    if (!postId) {
      return NextResponse.json(
        { success: false, message: "post_id is required" },
        { status: 400 }
      );
    }

    /* -------- COUNT ONLY -------- */
    if (countOnly) {
      const cachedCount = await getCache(COUNT_KEY(postId));
      if (cachedCount !== null) {
        return NextResponse.json({
          success: true,
          post_id: postId,
          count: Number(cachedCount),
          cached: true,
        });
      }

      const { rows } = await pool.query(
        `SELECT COUNT(*) FROM comments WHERE post_id = $1`,
        [postId]
      );

      const count = Number(rows[0].count);
      await setCache(COUNT_KEY(postId), count);

      return NextResponse.json({ success: true, post_id: postId, count });
    }

    /* -------- FULL COMMENTS -------- */
    const cachedComments = await getCache(COMMENTS_KEY(postId));
    if (cachedComments) {
      let data = [];

      try {
        data = JSON.parse(cachedComments);
      } catch {
        await invalidateCache(postId); // remove corrupted cache
      }

      return NextResponse.json({
        success: true,
        post_id: postId,
        total_comments: data.length,
        data,
        cached: true,
      });
    }

    const { rows } = await pool.query(
      `SELECT
         c.comment_id,
         c.comment_text,
         c.created_at,
         u.user_id,
         u.username,
         u.profile_images
       FROM comments c
       JOIN users u ON u.user_id = c.user_id
       WHERE c.post_id = $1
       ORDER BY c.created_at DESC`,
      [postId]
    );

    await setCache(COMMENTS_KEY(postId), JSON.stringify(rows));

    return NextResponse.json({
      success: true,
      post_id: postId,
      total_comments: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error("GET Comments Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ======================
   PUT — Update Comment
====================== */
export async function PUT(req) {
  try {
    const { comment_id, comment_text, post_id } = await req.json();

    if (!comment_id || !comment_text?.trim()) {
      return NextResponse.json(
        { success: false, message: "comment_id and text required" },
        { status: 400 }
      );
    }

    const { rows, rowCount } = await pool.query(
      `UPDATE comments
       SET comment_text = $1, updated_at = NOW()
       WHERE comment_id = $2
       RETURNING *`,
      [comment_text.trim(), comment_id]
    );

    if (!rowCount) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    await invalidateCache(post_id);

    return NextResponse.json({
      success: true,
      message: "Comment updated",
      data: rows[0],
    });
  } catch (err) {
    console.error("PUT Comment Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ======================
   DELETE — Remove Comment
====================== */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("comment_id");
    const postId = searchParams.get("post_id");

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "comment_id required" },
        { status: 400 }
      );
    }

    const { rows, rowCount } = await pool.query(
      `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
      [commentId]
    );

    if (!rowCount) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    await invalidateCache(postId);

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
      data: rows[0],
    });
  } catch (err) {
    console.error("DELETE Comment Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}




