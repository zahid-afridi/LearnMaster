import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import redis from "../../../config/redis.js";

const CACHE_EXPIRY = 60 * 5; // 5 minutes

export async function POST(req) {
  try {
    const { follower_id, following_id } = await req.json();

    // Validation
    if (!follower_id || !following_id) {
      return NextResponse.json(
        { error: "follower_id and following_id are required" },
        { status: 400 }
      );
    }

    // Prevent self-follow
    if (follower_id === following_id) {
      return NextResponse.json(
        { error: "You cannot follow yourself!" },
        { status: 400 }
      );
    }

    // Check if already following
    const checkQuery = `
      SELECT * FROM user_followers
      WHERE follower_id = $1 AND following_id = $2
    `;
    const check = await pool.query(checkQuery, [follower_id, following_id]);

    let message;
    let followed;

    if (check.rowCount > 0) {
      // Unfollow
      await pool.query(
        "DELETE FROM user_followers WHERE follower_id = $1 AND following_id = $2",
        [follower_id, following_id]
      );
      message = "User unfollowed successfully!";
      followed = false;
    } else {
      // Follow
      await pool.query(
        "INSERT INTO user_followers (follower_id, following_id) VALUES ($1, $2)",
        [follower_id, following_id]
      );
      message = "User followed successfully!";
      followed = true;
    }

    // Invalidate Redis cache for follower count of the target user
    await redis.del(`user:${following_id}:followers_count`);

    return NextResponse.json({ message, followed }, { status: 200 });
  } catch (error) {
    console.error("Follow toggle error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* =====================
   GET — Followers Count for a User
===================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    // Check Redis cache first
    const cachedCount = await redis.get(`user:${user_id}:followers_count`);
    if (cachedCount !== null) {
      return NextResponse.json({
        success: true,
        followers_count: parseInt(cachedCount, 10),
        cached: true,
      });
    }

    // Fetch from database if not cached
    const result = await pool.query(
      "SELECT COUNT(*) AS followers_count FROM user_followers WHERE following_id = $1",
      [user_id]
    );

    const followersCount = parseInt(result.rows[0].followers_count, 10);

    // Cache the result in Redis
    await redis.setex(`user:${user_id}:followers_count`, CACHE_EXPIRY, followersCount);

    return NextResponse.json({
      success: true,
      followers_count: followersCount,
      cached: false,
    });
  } catch (error) {
    console.error("Error fetching followers count:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
