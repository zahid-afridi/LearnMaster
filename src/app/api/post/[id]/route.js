import { NextResponse } from "next/server";
import pool from "../../../../config/db";
// import pool from "../../../../config/db.js";
// import pool from "../../../../config/db.js";





// GET Single Post 
export async function GET(res, { params }) {
    const { id } = params;
    try {

        const result = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1", [id]
        );

        if (result.rows.length === 0) {

            return NextResponse.json({ success: false, message: "Post Not Found !" }, { status: 404 })

        }
        return NextResponse.json({ success: true, data: result.rows[0] })


    } catch (error) {
        console.log("Error fetching post :", error);
        return NextResponse.json({ success: false, message: "Internal Server Error !", error: error.message }, { status: 500 })

    }
}



// UPDATE POST

export async function PUT(req, { params }) {
    const { id } = params;


    try {
        const { title, subtitle, content, post_img, tags } = await req.json();

        const result = await pool.query(
            `UPDATE posts
SET title = COALESCE($1, title),
    subtitle = COALESCE($2, subtitle),
    content = COALESCE($3, content),
    post_img = COALESCE($4, post_img),
    tags = COALESCE($5, tags),
    updated_at = CURRENT_TIMESTAMP
WHERE post_id = $6
RETURNING *;
`, [title, subtitle, content, post_img, tags, id]
        );

        if (result.rows.length === 0) {

            return NextResponse.json({ success: false, message: "Post Not Found !" }, { status: 404 })

        }
        return NextResponse.json({
            success: true,
            message: "Post updated successfully!",
            data: result.rows[0],
        })
    } catch (error) {
        console.log("Error Updating post : ", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );

    }
}


// DELETE POST
export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        const result = await pool.query("DELETE FROM posts WHERE post_id = $1 RETURNING *"
            , [id])
        if (result.rows.length === 0) {
            return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });



        }
        return NextResponse.json({ success: true, message: "Post deleted successfully", })

    } catch (error) {

        console.error(" Error deleting post:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}