import { NextResponse } from "next/server";
import pool from "../../../config/db.js";

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
export async function POST(req) {
  try {
    const { username, email, password, bio, background_image, profole_images } = await req.json();

    // Basic validation
    if (!username || !email || !password || !bio) {
      return NextResponse.json(
        { error: "Please provide username, email, password, and bio" },
        { status: 400 }
      );
    }

    // Insert user
    const insertQuery = `
      INSERT INTO users (username, email, password, bio, background_image, profole_images)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [
      username,
      email,
      password,
      bio,
      background_image || null,
      profole_images || null,
    ]);

    return NextResponse.json({
      message: "✅ User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

/* --------------------  PUT: Update a user  -------------------- */
export async function PUT(req) {
  try {
    const { user_id, username, email, bio, background_image, profole_images } = await req.json();

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
        profole_images = COALESCE($5, profole_images),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $6
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      username,
      email,
      bio,
      background_image,
      profole_images,
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
