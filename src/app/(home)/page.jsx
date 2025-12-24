
// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import CommentModel from "../components/commentModal";
// // import LikeButton from "../components/LikeButton";
// // import SkeletonLoader from "../components/SkeletonLoader";


// // // === ICON COMPONENT ===
// // const XIcon = ({ name, count, color, filled = false }) => (
// //   <button
// //     className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
// //   >
// //     <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
// //       <span className="material-symbols-outlined text-base">{name}</span>
// //     </div>
// //     {count !== undefined && (
// //       <span
// //         className={`text-xs ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
// //           } transition-colors`}
// //       >
// //         {count}
// //       </span>
// //     )}
// //   </button>
// // );

// // // === POST COMPONENT ===
// // const Post = ({ post, handleBlog }) => (
// //   <article className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200">
// //     <div className="flex items-start space-x-3">
// //       <img
// //         alt={`${post.user_name || "User"}'s avatar`}
// //         className="h-10 w-10 rounded-full object-cover shrink-0"
// //         src={post.profile_images || "https://i.pravatar.cc/150?img=47"}
// //       />
// //       <div className="flex-1 min-w-0">
// //         <div className="flex items-center space-x-1 mb-1">
// //           <p className="font-bold text-gray-900 dark:text-white truncate max-w-[calc(100%-8rem)] sm:max-w-xs">
// //             {post.user_name || "Unknown User"}
// //           </p>
// //           <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
// //             {new Date(post.created_at).toLocaleDateString()}
// //           </p>
// //           <div className="ml-auto">
// //             <XIcon name="more_horiz" color="primary" />
// //           </div>
// //         </div>

// //         <div className="space-y-2">
// //           <h2 className="text-lg font-extrabold text-gray-900 dark:text-white break-words">
// //             {post.title}
// //           </h2>

// //           <p className="text-[0.93rem] text-gray-900 dark:text-white break-words">
// //             {post.content?.slice(0, 150)}...{" "}
// //             <span
// //               onClick={() => handleBlog(post.post_id)}
// //               className="text-gray-500 font-medium cursor-pointer hover:underline"
// //             >
// //               See More
// //             </span>
// //           </p>

// //           {/* === Render post images (array) === */}
// //           {Array.isArray(post.post_img) && post.post_img.length > 0 && (
// //             <img
// //               alt="Post preview"
// //               className="w-full h-auto rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[400px]"
// //               src={post.post_img[0]} // only first image
// //             />
// //           )}

// //         </div>

// //         <div className="mt-2 flex justify-between items-center text-gray-500 dark:text-gray-400 max-w-md">
// //           {/* Comments */}
// //           <CommentModel post_id={post.post_id} />


// //           <XIcon name="repeat" count={10} color="green-500" />
// //           {/* likes post */}
// //           <LikeButton post_id={post.post_id} user_id={post.user_id || "current_user_id_here"} />

// //           <XIcon name="share" color="primary" />
// //         </div>
// //       </div>
// //     </div>
// //   </article>
// // );

// // // === MAIN PAGE ===
// // export default function Page() {
// //   const router = useRouter();
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const handleBlog = (id) => router.push(`/blog/${id}`, { scroll: true });

// //   // === Fetch API ===
// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         // const res = await fetch("/api/post");
// //         // const data = await res.json();

// //         const res = await fetch("/api/post");
// // const data = await res.json(); // already JSON
// // setPosts(data.data);

// //         if (data.success) {
// //           setPosts(data.data);
// //         } else {
// //           console.error("Failed to fetch posts:", data.message);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching posts:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   const primaryColor = "#000000";
// //   const bgColorLight = "white";
// //   const bgColorDark = "#000000";

// //   return (
// //     <div
// //       className={`flex-grow flex justify-center min-h-screen bg-${bgColorLight} dark:bg-${bgColorDark} text-gray-900 dark:text-white`}
// //     >
// //       <div className="flex w-full max-w-[1300px]">
// //         {/* searching tab */}
// //         <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">
// //           {/* HEADER */}
// //           <header
// //             className={`sticky top-0 z-10 bg-${bgColorLight}/80 dark:bg-${bgColorDark}/80 backdrop-blur-sm border-b border-gray-200 dark:border-[#2F3336] px-4 hidden md:block`}
// //           >
// //             <div className="flex items-center justify-between h-14">
// //               <div className="flex items-center flex-grow">
// //                 <h1 className="text-xl font-bold mr-4 shrink-0">Home</h1>
// //                 <div className="relative flex-grow max-w-sm ml-4">
// //                   <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
// //                     search
// //                   </span>
// //                   <input
// //                     className={`bg-gray-100 dark:bg-[#202327] border border-transparent focus:ring-2 focus:ring-${primaryColor} focus:border-${primaryColor} rounded-full py-2 pl-10 pr-4 text-sm w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
// //                     placeholder="Search..."
// //                     type="text"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </header>

