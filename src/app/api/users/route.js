import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import bcrypt from "bcrypt";
import { upload } from "../../../middleware/multer.js";
import nextConnect from "next-connect";
import { writeFile } from "fs/promises";
import path from "path";
/* --------------------  GET: Fetch all users  -------------------- */
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

/* --------------------  POST: Create a new user  -------------------- */
export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const bio = formData.get("bio");
    const file = formData.get("profile_image");

    if (!name || !email || !password || !bio) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🖼️ Handle image upload (save manually)
    let imagePath = null;
    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `profile-${Date.now()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${fileName}`; // Public URL path
    }
       const Isemail = await pool.query(`SELECT email FROM users WHERE email=$1`, [email]);
        if (Isemail.rows.length > 0) {
            return NextResponse.json({
                message: "email is already exists. Please Login!"
            }, { status: 404 })
        }

    // 💾 Save user in DB
    const insertQuery = `
      INSERT INTO users (username, email, password, bio, profile_images)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [
      name,
      email,
      hashedPassword,
      bio,
      imagePath,
    ]);

    return NextResponse.json({
      message: "✅ User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};
/* --------------------  PUT: Update a user  -------------------- */
export async function PUT(req) {
  try {
    const { user_id, name, email, bio, background_image, profile_images } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updateQuery = `
      UPDATE users 
      SET 
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        bio = COALESCE($3, bio),
        background_image = COALESCE($4, background_image),
        profile_images = COALESCE($5, profile_image),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $6
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      name,
      email,
      bio,
      background_image,
      profile_images,
      user_id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "✅ User updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

/* --------------------  DELETE: Delete a user  -------------------- */
export async function DELETE(req) {
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
      message: "✅ User deleted successfully",
      deletedUser: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
