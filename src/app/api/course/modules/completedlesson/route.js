import { NextResponse } from "next/server";
import pool from "../../../../../../utils/db";
import { validate as isUuid } from "uuid";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, courseId, moduleId, lessonId } = body;

        // Validate UUIDs
        if (![userId, courseId, moduleId, lessonId].every(id => isUuid(id))) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid UUID format for user, course, module, or lesson",
                },
                { status: 400 }
            );
        }

        // Check if user exists
        const userCheck = await pool.query(
            "SELECT user_id FROM users WHERE user_id=$1",
            [userId]
        );
        if (!userCheck.rows[0]) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Check if lesson exists
        const lessonCheck = await pool.query(
            "SELECT lesson_id FROM lessons WHERE lesson_id=$1 AND module_id=$2",
            [lessonId, moduleId]
        );
        if (!lessonCheck.rows[0]) {
            return NextResponse.json(
                { success: false, message: "Lesson not found" },
                { status: 404 }
            );
        }

        // Insert or update user progress
        const query = `
      INSERT INTO user_lesson_progress (user_id, course_id, module_id, lesson_id, is_completed, completed_at)
      VALUES ($1, $2, $3, $4, TRUE, NOW())
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET is_completed=TRUE, completed_at=NOW()
      RETURNING *;
    `;

        const values = [userId, courseId, moduleId, lessonId];
        const result = await pool.query(query, values);

        return NextResponse.json(
            {
                success: true,
                message: "Lesson marked as completed",
                progress: result.rows[0],
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error marking lesson completed:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
