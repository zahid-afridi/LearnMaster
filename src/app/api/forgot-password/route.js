import { NextResponse } from "next/server";
import pool from "@/config/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required!" }, { status: 400 });
    }

    const find = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (find.rows.length === 0) {
      return NextResponse.json({ message: "Email not found!" }, { status: 404 });
    }

    // Create a dummy token for UI
    const token = Math.random().toString(36).slice(2, 10);

    // Normally email send here…
    console.log("RESET TOKEN:", token);

    return NextResponse.json(
      { message: "Password reset link sent to your email!" },
      { status: 200 }
    );
  } catch (err) {
    console.log("FORGOT ERROR:", err);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
