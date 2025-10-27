import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0)
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
