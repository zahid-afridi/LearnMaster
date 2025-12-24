import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import redis from "../../../../config/redis.js";
import { verifyToken } from "../../../../middleware/auth/verifytoken.js";
import cloudinary from "../../../../libs/cloudinary.js";

const CACHE_TTL = 60; // 1 minute
const POST_KEY = (id) => `post:${id}`;
const POSTS_ALL_KEY = "posts_all";

/* ======================
   Redis Helpers
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
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (err) {
    console.warn("⚠ Redis SET failed:", err.message);
  }
}

async function invalidateCache(id) {
  try {
    await redis.del(POST_KEY(id));
    await redis.del(POSTS_ALL_KEY);
  } catch (err) {
    console.warn("⚠ Redis DEL failed:", err.message);
  }
}

/* ======================
   GET — Single Post
====================== */
export async function GET(req, { params }) {
  const { id } = params;

  // Redis first
  const cached = await getCache(POST_KEY(id));
  if (cached) {
    let data = null;
    try { data = JSON.parse(cached); } catch { await invalidateCache(id); }
    if (data) return NextResponse.json({ success: true, data, cached: true });
  }

  // Fetch from DB
  try {
    const { rows } = await pool.query(
      `SELECT 
         p.post_id, p.title, p.subtitle, p.content, p.post_img, p.tags, p.created_at,
         u.user_id, u.username AS user_name, u.profile_images
       FROM posts p
       LEFT JOIN users u ON p.user_id = u.user_id
       WHERE p.post_id = $1`,
      [id]
    );

    if (!rows.length)
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

    const post = rows[0];
    await setCache(POST_KEY(id), post);

    return NextResponse.json({ success: true, data: post });
  } catch (err) {
    console.error("Fetch Single Post Error:", err.message);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

/* ======================
   PUT — Update Post
====================== */
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { decoded, error } = await verifyToken(req);
    if (error) return error;

    const { title, subtitle, content, post_img, tags } = await req.json();

    // Upload new images if provided
    let uploadedImages = null;
    if (Array.isArray(post_img) && post_img.length > 0) {
      uploadedImages = [];
      for (const img of post_img) {
        try {
          const uploaded = await cloudinary.uploader.upload(img, { folder: "learnmaster_posts" });
          uploadedImages.push(uploaded.secure_url);
        } catch (err) { console.warn("⚠ Cloudinary upload failed:", err.message); }
      }
    }

    const { rows } = await pool.query(
      `UPDATE posts SET
         title = COALESCE($1, title),
         subtitle = COALESCE($2, subtitle),
         content = COALESCE($3, content),
         post_img = COALESCE($4, post_img),
         tags = COALESCE($5, tags),
         updated_at = CURRENT_TIMESTAMP
       WHERE post_id = $6 AND user_id = $7
       RETURNING *`,
      [title, subtitle, content, uploadedImages, tags, id, decoded.user_id]
    );

    if (!rows.length)
      return NextResponse.json({ success: false, message: "Post not found or unauthorized" }, { status: 404 });

    await invalidateCache(id);

    return NextResponse.json({ success: true, message: "Post updated successfully", data: rows[0] });
  } catch (err) {
    console.error("Update Post Error:", err.message);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

/* ======================
   DELETE — Remove Post
====================== */
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const { decoded, error } = await verifyToken(req);
    if (error) return error;

    const { rows } = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [id, decoded.user_id]
    );

    if (!rows.length)
      return NextResponse.json({ success: false, message: "Post not found or unauthorized" }, { status: 404 });

    await invalidateCache(id);

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete Post Error:", err.message);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}