// //           {/* POSTS */}
// //           <div className="divide-y divide-gray-200 dark:divide-[#2F3336]">
// //             {loading ? (
// //   <SkeletonLoader />
// // ) : posts.length > 0 ? (

// //               posts.map((post) => (
// //                 <Post key={post.post_id} post={post} handleBlog={handleBlog} />
// //               ))
// //             ) : (
// //               <div className="text-center py-8 text-gray-500 dark:text-gray-400">
// //                 No posts found.
// //               </div>
// //             )}
// //           </div>

// //           <div className="text-center py-8 text-gray-500 dark:text-gray-400">
// //             {loading ? "Loading more posts..." : ""}
// //           </div>
// //         </main>

// //         {/* RIGHT SIDEBAR */}
// //         <aside className="w-full max-w-[350px] xl:max-w-[400px] shrink-0 hidden lg:block sticky top-0 h-screen py-4 pl-8 overflow-y-auto">
// //           <div className="space-y-4">
// //             <div className="bg-gray-100 dark:bg-[#181818] rounded-xl p-4 space-y-0.5">
// //               <h3 className="font-extrabold text-xl mb-3">Trends for you</h3>
// //               <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
// //                 <div>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400">
// //                     Trending in Tech
// //                   </p>
// //                   <p className="font-bold text-gray-900 dark:text-white">
// //                     #AIRevolution
// //                   </p>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400">
// //                     12.5k posts
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
// //                 <div>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400">
// //                     Travel & Adventure
// //                   </p>
// //                   <p className="font-bold text-gray-900 dark:text-white">
// //                     #DigitalNomad
// //                   </p>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400">
// //                     8,934 posts
// //                   </p>
// //                 </div>
// //               </div>
// //               <a
// //                 className={`text-${primaryColor} text-sm font-medium pt-2 block`}
// //                 href="#"
// //               >
// //                 Show more
// //               </a>
// //             </div>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }







// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import CommentModel from "../components/commentModal";
// import LikeButton from "../components/LikeButton";
// import SkeletonLoader from "../components/SkeletonLoader";

// // ================= ICON =================
// const XIcon = ({ name, count, color, filled = false }) => (
//   <button
//     className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
//   >
//     <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
//       <span className="material-symbols-outlined text-base">{name}</span>
//     </div>
//     {count !== undefined && (
//       <span
//         className={`text-xs ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
//           } transition-colors`}
//       >
//         {count}
//       </span>
//     )}
//   </button>
// );

// // ================= POST =================
// const Post = React.memo(({ post, handleBlog }) => {
//   return (
//     <article className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200">
//       <div className="flex items-start space-x-3">
//         <img
//           alt={`${post.user_name || "User"}'s avatar`}
//           className="h-10 w-10 rounded-full object-cover shrink-0"
//           src={post.profile_images || "https://i.pravatar.cc/150?img=47"}
//         />

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center space-x-1 mb-1">
//             <p className="font-bold text-gray-900 dark:text-white truncate">
//               {post.user_name || "Unknown User"}
//             </p>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {new Date(post.created_at).toLocaleDateString()}
//             </p>
//             <div className="ml-auto">
//               <XIcon name="more_horiz" color="primary" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
//               {post.title}
//             </h2>

//             <p className="text-[0.93rem] text-gray-900 dark:text-white">
//               {post.content?.slice(0, 150)}...{" "}
//               <span
//                 onClick={() => handleBlog(post.post_id)}
//                 className="text-gray-500 font-medium cursor-pointer hover:underline"
//               >
//                 See More
//               </span>
//             </p>

//             {Array.isArray(post.post_img) && post.post_img.length > 0 && (
//               <img
//                 alt="Post preview"
//                 className="w-full rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[400px]"
//                 src={post.post_img[0]}
//               />
//             )}
//           </div>

//           {/* ================= ACTIONS ================= */}
//           <div className="mt-2 flex justify-between items-center text-gray-500 dark:text-gray-400 max-w-md">
//             {/* ONLY COUNT ON HOME */}
//             {/* <CommentModel
//               post_id={post.post_id}
//               count={post.comments_count}
//             /> */}
//             <CommentModel
//               post_id={post.post_id}
//               count={post.comments_count} // only fetch count initially
//             />



//             <XIcon name="repeat" count={10} color="green-500" />

//             {/* <LikeButton
//               post_id={post.post_id}
//               user_id={post.user_id}
//               count={post.likes_count}
//             /> */}

//             <LikeButton
//               post_id={post.post_id}
//               user_id={post.user_id}
//               initialCount={post.likes_count}
//             />

//             <XIcon name="share" color="primary" />
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// });

