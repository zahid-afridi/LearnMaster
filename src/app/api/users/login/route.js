import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "../../../../config/redis.js";

const CACHE_TTL = 60; // seconds

export async function POST(req) {
  try {
    // 1️⃣ Parse request body
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required!" },
        { status: 400 }
      );
    }

    // 2️⃣ Check Redis cache first
    let user;
    const cachedUser = await redis.get(`user_${email}`);
    if (cachedUser) {
      user = JSON.parse(cachedUser);
      console.log("⚡ User fetched from Redis cache");
    } else {
      // Fetch user from PostgreSQL
      const result = await pool.query(
        `SELECT user_id, username, email, password, profile_images, bio 
         FROM users WHERE email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password!" },
          { status: 401 }
        );
      }

      user = result.rows[0];

      // Cache user in Redis for 60 seconds
      try {
        await redis.setex(`user_${email}`, CACHE_TTL, JSON.stringify(user));
      } catch (redisErr) {
        console.warn("⚠ Redis cache set failed:", redisErr.message);
      }
    }

    // 3️⃣ Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password!" },
        { status: 401 }
      );
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🟢 Generated JWT Token:", token);

    // 5️⃣ Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Login successful ✅",
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          profile_images: user.profile_images || null,
          bio: user.bio || null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error, please try again!", details: err.message },
      { status: 500 }
    );
  }
}
