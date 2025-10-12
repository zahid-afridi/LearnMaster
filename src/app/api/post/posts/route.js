import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";

export async function POST(req) {
    try {
        const { user_id, content, post_img } = await req.json();
        
  

        const missingFields = [];

        if (!user_id) missingFields.push("user_id is required");
        if (!content) missingFields.push("content is required");
        if (post_img && !Array.isArray(post_img))
            missingFields.push("post_img must be an array");

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    message: missingFields,
                    success: false,
                },
                { status: 400 }
            );
        }

        // Insert into database
        const result = await pool.query(
            `INSERT INTO posts (user_id, content, post_img)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [user_id, content, post_img]
        );

        return NextResponse.json(
            {
                message: "Post created successfully",
                data: result.rows[0],
                success: true,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error.message,
                success: false,
            },
            { status: 500 }
        );
    }
}
