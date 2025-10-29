// import { NextResponse } from "next/server";
// import cloudinary from "../../../libs/cloudinary";

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb",
//     },
//   },
// };

// export async function POST(req) {
//   try {
//     const { file } = await req.json(); // file = base64 string

//     const uploadRes = await cloudinary.uploader.upload(file, {
//       folder: "learnmaster_users",
//     });

//     return NextResponse.json({
//       message: "Image uploaded successfully",
//       url: uploadRes.secure_url,
//       public_id: uploadRes.public_id,
//     });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }















// new 




// app/upload/route.js
import { NextResponse } from "next/server";
import cloudinary from "../../../libs/cloudinary";

// Optional: Configure body size limit for large images
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { file } = body; // base64 string (e.g., data:image/png;base64,...)

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "learnmaster_users", // your folder name
      resource_type: "auto", // auto-detects image/video
    });

    return NextResponse.json({
      message: " Image uploaded successfully",
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    });
  } catch (error) {
    console.error(" Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
