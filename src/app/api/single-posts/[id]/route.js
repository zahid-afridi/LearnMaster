import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import redis from "../../../../config/redis.js";

const CACHE_TTL = 60 * 5; // 5 minutes

// -------------------------
// Redis Key Helper
// -------------------------
const getPostCacheKey = (id) => `post:${id}`;

// -------------------------
// GET — Fetch a single post
// -------------------------
export async function GET(req, { params }) {
  const { id } = params;
  try {
    // 1️⃣ Check Redis cache
    const cached = await redis.get(getPostCacheKey(id));
    if (cached) {
      let post = null;
      try {
        post = JSON.parse(cached);
      } catch {
        await redis.del(getPostCacheKey(id)); // invalidate corrupted cache
      }
      if (post) return NextResponse.json({ success: true, post, cached: true }, { status: 200 });
    }

    // 2️⃣ Fetch from DB
    const { rows } = await pool.query(
      `SELECT * FROM single_posts WHERE post_id = $1`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    const post = rows[0];

    // 3️⃣ Cache result in Redis
    await redis.setex(getPostCacheKey(id), CACHE_TTL, JSON.stringify(post));

    return NextResponse.json({ success: true, post, cached: false }, { status: 200 });
  } catch (err) {
    console.error("GET Single Post Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch post", details: err.message },
      { status: 500 }
    );
  }
}

// -------------------------
// PUT — Update a single post
// -------------------------
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { title, subtitle, content, code_block, cover_image, tags } = await req.json();

    const { rows } = await pool.query(
      `UPDATE single_posts
       SET title = $1, subtitle = $2, content = $3, code_block = $4,
           cover_image = $5, tags = $6, updated_at = CURRENT_TIMESTAMP
       WHERE singlepost_id = $7
       RETURNING *`,
      [title, subtitle, content, code_block, cover_image, tags, id]
    );

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    // Invalidate cache
    await redis.del(getPostCacheKey(id));

    return NextResponse.json({
      success: true,
      message: "Post updated successfully",
      post: rows[0],
    }, { status: 200 });
  } catch (err) {
    console.error("PUT Single Post Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update post", details: err.message },
      { status: 500 }
    );
  }
}

// -------------------------
// DELETE — Delete a single post
// -------------------------
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const { rows } = await pool.query(
      `DELETE FROM single_posts WHERE singlepost_id = $1 RETURNING *`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    // Invalidate cache
    await redis.del(getPostCacheKey(id));

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    }, { status: 200 });
  } catch (err) {
    console.error("DELETE Single Post Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete post", details: err.message },
      { status: 500 }
    );
  }
}
