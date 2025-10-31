import { NextResponse } from "next/server";
import pool from "../../../config/db.js";

// ========================= TOGGLE LIKE =========================
export async function POST(req) {
  try {
    const { user_id, post_id } = await req.json();

    if (!user_id || !post_id)
      return NextResponse.json(
        { success: false, error: "user_id and post_id required" },
        { status: 400 }
      );

    // Check if user already liked this post
    const existing = await pool.query(
      `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`,
      [user_id, post_id]
    );

    if (existing.rowCount > 0) {
      // Unlike → remove the record
      const removed = await pool.query(
        `DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *`,
        [user_id, post_id]
      );

      return NextResponse.json({
        success: true,
        message: "Like removed",
        liked: false,
        data: removed.rows[0],
      });
    } else {
      // Like → insert new record
      const added = await pool.query(
        `INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *`,
        [user_id, post_id]
      );

      return NextResponse.json({
        success: true,
        message: "Like added",
        liked: true,
        data: added.rows[0],
      });
    }
  } catch (err) {
    console.error("Toggle like error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ========================= GET LIKES (JOIN + COUNT) =========================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json(
        { success: false, error: "post_id is required!" },
        { status: 400 }
      );
    }

    //  Get likes + user info (JOIN)
    const likesData = await pool.query(
      `
      SELECT 
        likes.like_id,
        likes.user_id,
        likes.post_id,
        users.user_name,
        users.profile_images
      FROM likes
      JOIN users ON likes.user_id = users.user_id
      WHERE likes.post_id = $1
      ORDER BY likes.like_id DESC
      `,
      [post_id]
    );

    //  Get total like count (can also be likesData.rowCount)
    const countResult = await pool.query(
      `SELECT COUNT(*) AS total_likes FROM likes WHERE post_id = $1`,
      [post_id]
    );

    const totalLikes = Number(countResult.rows[0].total_likes);

    return NextResponse.json(
      {
        success: true,
        message: "Likes fetched successfully",
        count: totalLikes,
        data: likesData.rows, // includes user info
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching likes for this post!" },
      { status: 500 }
    );
  }
}
