import { NextResponse } from "next/server";
import cloudinary from "../../../libs/cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req) {
  try {
    const { file } = await req.json(); // file = base64 string

    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "learnmaster_users",
    });

    return NextResponse.json({
      message: "Image uploaded successfully",
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
