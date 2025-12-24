import pool from "@/config/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "5");

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
    }

    // Find latest OTP
    const otpRes = await pool.query(
      "SELECT * FROM otp_verification WHERE email=$1 ORDER BY created_at DESC LIMIT 1",
      [email]
    );
    if (otpRes.rows.length === 0) {
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 404 });
    }

    const row = otpRes.rows[0];
    const created = new Date(row.created_at);
    const now = new Date();
    const diffMinutes = (now - created) / 1000 / 60;

    if (diffMinutes > OTP_EXPIRY_MINUTES) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (String(row.otp) !== String(otp)) {
      await pool.query("UPDATE otp_verification SET attempts = attempts + 1 WHERE id=$1", [
        row.id,
      ]);
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Get temp user
    const tempRes = await pool.query("SELECT * FROM temp_users WHERE email=$1 LIMIT 1", [email]);
    if (tempRes.rows.length === 0) {
      return NextResponse.json({ error: "Temporary user data missing" }, { status: 404 });
    }

    const temp = tempRes.rows[0];

    // Insert into users (REAL USERS TABLE)
    const insertRes = await pool.query(
      `INSERT INTO users (username, email, password, bio, profile_images, is_verified, is_active, created_at)
       VALUES ($1, $2, $3, $4, $5, TRUE, TRUE, NOW())
       RETURNING user_id, username, email, bio, profile_images`,
      [temp.username, temp.email, temp.password_hash, temp.bio, temp.profile_images]
    );

    const user = insertRes.rows[0];

    // Cleanup temp + OTP
    await pool.query("DELETE FROM temp_users WHERE email=$1", [email]);
    await pool.query("DELETE FROM otp_verification WHERE email=$1", [email]);

    // Create JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ success: true, token, user });
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
