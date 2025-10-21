import { NextResponse } from "next/server";
import pool from "../../../../config/db.js"; // correct relative path (goes 3 levels up)

// Toggle Like / Unlike for comments
export async function POST(req) {
  try {
    const { user_id, comment_id, post_id } = await req.json();

    if (!user_id || !comment_id)
      return NextResponse.json({ error: "Missing user_id or comment_id" }, { status: 400 });

    const existing = await pool.query(
      "SELECT * FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
      [user_id, comment_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
        [user_id, comment_id]
      );
      return NextResponse.json({ message: "Comment unliked" }, { status: 200 });
    }

    const result = await pool.query(
      `INSERT INTO comment_likes (user_id, comment_id, post_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, comment_id, post_id]
    );

    return NextResponse.json({ message: "Comment liked", like: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error in comment like:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get total likes of a comment
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const comment_id = searchParams.get("comment_id");

    if (!comment_id)
      return NextResponse.json({ error: "comment_id required" }, { status: 400 });

    const result = await pool.query(
      "SELECT COUNT(*) AS like_count FROM comment_likes WHERE comment_id = $1",
      [comment_id]
    );

    return NextResponse.json({
      success: true,
      like_count: parseInt(result.rows[0].like_count),
    });
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
