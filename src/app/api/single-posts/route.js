import { NextResponse } from "next/server";
import pool from "../../../config/db.js";

// Create a new single post
export async function POST(req) {
  try {
    const { post_id, title, subtitle, content, code_block, cover_image, tags } = await req.json();

    // Validate inputs
    if (!post_id || !title || !content) {
      return NextResponse.json(
        { error: "post_id, title, and content are required!" },
        { status: 400 }
      );
    }

    //  Insert into DB
    const result = await pool.query(
      `INSERT INTO single_posts 
        (post_id, title, subtitle, content, code_block, cover_image, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [post_id, title, subtitle || null, content, code_block || null, cover_image || [], tags || []]
    );

    return NextResponse.json({
      success: true,
      message: "Single post created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating single post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create single post", details: error.message },
      { status: 500 }
    );
  }
}

// Get all single posts
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        sp.*, 
        u.username, 
        u.profole_images
      FROM single_posts sp
      JOIN posts p ON sp.post_id = p.post_id
      JOIN users u ON p.user_id = u.user_id
      ORDER BY sp.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      posts: result.rows,
    });
  } catch (error) {
    console.error("Error fetching single posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch single posts", details: error.message },
      { status: 500 }
    );
  }
}
