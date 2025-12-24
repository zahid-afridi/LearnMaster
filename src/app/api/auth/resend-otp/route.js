import nodemailer from "nodemailer";
import pool from "@/config/db";
import { NextResponse } from "next/server";

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "5");
const OTP_RATE_LIMIT = parseInt(process.env.OTP_RATE_LIMIT || "3");

async function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const recentCountRes = await pool.query(
      "SELECT COUNT(*) FROM otp_verification WHERE email=$1 AND created_at > (NOW() - INTERVAL '1 hour')",
      [email]
    );
    const recentCount = parseInt(recentCountRes.rows[0].count || "0");
    if (recentCount >= OTP_RATE_LIMIT) {
      return NextResponse.json({ error: "Too many OTP requests. Try later." }, { status: 429 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await pool.query("INSERT INTO otp_verification (email, otp, created_at) VALUES ($1,$2,NOW())", [email, otp]);

    await sendMail(email, "Your OTP Code (Resend)", `Your OTP code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`);

    return NextResponse.json({ success: true, message: "OTP resent" });
  } catch (err) {
    console.error("resend-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
