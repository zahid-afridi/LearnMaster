import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import redis from "../../../../config/redis.js";

const CACHE_EXPIRY = 60 * 5; // 5 minutes

// =====================
// Helper: Invalidate Like Cache
// =====================
async function invalidateLikeCache(comment_id) {
  if (!comment_id) return;
  await redis.del(`comment:${comment_id}:like_count`);
}

// =====================
// POST — Toggle Like / Unlike a Comment
// =====================
export async function POST(req) {
  try {
    const { user_id, comment_id, post_id } = await req.json();

    if (!user_id || !comment_id) {
      return NextResponse.json({ success: false, error: "Missing user_id or comment_id" }, { status: 400 });
    }

    const existing = await pool.query(
      "SELECT 1 FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
      [user_id, comment_id]
    );

    let message;
    if (existing.rows.length > 0) {
      // Unlike → remove
      await pool.query("DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2", [user_id, comment_id]);
      message = "Comment unliked";
    } else {
      // Like → insert
      await pool.query(
        `INSERT INTO comment_likes (user_id, comment_id, post_id)
         VALUES ($1, $2, $3)`,
        [user_id, comment_id, post_id]
      );
      message = "Comment liked";
    }

    // Invalidate Redis cache after like/unlike
    await invalidateLikeCache(comment_id);

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// =====================
// GET — Fetch Total Likes for a Comment
// =====================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const comment_id = searchParams.get("comment_id");

    if (!comment_id) {
      return NextResponse.json({ success: false, error: "comment_id required" }, { status: 400 });
    }

    // --- Check Redis cache first ---
    const cachedCount = await redis.get(`comment:${comment_id}:like_count`);
    if (cachedCount !== null) {
      return NextResponse.json({
        success: true,
        like_count: parseInt(cachedCount, 10),
        cached: true, // optional flag to indicate cache hit
      });
    }

    // --- Fetch from database ---
    const result = await pool.query(
      "SELECT COUNT(*) AS like_count FROM comment_likes WHERE comment_id = $1",
      [comment_id]
    );

    const likeCount = parseInt(result.rows[0].like_count, 10);

    // --- Cache the result in Redis ---
    await redis.setex(`comment:${comment_id}:like_count`, CACHE_EXPIRY, likeCount);

    return NextResponse.json({
      success: true,
      like_count: likeCount,
      cached: false,
    });
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
