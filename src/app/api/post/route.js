import { NextResponse } from "next/server";
import pool from "../../../config/db.js"; // adjust path if needed

export async function POST(req) {
    try {
        //  Parse request body correctly
        const { user_id, title, subtitle, content, post_img, tags } = await req.json();

        // Validation array
        let errors = [];

        if (!user_id) errors.push("User_id is required!");
        if (!title) errors.push("Title is required!");
        if (!content) errors.push("Content is required!");
        if (post_img && !Array.isArray(post_img)) errors.push("post_img must be an array!");
        if (tags && !Array.isArray(tags)) errors.push("tags must be an array!");

        // Stop if validation failed
        if (errors.length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        //  Insert post into database
        const result = await pool.query(
            `INSERT INTO posts (user_id, title, subtitle, content, post_img, tags)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [user_id, title, subtitle, content, post_img, tags]
        );

        return NextResponse.json({
            success: true,
            message: "Post created successfully!",
            post: result.rows[0],
        });
    } catch (error) {
        console.error("Create Post Error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error in Create Post!",
            error: error.message,
        }, { status: 500 });
    }
}



// all posts 
// import { NextResponse } from "next/server";
// import pool from "../../../config/db.js";

// ✅ GET All Posts
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM posts");

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

