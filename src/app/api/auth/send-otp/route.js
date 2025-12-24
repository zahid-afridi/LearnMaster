import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import pool from "@/config/db";
import { NextResponse } from "next/server";

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "5");
const OTP_RATE_LIMIT = parseInt(process.env.OTP_RATE_LIMIT || "3");

// ------------------------
// Send OTP email
// ------------------------
async function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

// ------------------------
// POST /api/auth/send-otp
// ------------------------
export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, password, bio, profile_images } = data;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // 1) Check if email already exists in users table
    const userExists = await pool.query(
      "SELECT 1 FROM users WHERE email=$1 LIMIT 1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // 2) Rate limit: OTP requests in last 1 hour
    const recentCountRes = await pool.query(
      "SELECT COUNT(*) FROM otp_verification WHERE email=$1 AND created_at > (NOW() - INTERVAL '1 hour')",
      [email]
    );
    const recentCount = parseInt(recentCountRes.rows[0].count || "0");
    if (recentCount >= OTP_RATE_LIMIT) {
      return NextResponse.json(
        { error: "Too many OTP requests. Try again later." },
        { status: 429 }
      );
    }

    // 3) Create/Update temp user (store hashed password)
    const password_hash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO temp_users (email, username, password_hash, bio, profile_images, created_at)
       VALUES ($1,$2,$3,$4,$5,NOW())
       ON CONFLICT (email) DO UPDATE 
         SET username = EXCLUDED.username,
             password_hash = EXCLUDED.password_hash,
             bio = EXCLUDED.bio,
             profile_images = EXCLUDED.profile_images,
             created_at = NOW()`,
      [email, name || "", password_hash, bio || "", profile_images || null]
    );

    // 4) Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 5) Insert OTP into otp_verification table
    await pool.query(
      "INSERT INTO otp_verification (email, otp, created_at) VALUES ($1, $2, NOW())",
      [email, otp]
    );

    // 6) Send OTP email
    const text = `Your verification code is ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`;
    await sendMail(email, "Your OTP Code", text);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
