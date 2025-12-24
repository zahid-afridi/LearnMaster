import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(req) {
  try {
    const { file } = await req.json();

    if (!file || !file.startsWith("data:")) {
      return NextResponse.json(
        { error: "Invalid or missing image file" },
        { status: 400 }
      );
    }

    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "learnmaster_users",
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 }
    );
  }
}
