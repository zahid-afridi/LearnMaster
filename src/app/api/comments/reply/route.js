// This The commets-Replies Api    <=-=-=-===-=-==|||
import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";

// Create a new reply to a comment
export async function POST(req) {
    try {
        const { user_id, post_id, comment_id, comment_text } = await req.json();

        if (!user_id || !comment_id || !comment_text) {
            return NextResponse.json(
                { error: "user_id, comment_id, and comment_text are required!" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `INSERT INTO comment_replies (user_id, post_id, comment_id, comment_text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [user_id, post_id, comment_id, comment_text]
        );

        return NextResponse.json(
            {
                success: true,
                message: "Reply added successfully!",
                reply: result.rows[0],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding reply:", error);
        return NextResponse.json(
            { success: false, error: "Failed to add reply", details: error.message },
            { status: 500 }
        );
    }
}

// Get all replies for a specific comment
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const comment_id = searchParams.get("comment_id");

        if (!comment_id) {
            return NextResponse.json(
                { error: "comment_id is required!" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `SELECT 
      r.reply_id,
      r.comment_text,
      r.created_at,
      u.user_id,
      u.username,
      u.profole_images 
   FROM comment_replies r
   JOIN users u ON r.user_id = u.user_id
   WHERE r.comment_id = $1
   ORDER BY r.created_at ASC`,
            [comment_id]
        );

        return NextResponse.json(
            {
                success: true,
                count: result.rowCount,
                replies: result.rows,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching replies:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch replies", details: error.message },
            { status: 500 }
        );
    }
}
