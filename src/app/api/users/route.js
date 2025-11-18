import { NextResponse } from "next/server";
import pool from "../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../../../libs/cloudinary"; //  Import Cloudinary
import { verifyToken } from "../../../middleware/auth/verifytoken.js";

// =================== REGISTER USER ===================
export const POST = async (req) => {
  try {
    const { name, email, password, bio, profile_images } = await req.json();

    //  Validate fields
    if (!name || !email || !password ) {
      // || !bio   remove from here 
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    //  Check existing user
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: "Email already exists. Please login." }, { status: 409 });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Upload profile image to Cloudinary (if provided)
    let uploadedImageUrl = null;
    if (profile_images) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profile_images, {
          folder: "learnmaster_users",
          resource_type: "auto",
        });
        uploadedImageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    }

    // ✅ Save user in database
    const result = await pool.query(
      `INSERT INTO users (username, email, password, bio, profile_images)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashedPassword, bio, uploadedImageUrl]
    );

    const user = result.rows[0];

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    return NextResponse.json({
      message: "User registered successfully ✅",
      user,
      token,
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};

// =================== FETCH USERS ===================
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// =================== UPDATE USER ===================
export async function PUT(req) {
  const { decoded, error } = await verifyToken(req);
  if (error) return error;

  try {
    const { user_id, name, email, bio, background_image, profile_images } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (decoded.user_id !== user_id) {
      return NextResponse.json({ error: "Unauthorized: You can only update your own account" }, { status: 403 });
    }

    let uploadedProfileImageUrl = null;
    if (profile_images) {
      try {
        const uploadRes = await cloudinary.uploader.upload(profile_images, {
          folder: "learnmaster_users",
          resource_type: "auto",
        });
        uploadedProfileImageUrl = uploadRes.secure_url;
      } catch (err) {
        console.error("Profile image upload failed:", err);
        return NextResponse.json({ error: "Profile image upload failed" }, { status: 500 });
      }
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
      [name, email, bio, background_image, uploadedProfileImageUrl, user_id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully ",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// =================== DELETE USER ===================
export async function DELETE(req) {
  const { decoded, error } = await verifyToken(req);
  if (error) return error;

  try {
    const { user_id } = await req.json();
    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (decoded.user_id !== user_id) {
      return NextResponse.json({ error: "Unauthorized: You can only delete your own account" }, { status: 403 });
    }

    const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [user_id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User deleted successfully 🗑️",
      deletedUser: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
  }
}
