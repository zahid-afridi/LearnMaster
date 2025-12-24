"use server";
import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../../../libs/cloudinary.js";
import { verifyToken } from "../../../middleware/auth/verifytoken.js";
import redis from "../../../config/redis.js";

// ===================
// Config
// ===================
const USERS_CACHE_KEY = "users_all";
const CACHE_TTL = 300; // seconds

// ===================
// Helper Functions
// ===================
const uploadImage = async (image, folder = "learnmaster") => {
  if (!image) return null;
  const uploaded = await cloudinary.uploader.upload(image, { folder, resource_type: "auto" });
  return uploaded.secure_url;
};

const clearCache = async (key) => {
  await redis.del(key);
};

// ===================
// REGISTER USER
// ===================
export const POST = async (req) => {
  try {
    const { name, email, password, bio, profile_images } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const existing = await pool.query("SELECT 1 FROM users WHERE email=$1", [email]);
    if (existing.rows.length)
      return NextResponse.json({ message: "Email already exists. Please login." }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const uploadedImageUrl = await uploadImage(profile_images);

    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password, bio, profile_images)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashedPassword, bio, uploadedImageUrl]
    );

    const user = rows[0];
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await clearCache(USERS_CACHE_KEY);

    return NextResponse.json({ message: "User registered successfully", user, token }, { status: 201 });
  } catch (error) {
    console.error("POST /users Error:", error);
    return NextResponse.json({ error: "Failed to create user", details: error.message }, { status: 500 });
  }
};

// ===================
// GET USERS (with Redis caching)
// ===================
export async function GET() {
  try {
    const cachedUsers = await redis.get(USERS_CACHE_KEY);
    if (cachedUsers) {
      const users = JSON.parse(cachedUsers);
      return NextResponse.json({ success: true, cached: true, count: users.length, users }, { status: 200 });
    }

    const { rows } = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    await redis.setex(USERS_CACHE_KEY, CACHE_TTL, JSON.stringify(rows));

    return NextResponse.json({ success: true, cached: false, count: rows.length, users: rows }, { status: 200 });
  } catch (error) {
    console.error("GET /users Error:", error);
    return NextResponse.json({ error: "Failed to fetch users", details: error.message }, { status: 500 });
  }
}

// ===================
// UPDATE USER
// ===================
export async function PUT(req) {
  const { decoded, error } = await verifyToken(req);
  if (error) return error;

  try {
    const { user_id, name, email, bio, background_image, profile_images } = await req.json();
    if (!user_id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    if (decoded.user_id !== user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const uploadedProfileImageUrl = await uploadImage(profile_images);

    const { rows } = await pool.query(
      `UPDATE users
       SET username=COALESCE($1, username),
           email=COALESCE($2, email),
           bio=COALESCE($3, bio),
           background_image=COALESCE($4, background_image),
           profile_images=COALESCE($5, profile_images),
           updated_at=CURRENT_TIMESTAMP
       WHERE user_id=$6
       RETURNING *`,
      [name, email, bio, background_image, uploadedProfileImageUrl, user_id]
    );

    if (!rows.length) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await clearCache(USERS_CACHE_KEY);

    return NextResponse.json({ message: "User updated successfully", user: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("PUT /users Error:", error);
    return NextResponse.json({ error: "Failed to update user", details: error.message }, { status: 500 });
  }
}

// ===================
// DELETE USER
// ===================
export async function DELETE(req) {
  const { decoded, error } = await verifyToken(req);
  if (error) return error;

  try {
    const { user_id } = await req.json();
    if (!user_id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    if (decoded.user_id !== user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { rows } = await pool.query("DELETE FROM users WHERE user_id=$1 RETURNING *", [user_id]);
    if (!rows.length) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await clearCache(USERS_CACHE_KEY);

    return NextResponse.json({ message: "User deleted successfully", deletedUser: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("DELETE /users Error:", error);
    return NextResponse.json({ error: "Failed to delete user", details: error.message }, { status: 500 });
  }
}
