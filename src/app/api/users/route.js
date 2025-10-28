import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { verifyToken } from "../../../middleware/auth/verifytoken.js";


export const POST = async (req) => {
  try {
    const { name, email, password, bio, profile_images } = await req.json();

    if (!name || !email || !password || !bio) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: "Email already exists. Please login." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, bio, profile_images)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashedPassword, bio, profile_images]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2m" }
    );

    return NextResponse.json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};


// GET: Fetch all users  
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(" Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}



// PUT: Update a user  
export async function PUT(req) {
  const authError = await verifyToken(req);
  if (authError) return authError;

  try {
    const { user_id, name, email, bio, background_image, profile_images } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE users 
       SET username = COALESCE($1, username),
           email = COALESCE($2, email),
           bio = COALESCE($3, bio),
           background_image = COALESCE($4, background_image),
           profile_images = COALESCE($5, profile_images),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $6
       RETURNING *`,
      [name, email, bio, background_image, profile_images, user_id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
//  DELETE: Delete a user  
export async function DELETE(req) {
  const authError = await verifyToken(req);
  if (authError) return authError;

  try {
    const { user_id } = await req.json();
    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [user_id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      deletedUser: result.rows[0],
    });
  } catch (error) {
  console.error("❌ Error deleting user:", error.message, error.stack);
  return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
}

}

