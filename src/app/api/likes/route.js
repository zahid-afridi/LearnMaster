import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import redis from "../../../config/redis.js";
import { verifyToken } from "../../../middleware/auth/verifytoken.js";

const CACHE_TTL = 120; // seconds
const LIKES_KEY = (postId) => `likes:${postId}`;

// ---------------- Redis Helpers ----------------
const getCache = async (key) => {
  try { return await redis.get(key); } 
  catch (err) { console.warn("⚠ Redis GET failed:", err.message); return null; }
};
const setCache = async (key, value, ttl = CACHE_TTL) => {
  try { await redis.set(key, JSON.stringify(value), "EX", ttl); } 
  catch (err) { console.warn("⚠ Redis SET failed:", err.message); }
};
const invalidateCache = async (postId) => {
  if (!postId) return;
  try { await redis.del(LIKES_KEY(postId)); } 
  catch (err) { console.warn("⚠ Redis DEL failed:", err.message); }
};

// ---------------- GET Likes ----------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("post_id");
    if (!postId) return NextResponse.json({ success: false, message: "post_id is required" }, { status: 400 });

    const cached = await getCache(LIKES_KEY(postId));
    if (cached) {
      try { 
        return NextResponse.json({ success: true, data: JSON.parse(cached), cached: true }); 
      } catch { await invalidateCache(postId); }
    }

    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS likes_count FROM likes WHERE post_id=$1`,
      [postId]
    );
    const result = rows[0];
    await setCache(LIKES_KEY(postId), result);

    return NextResponse.json({ success: true, data: result, cached: false });
  } catch (err) {
    console.error("GET Likes Error:", err.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// ---------------- POST — Toggle Like ----------------
export async function POST(req) {
  try {
    // JWT Authentication
    const { decoded, error } = await verifyToken(req);
    if (error) return error;

    const { post_id } = await req.json();
    if (!post_id) return NextResponse.json({ success: false, message: "post_id is required" }, { status: 400 });

    const { rows } = await pool.query(
      `SELECT like_id FROM likes WHERE post_id=$1 AND user_id=$2`,
      [post_id, decoded.user_id]
    );

    let message = "";
    if (rows.length) {
      await pool.query(`DELETE FROM likes WHERE like_id=$1`, [rows[0].like_id]);
      message = "Like removed";
    } else {
      await pool.query(`INSERT INTO likes(post_id, user_id) VALUES($1, $2)`, [post_id, decoded.user_id]);
      message = "Like added";
    }

    await invalidateCache(post_id);
    return NextResponse.json({ success: true, message });
  } catch (err) {
    console.error("POST Likes Error:", err.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
