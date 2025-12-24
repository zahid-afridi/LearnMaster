// // middleware/auth/verifytoken.js
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function verifyToken(req) {
//   try {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ checks expiry

//     // attach decoded data for later
//     req.user = decoded;
//     return null;
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 403 }
//     );
//   }
// }






// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function verifyToken(req) {
//   try {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return { error: NextResponse.json({ error: "No token provided" }, { status: 401 }) };
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     return { decoded };
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return {
//       error: NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 403 }
//       )
//     };
//   }
// }














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

    return { decoded }; // <-- this allows PUT/DELETE to access decoded.user_id
  } catch (err) {
    console.error("Token verification failed:", err);
    return {
      error: NextResponse.json({ error: "Invalid or expired token" }, { status: 403 })
    };
  }
}
