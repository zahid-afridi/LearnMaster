import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";

// ✅ GET single post by blog_id
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const result = await pool.query(
      `SELECT sp.*, u.username, u.profole_images
       FROM single_posts sp
       JOIN users u ON sp.user_id = u.user_id
       WHERE sp.blog_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch post", details: error.message },
      { status: 500 }
    );
  }
}

//PUT — update a single post
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, subtitle, content, code_block, cover_image, tags } = await req.json();

    const result = await pool.query(
      `UPDATE single_posts
       SET title = $1, subtitle = $2, content = $3, code_block = $4,
           cover_image = $5, tags = $6, updated_at = CURRENT_TIMESTAMP
       WHERE blog_id = $7
       RETURNING *`,
      [title, subtitle, content, code_block, cover_image, tags, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Post updated successfully",
      post: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update post", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE single post
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const result = await pool.query(`DELETE FROM single_posts WHERE blog_id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete post", details: error.message },
      { status: 500 }
    );
  }
}
