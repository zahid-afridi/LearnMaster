// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (!token || !userData) {
//       // Redirect to login if no token or user data
//       router.push("/login");
//     } else {
//       setUser(JSON.parse(userData));
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl font-semibold">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
//           Dashboard
//         </h1>

//         <div className="flex gap-3">
//           <button
//             onClick={() => router.push("/")}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Home
//           </button>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Profile Card */}
//       {user ? (
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
//           {/* Profile Image */}
//           <div className="flex justify-center mb-4">
//             <img
//               src={user.profile_images || "/default-avatar.png"}
//               alt="Profile"
//               className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
//             />
//           </div>

//           <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-2">
//             {user.username}
//           </h2>

//           <p className="text-center text-gray-600 dark:text-gray-300 mb-1">
//             Email: {user.email}
//           </p>

//           {user.bio && (
//             <p className="text-center text-gray-600 dark:text-gray-300">
//               {user.bio}
//             </p>
//           )}
//         </div>
//       ) : (
//         <p className="text-gray-700 dark:text-gray-400 text-center">
//           User info not available.
//         </p>
//       )}
//     </div>
//   );
// }
