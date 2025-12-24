import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import redis from "../../../config/redis.js"; // Redis instance

const CACHE_EXPIRY = 60 * 5; // 5 minutes
const ALL_POSTS_CACHE_KEY = "posts:all";

// =====================
// POST — Create a new single post
// =====================
export async function POST(req) {
  try {
    const { post_id, title, subtitle, content, code_block, cover_image, tags } = await req.json();

    // Validate required fields
    if (!post_id || !title || !content) {
      return NextResponse.json(
        { success: false, error: "post_id, title, and content are required!" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO single_posts 
        (post_id, title, subtitle, content, code_block, cover_image, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [post_id, title, subtitle || null, content, code_block || null, cover_image || [], tags || []]
    );

    // Invalidate cached all posts
    await redis.del(ALL_POSTS_CACHE_KEY);

    return NextResponse.json({
      success: true,
      message: "Single post created successfully",
      data: result.rows[0],
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating single post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create single post", details: error.message },
      { status: 500 }
    );
  }
}

// =====================
// GET — Fetch all single posts
// =====================
export async function GET() {
  try {
    // Check Redis cache first
    const cachedPosts = await redis.get(ALL_POSTS_CACHE_KEY);
    if (cachedPosts) {
      return NextResponse.json({
        success: true,
        count: JSON.parse(cachedPosts).length,
        posts: JSON.parse(cachedPosts),
        cached: true, // optional flag
      }, { status: 200 });
    }

    // Fetch from DB if not cached
    const result = await pool.query(`
      SELECT 
        sp.*, 
        u.username, 
        u.profile_images
      FROM single_posts sp
      JOIN posts p ON sp.post_id = p.post_id
      JOIN users u ON p.user_id = u.user_id
      ORDER BY sp.created_at DESC
    `);

    // Cache the result
    await redis.setex(ALL_POSTS_CACHE_KEY, CACHE_EXPIRY, JSON.stringify(result.rows));

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      posts: result.rows,
      cached: false,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching single posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch single posts", details: error.message },
      { status: 500 }
    );
  }
}
