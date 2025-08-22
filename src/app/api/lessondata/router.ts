import { lessondata } from "../../../../controllers/lessondata";


export async function POST(req:Request) {
    return lessondata(req)
}