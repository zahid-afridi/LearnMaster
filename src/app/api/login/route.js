import { NextResponse } from "next/server";
import pool from "@/config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required!" },
        { status: 400 }
      );
    }

    // Find user by email
    const userQuery = await pool.query(
      `SELECT user_id, username, email, password, profile_images, bio 
       FROM users 
       WHERE email = $1`,
      [email]
    );

    if (userQuery.rows.length === 0) {
      return NextResponse.json(
       
        console.log("Error is Here"),
        

        { success: false, message: "Invalid email or password!" },
        { status: 401 }
        
        
      );
    }

    const user = userQuery.rows[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password!" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          profile_images: user.profile_images,
          bio: user.bio,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error, please try again!" },
      { status: 500 }
    );
  }
}