// // ================= PAGE =================
// export default function Page() {
//   const router = useRouter();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleBlog = useCallback(
//     (id) => router.push(`/blog/${id}`),
//     [router]
//   );

//   // ================= FETCH POSTS (ONLY ONCE) =================
//   useEffect(() => {
//     let isMounted = true;

//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/post", {
//           cache: "no-store",
//         });

//         const data = await res.json();

//         if (data.success && isMounted) {
//           setPosts(data.data);
//         }
//       } catch (err) {
//         console.error("Fetch posts error:", err);
//       } finally {
//         isMounted && setLoading(false);
//       }
//     };

//     fetchPosts();
//     return () => (isMounted = false);
//   }, []);

//   return (
//     <div className="flex-grow flex justify-center min-h-screen bg-white dark:bg-black">
//       <div className="flex w-full max-w-[1300px]">
//         <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">
//           {loading ? (
//             <SkeletonLoader />
//           ) : posts.length ? (
//             posts.map((post) => (
//               <Post
//                 key={post.post_id}
//                 post={post}
//                 handleBlog={handleBlog}
//               />
//             ))
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No posts found.
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


















"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import CommentModel from "../components/commentModal";
import LikeButton from "../components/LikeButton";
import SkeletonLoader from "../components/SkeletonLoader";

// ================= ICON BUTTON =================
const IconButton = ({ name, count, color = "blue", filled = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1 text-gray-500 hover:text-${color} transition-colors duration-150`}
  >
    <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
      <span className="material-symbols-outlined text-base">{name}</span>
    </div>
    {count !== undefined && (
      <span
        className={`text-xs ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`} transition-colors`}
      >
        {count}
      </span>
    )}
  </button>
);

// ================= POST COMPONENT =================
const Post = memo(({ post, handleBlog }) => {
  return (
    <article className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <img
          alt={`${post.user_name || "User"}'s avatar`}
          className="h-10 w-10 rounded-full object-cover shrink-0"
          src={post.profile_images || "https://i.pravatar.cc/150?img=47"}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <p className="font-bold text-gray-900 dark:text-white truncate">{post.user_name || "Unknown User"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
            <div className="ml-auto">
              <IconButton name="more_horiz" color="gray" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white break-words">{post.title}</h2>
            <p className="text-[0.93rem] text-gray-900 dark:text-white break-words">
              {post.content?.slice(0, 150)}...
              <span
                onClick={() => handleBlog(post.post_id)}
                className="text-gray-500 font-medium cursor-pointer hover:underline"
              >
                {" "}See More
              </span>
            </p>

            {Array.isArray(post.post_img) && post.post_img.length > 0 && (
              <img
                alt="Post preview"
                className="w-full h-auto rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[400px]"
                src={post.post_img[0]} // first image only
              />
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="mt-2 flex justify-between items-center text-gray-500 dark:text-gray-400 max-w-md">
            <CommentModel post_id={post.post_id} count={post.comments_count} />
            <IconButton name="repeat" count={10} color="green-500" />
            <LikeButton post_id={post.post_id} user_id={post.user_id} initialCount={post.likes_count} />
            <IconButton name="share" color="blue" />
          </div>
        </div>
      </div>
    </article>
  );
});

// ================= MAIN PAGE =================
export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBlog = useCallback((id) => router.push(`/blog/${id}`), [router]);

  // ================= FETCH POSTS =================
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post", { cache: "no-store" });
        const data = await res.json();
        if (data.success && isMounted) setPosts(data.data);
      } catch (err) {
        console.error("Fetch posts error:", err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchPosts();
    return () => (isMounted = false);
  }, []);

  return (
    <div className="flex-grow flex justify-center min-h-screen bg-white dark:bg-black">
      <div className="flex w-full max-w-[1300px]">
        {/* MAIN POSTS COLUMN */}
        <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">
          {loading ? (
            <SkeletonLoader />
          ) : posts.length ? (
            posts.map((post) => <Post key={post.post_id} post={post} handleBlog={handleBlog} />)
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No posts found.</div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full max-w-[350px] xl:max-w-[400px] shrink-0 hidden lg:block sticky top-0 h-screen py-4 pl-8 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-[#181818] rounded-xl p-4 space-y-0.5">
              <h3 className="font-extrabold text-xl mb-3">Trends for you</h3>
              <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Trending in Tech</p>
                  <p className="font-bold text-gray-900 dark:text-white">#AIRevolution</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12.5k posts</p>
                </div>
              </div>
              <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Travel & Adventure</p>
                  <p className="font-bold text-gray-900 dark:text-white">#DigitalNomad</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">8,934 posts</p>
                </div>
              </div>
              <a className="text-blue-600 text-sm font-medium pt-2 block" href="#">
                Show more
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
