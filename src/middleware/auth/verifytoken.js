// // === VERIFY TOKEN FUNCTION ===
// async function verifyToken(req) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET);
//     return null; // ✅ token valid
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
//   }
// }

// export default verifyToken;

// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function verifyToken(req) {
//   try {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET);
//     return null;
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
//   }
// }





// new code 
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: NextResponse.json({ error: "No token provided" }, { status: 401 }) };
    }



    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Return decoded token info (like user_id)
    return { decoded };
  } catch (err) {
    console.error("Token verification failed:", err);
    return { error: NextResponse.json({ error: "Invalid or expired token" }, { status: 403 }) };
  }
}
