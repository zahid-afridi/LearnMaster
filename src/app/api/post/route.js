import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import redis from "../../../config/redis.js";
import { verifyToken } from "../../../middleware/auth/verifytoken.js";
import cloudinary from "../../../libs/cloudinary.js";

const CACHE_TTL = 60 * 5; // 5 minutes
const POSTS_CACHE_KEY = "posts";

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

async function invalidatePostsCache() {
  try {
    await redis.del(POSTS_CACHE_KEY);
  } catch (err) {
    console.warn("⚠ Redis DEL failed:", err.message);
  }
}

/* ======================
   POST — Create Post
====================== */
export async function POST(req) {
  try {
    // Verify JWT
    const { decoded, error } = await verifyToken(req);
    if (error) return error;

    const user_id = decoded.user_id;
    const { title, subtitle, content, post_img, tags } = await req.json();

    // Validation
    const errors = [];
    if (!title) errors.push("Title is required");
    if (!content) errors.push("Content is required");
    if (post_img && !Array.isArray(post_img)) errors.push("post_img must be an array");
    if (tags && !Array.isArray(tags)) errors.push("tags must be an array");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Upload images to Cloudinary
    let uploadedImages = [];
    if (post_img?.length) {
      for (const img of post_img) {
        try {
          const uploaded = await cloudinary.uploader.upload(img, {
            folder: "learnmaster_posts",
            resource_type: "auto",
          });
          uploadedImages.push(uploaded.secure_url);
        } catch (err) {
          console.warn("⚠ Cloudinary upload failed:", err.message);
        }
      }
    }

    // Insert post into DB
    const { rows } = await pool.query(
      `INSERT INTO posts (user_id, title, subtitle, content, post_img, tags)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, subtitle || null, content, uploadedImages, tags || []]
    );

    await invalidatePostsCache();

    return NextResponse.json({
      success: true,
      message: "Post created successfully",
      data: rows[0],
    }, { status: 201 });
  } catch (err) {
    console.error("Create Post Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ======================
   GET — All Posts with Counts
====================== */
export async function GET() {
  try {
    // Redis first
    const cached = await getCache(POSTS_CACHE_KEY);
    if (cached) {
      let data = [];
      try {
        data = JSON.parse(cached);
      } catch {
        await invalidatePostsCache(); // remove corrupted cache
      }
      if (data.length) {
        console.log("Posts fetched from Redis");
        return NextResponse.json({ success: true, data, cached: true });
      }
    }

    // Fetch from DB with comment & like counts
    const { rows } = await pool.query(`
      SELECT 
        p.post_id,
        p.user_id,
        p.title,
        p.subtitle,
        p.content,
        p.post_img,
        p.tags,
        p.created_at,
        u.username AS user_name,
        u.profile_images,
        COALESCE(c.comment_count, 0) AS comments_count,
        COALESCE(l.like_count, 0) AS likes_count
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.user_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS comment_count
        FROM comments
        GROUP BY post_id
      ) c ON c.post_id = p.post_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS like_count
        FROM likes
        GROUP BY post_id
      ) l ON l.post_id = p.post_id
      ORDER BY p.created_at DESC
    `);

    await setCache(POSTS_CACHE_KEY, rows);

    console.log("Posts fetched from PostgreSQL");
    return NextResponse.json({ success: true, data: rows, cached: false });
  } catch (err) {
    console.error("Fetch Posts Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
