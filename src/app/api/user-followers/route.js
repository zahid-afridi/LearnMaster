import { NextResponse } from "next/server";
import pool from "../../../config/db";

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

    //  Check if already following
    const checkQuery = `
      SELECT * FROM user_followers
      WHERE follower_id = $1 AND following_id = $2
    `;
    const check = await pool.query(checkQuery, [follower_id, following_id]);

    if (check.rowCount > 0) {
      // 👎 Already following ===> Unfollow
      await pool.query(
        "DELETE FROM user_followers WHERE follower_id = $1 AND following_id = $2",
        [follower_id, following_id]
      );

      return NextResponse.json({
        message: "User unfollowed successfully!",
        followed: false,
      });
    } else {
      //  Not following → Follow
      await pool.query(
        "INSERT INTO user_followers (follower_id, following_id) VALUES ($1, $2)",
        [follower_id, following_id]
      );

      return NextResponse.json({
        message: "User followed successfully!",
        followed: true,
      });
    }
  } catch (error) {
    console.error("Follow toggle error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
