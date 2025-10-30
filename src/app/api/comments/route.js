import { NextResponse } from "next/server";
import pool from "../../../config/db";
import { validate as isUuid } from "uuid";

/* =====================
   POST — Add a Comment
===================== */
export async function POST(req) {
  try {
    const { user_id, post_id, comment_text } = await req.json();

    if (!user_id || !post_id || !comment_text) {
      return NextResponse.json(
        { success: false, error: "user_id, post_id, and comment_text are required!" },
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
    console.error("❌ Error adding comment:", error);
    return NextResponse.json(
      { success: false, error: "Error adding comment", details: error.message },
      { status: 500 }
    );
  }
}



/* =====================
   GET — Count Comments Per Post
===================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");

    if (post_id) {
      // 🟢 Count comments for a specific post
      const result = await pool.query(
        `SELECT COUNT(*) AS comment_count
         FROM comments
         WHERE post_id = $1`,
        [post_id]
      );

      return NextResponse.json({
        success: true,
        message: "Comment count fetched successfully!",
        post_id,
        count: parseInt(result.rows[0].comment_count, 10),
      });
    } else {
      // 🟡 Count comments for ALL posts
      const result = await pool.query(`
        SELECT 
          p.post_id,
          p.title,
          COUNT(c.comment_id) AS comment_count
        FROM posts p
        LEFT JOIN comments c ON p.post_id = c.post_id
        GROUP BY p.post_id, p.title
        ORDER BY comment_count DESC
      `);

      return NextResponse.json({
        success: true,
        message: "Comment counts for all posts fetched successfully!",
        data: result.rows,
      });
    }
  } catch (error) {
    console.error("❌ Error fetching comment counts:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching comment counts", details: error.message },
      { status: 500 }
    );
  }
}


/* =====================
   PUT — Update a Comment
===================== */
export async function PUT(req) {
  try {
    const { comment_id, comment_text } = await req.json();

    if (!comment_id || !comment_text) {
      return NextResponse.json(
        { success: false, error: "comment_id and comment_text are required!" },
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

    if (result.rowCount === 0) {
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
    console.error(" Error updating comment:", error);
    return NextResponse.json(
      { success: false, error: "Error updating comment", details: error.message },
      { status: 500 }
    );
  }
}

/* =====================
   DELETE — Remove a Comment
===================== */
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
    console.error(" Error deleting comment:", error);
    return NextResponse.json(
      { success: false, error: "Error deleting comment", details: error.message },
      { status: 500 }
    );
  }
}



// count comment for post 
// export const GetcountComment = async (req, res) => {
//   try {
//     const Commentcount = await pool.query(`SELECT COUNT(*) AS total_comment FROM post_comments`);

//     return res.status(200).json({
//       message: "Total comment count fetched successfully!",
//       success: true,
//       total_comment: parseInt(Commentcount.rows[0].total_comment), 
//     });
//   } catch (error) {
//     console.error("GetAllcommentCount error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// get all comments
// export const GetAllcoments = async (req, res) => {
//     try {
//         const Getallcom = await pool.query(`SELECT * FROM post_comments`);

//         if (Getallcom.rowCount === 0) {
//             return res.status(404).json({
//                 message: "comments not found!",
//                 success: false
//             })
//         };

//         return res.status(200).json({
//             message: "comments found!",
//             success: true,
//             comment: Getallcom.rows,
//         })
//     } catch (error) {
//         console.error("Get comments errer:", error);
//         res.status(500).json({ message: "Internal Server Error", success: false });
//     }
// };