import { NextResponse } from "next/server";
import pool from "../../../config/db";
import { validate as isUuid } from "uuid";

// Add a comment
export async function POST(req) {
    try {
        const { user_id, post_id, comment_text } = await req.json();

        if (!user_id || !post_id || !comment_text) {
            return NextResponse.json(
                { error: "user_id, post_id, and comment_text are required!" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `INSERT INTO comments (user_id, post_id, comment_text)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [user_id, post_id, comment_text]
        );

        return NextResponse.json({
            success: true,
            message: "Comment added successfully!",
            data: result.rows[0],
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error adding comment", details: error.message },
            { status: 500 }
        );
    }
}


// Get all comments for a post


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const post_id = searchParams.get("post_id");

        if (!post_id) {
            return NextResponse.json(
                { success: false, error: "post_id is required!" },
                { status: 400 }
            );
        }
        ///is uuid needed
      if (!isUuid(post_id)) {
        return NextResponse.json(
          { success: false, message: "invalid post id request" },
          { status: 400 }
        );
      }

      const existcomment = await pool.query(
        `SELECT * FROM comments WHERE post_id = $1`,
        [post_id]
      );;

      if (existcomment.rowCount === 0) {
        return NextResponse.json(
          { success: false, message: "no comments for this post" },
          { status: 404 }
        );
      }
        // Fetch comments along with user info
        const result = await pool.query(
            `SELECT 
          comments.comment_id,
          comments.user_id,
          comments.comment_text,
          comments.created_at,
          comments.updated_at,
          users.username,
          users.email
       FROM comments
       JOIN users ON comments.user_id = users.user_id
       WHERE comments.post_id = $1
       ORDER BY comments.created_at ASC`,
            [post_id]
        );
        return NextResponse.json({
            success: true,
            message: "Comments fetched successfully!",
            count: result.rowCount,
            data: result.rows,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Error fetching comments for this post!",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

//   Update comments


export async function PUT(req) {
  try {
    const { comment_id, comment_text } = await req.json();

    if (!comment_id || !comment_text) {
      return NextResponse.json(
        { error: "comment_id and comment_text are required!" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE comments 
       SET comment_text = $1, updated_at = NOW() 
       WHERE comment_id = $2 
       RETURNING *`,
      [comment_text, comment_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Comment updated successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { success: false, error: "Error updating comment", details: error.message },
      { status: 500 }
    );
  }
}



// Delete commmments



export async function DELETE(req) {
  try {
    
    const { searchParams } = new URL(req.url);
    const comment_id = searchParams.get("comment_id");

    if (!comment_id) {
      return NextResponse.json(
        { success: false, error: "comment_id is required!" },
        { status: 400 }
      );
    }

    
    const result = await pool.query(
      `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
      [comment_id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: "Comment not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully!",
      deletedComment: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, error: "Error deleting comment", details: error.message },
      { status: 500 }
    );
  }
}

