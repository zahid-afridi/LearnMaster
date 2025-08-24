import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import { validate as isUuid } from "uuid";


// GET course by id
export async function GET(req, { params }) {
    const { id } = params; // get id from route
    // 1. Validate UUID format
    if (!isUuid(id)) {
        return NextResponse.json(
            { success: false, error: "Invalid course ID format" },
            { status: 400 }
        );
    }
    try {
        
        const q = `
    SELECT 
        c.*,
        COALESCE(
            json_agg(
                json_build_object(
                    'module_id', m.module_id,
                    'title', m.title,
                    'slug', m.slug,
                    'description', m.description,
                    'order', m."order",
                    'lessons', m.lessons
                ) ORDER BY m."order"
            ) FILTER (WHERE m.module_id IS NOT NULL),
            '[]'::json
        ) as modules
    FROM courses c
    LEFT JOIN (
        SELECT 
            m.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'lesson_id', l.lesson_id,
                        'title', l.title,
                        'slug', l.slug,
                        'difficulty', l.difficulty,
                        'status', l.status,
                        'estimated_time', l.estimated_time,
                        'order', l."order",
                        'published', l.published,
                        'content', l.content,
                        'resources', l.resources,
                        'quizzes', l.quizzes,
                        'meta', l.meta
                    ) ORDER BY l."order"
                ) FILTER (WHERE l.lesson_id IS NOT NULL),
                '[]'::json
            ) as lessons
        FROM modules m
        LEFT JOIN (
            SELECT 
                l.lesson_id,
                l.module_id,
                l.title,
                l.slug,
                l.difficulty,
                l.status,
                l.estimated_time,
                l."order",
                l.published,
                l.created_at,
                l.updated_at,
                -- Lesson content aggregation
                COALESCE(
                    json_agg(
                        CASE 
                            WHEN lc.type = 'heading' THEN
                                json_build_object(
                                    'type', lc.type,
                                    'level', lc.level,
                                    'text', lc.text,
                                    'order', lc."order"
                                )
                            WHEN lc.type = 'code' THEN
                                json_build_object(
                                    'type', lc.type,
                                    'language', lc.language,
                                    'code', lc.code,
                                    'order', lc."order"
                                )
                            WHEN lc.type IN ('image','video') THEN
                                json_build_object(
                                    'type', lc.type,
                                    'src', lc.src,
                                    'alt', lc.alt,
                                    'order', lc."order"
                                )
                            WHEN lc.type IN ('paragraph','note','warning') THEN
                                json_build_object(
                                    'type', lc.type,
                                    'text', lc.text,
                                    'order', lc."order"
                                )
                            ELSE
                                json_build_object(
                                    'type', lc.type,
                                    'text', lc.text,
                                    'level', lc.level,
                                    'code', lc.code,
                                    'language', lc.language,
                                    'src', lc.src,
                                    'alt', lc.alt,
                                    'order', lc."order"
                                )
                        END
                        ORDER BY lc."order"
                    ) FILTER (WHERE lc.content_id IS NOT NULL),
                    '[]'::json
                ) as content,
                -- Lesson resources
                COALESCE(
                    json_agg(
                        json_build_object(
                            'type', lr.type,
                            'title', lr.title,
                            'url', lr.url
                        )
                        ORDER BY lr.resource_id
                    ) FILTER (WHERE lr.resource_id IS NOT NULL),
                    '[]'::json
                ) as resources,
                -- Lesson quizzes
                COALESCE(
                    json_agg(
                        json_build_object(
                            'quiz_id', q.quiz_id,
                            'question', q.question,
                            'options', q.options,
                            'correctIndex', q.correct_index
                        )
                        ORDER BY q.quiz_id
                    ) FILTER (WHERE q.quiz_id IS NOT NULL),
                    '[]'::json
                ) as quizzes,
                -- Meta
                json_build_object(
                    'updatedAt', l.updated_at,
                    'createdAt', l.created_at
                ) as meta
            FROM lessons l
            LEFT JOIN lesson_contents lc ON l.lesson_id = lc.lesson_id
            LEFT JOIN lesson_resources lr ON l.lesson_id = lr.lesson_id  
            LEFT JOIN lesson_quizzes q ON l.lesson_id = q.lesson_id
            GROUP BY l.lesson_id
        ) l ON m.module_id = l.module_id
        GROUP BY m.module_id
    ) m ON c.course_id = m.course_id
    WHERE c.course_id = $1
    GROUP BY c.course_id
`;

        const result = await pool.query(q, [id])
        if (!result.rows[0]) {
            return NextResponse.json({ success: false, error: "Course not Found" }, { status: 404 });

        }
        return NextResponse.json({ success: true, data: result.rows },{status:200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });

    }
}
