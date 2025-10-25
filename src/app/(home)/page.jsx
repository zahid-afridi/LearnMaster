// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from "react-redux";


// // === ICON COMPONENT ===
// const XIcon = ({ name, count, color, filled = false }) => (
//     <button className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}>
//         <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
//             <span className="material-symbols-outlined text-base">{name}</span>
//         </div>
//         {count !== undefined && (
//             <span className={`text-xs ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`} transition-colors`}>
//                 {count}
//             </span>
//         )}
//     </button>
// );

// // === POST COMPONENT ===
// const Post = ({ post, handleBlog }) => (
//     <article
//         className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200"
//     >
//         <div className="flex items-start space-x-3">
//             <img
//                 alt={`${post.name}'s avatar`}
//                 className="h-10 w-10 rounded-full object-cover shrink-0"
//                 src={post.avatar}
//             />
//             <div className="flex-1 min-w-0">
//                 <div className="flex items-center space-x-1 mb-1">
//                     <p className="font-bold text-gray-900 dark:text-white truncate max-w-[calc(100%-8rem)] sm:max-w-xs">
//                         {post.name}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                         {post.username} · {post.time}
//                     </p>
//                     <div className="ml-auto">
//                         <XIcon name="more_horiz" color="primary" />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <h2 className="text-lg font-extrabold text-gray-900 dark:text-white break-words">
//                         {post.title}
//                     </h2>

//                     <p className="text-[0.93rem] text-gray-900 dark:text-white break-words">
//                         {post.description}{" "}
//                         <span
//                             onClick={() => handleBlog(post.id)}
//                             className="text-gray-500 font-medium cursor-pointer hover:underline"
//                         >
//                             See More
//                         </span>
//                     </p>

//                     {post.image && (
//                         <img
//                             alt={`Post image for ${post.title}`}
//                             className="w-full h-auto rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[500px]"
//                             src={post.image}
//                         />
//                     )}
//                 </div>

//                 <div className="mt-2 flex justify-between items-center text-gray-500 dark:text-gray-400 max-w-md">
//                     <XIcon name="chat_bubble" count={post.comments} color="primary" />
//                     <XIcon name="repeat" count={post.repeats} color="green-500" />
//                     <XIcon name="favorite" count={post.likes} color="red-500" filled={true} />
//                     <XIcon name="share" color="primary" />
//                 </div>
//             </div>
//         </div>
//     </article>
// );

// // === MAIN PAGE ===
// export default function Page() {
//     const router = useRouter();
//     const handleBlog = (id) => router.push(`/blog/${id}`, { scroll: true });
    

//     const posts = [
//         {
//             id: 1,
//             name: "Haroon",
//             username: "@ameliachen",
//             time: "2d",
//             title: "The Future of AI in Software Development",
//             description: "Explore how AI is revolutionizing software development, from code generation to automated testing.",
//             avatar: "https://i.pravatar.cc/150?img=47",
//             image: "https://picsum.photos/600/300?random=1",
//             comments: 345,
//             repeats: 150,
//             likes: "1.2K",
//         },
//         {
//             id: 2,
//             name: "Sophia Lee",
//             username: "@sophialee",
//             time: "3d",
//             title: "Hidden Gems of Southeast Asia",
//             description: "Discover lesser-known destinations in Southeast Asia offering unique cultural experiences.",
//             avatar: "https://i.pravatar.cc/150?img=25",
//             image: "https://picsum.photos/600/400?random=2",
//             comments: 210,
//             repeats: 90,
//             likes: 850,
//         },
//         {
//             id: 3,
//             name: "Dr. Ethan Clark",
//             username: "@dretclark",
//             time: "4d",
//             title: "The Benefits of Mindfulness Meditation",
//             description: "Learn about the science-backed benefits of mindfulness meditation for stress and focus.",
//             avatar: "https://i.pravatar.cc/150?img=60",
//             image: "https://picsum.photos/600/500?random=3",
//             comments: 420,
//             repeats: 180,
//             likes: "1.5K",
//         },
//     ];

//     const primaryColor = '#000000';
//     const bgColorLight = 'white';
//     const bgColorDark = '#000000';

//     return (
//         <div className={`flex-grow flex justify-center min-h-screen bg-${bgColorLight} dark:bg-${bgColorDark} text-gray-900 dark:text-white`}>
//             <div className="flex w-full max-w-[1300px]">
//                 <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">

//                     {/*  HEADER - removed on mobile */}
//                     <header className={`sticky top-0 z-10 bg-${bgColorLight}/80 dark:bg-${bgColorDark}/80 backdrop-blur-sm border-b border-gray-200 dark:border-[#2F3336] px-4 hidden md:block`}>
//                         <div className="flex items-center justify-between h-14">
//                             <div className="flex items-center flex-grow">
//                                 <h1 className="text-xl font-bold mr-4 shrink-0">Home</h1>
//                                 <div className="relative flex-grow max-w-sm ml-4">
//                                     <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">search</span>
//                                     <input
//                                         className={`bg-gray-100 dark:bg-[#202327] border border-transparent focus:ring-2 focus:ring-${primaryColor} focus:border-${primaryColor} rounded-full py-2 pl-10 pr-4 text-sm w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
//                                         placeholder="Search..."
//                                         type="text"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </header>

//                     {/*  POSTS */}
//                     <div className="divide-y divide-gray-200 dark:divide-[#2F3336]">
//                         {posts.map((post) => (
//                             <Post key={post.id} post={post} handleBlog={handleBlog} />
//                         ))}
//                     </div>

//                     <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                         Loading more posts...
//                     </div>
//                 </main>

//                 {/* RIGHT SIDEBAR */}
//                 <aside className="w-full max-w-[350px] xl:max-w-[400px] shrink-0 hidden lg:block sticky top-0 h-screen py-4 pl-8 overflow-y-auto">
//                     <div className="space-y-4">
//                         <div className="bg-gray-100 dark:bg-[#181818] rounded-xl p-4 space-y-0.5">
//                             <h3 className="font-extrabold text-xl mb-3">Trends for you</h3>
//                             <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
//                                 <div>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">Trending in Tech</p>
//                                     <p className="font-bold text-gray-900 dark:text-white">#AIRevolution</p>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">12.5k posts</p>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
//                                 <div>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">Travel & Adventure</p>
//                                     <p className="font-bold text-gray-900 dark:text-white">#DigitalNomad</p>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">8,934 posts</p>
//                                 </div>
//                             </div>
//                             <a className={`text-${primaryColor} text-sm font-medium pt-2 block`} href="#">Show more</a>
//                         </div>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// }












// new code 




"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// === ICON COMPONENT ===
const XIcon = ({ name, count, color, filled = false }) => (
  <button className={`flex items-center space-x-1 group text-gray-500 hover:text-${color}`}>
    <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
      <span className="material-symbols-outlined text-base">{name}</span>
    </div>
    {count !== undefined && (
      <span
        className={`text-xs ${
          filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// === POST COMPONENT ===
const Post = ({ post, handleBlog }) => {
  const { name, profile_images } = useSelector((state) => state.user);
  console.log("useselctor!",name,profile_images)

  const displayName = name || "Unknown User";
  const displayAvatar = profile_images || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <article className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <img
          alt={`${displayName}'s avatar`}
          className="h-10 w-10 rounded-full object-cover shrink-0"
          src={displayAvatar}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <p className="font-bold text-gray-900 dark:text-white truncate">
              {displayName}
            </p>
            <div className="ml-auto">
              <XIcon name="more_horiz" color="primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white break-words">
              {post.title}
            </h2>

            <p className="text-[0.93rem] text-gray-900 dark:text-white break-words">
              {post.subtitle || post.content?.slice(0, 120)}{" "}
              <span
                onClick={() => handleBlog(post.post_id)}
                className="text-gray-500 font-medium cursor-pointer hover:underline"
              >
                See More
              </span>
            </p>

            {post.post_img && (
              <img
                alt={`Post image for ${post.title}`}
                className="w-full h-auto rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[500px]"
                src={post.post_img}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// === MAIN PAGE ===
export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBlog = (id) => router.push(`/blog/${id}`);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("No posts found");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex-grow flex justify-center min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="flex w-full max-w-[1300px]">
        <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">
          {/* HEADER */}
          <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-[#2F3336] px-4 hidden md:block">
            <div className="flex items-center justify-between h-14">
              <h1 className="text-xl font-bold">Home</h1>
            </div>
          </header>

          {/* POSTS */}
          <div className="divide-y divide-gray-200 dark:divide-[#2F3336]">
            {loading ? (
              <p className="text-center py-6 text-gray-500">Loading posts...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.post_id} post={post} handleBlog={handleBlog} />
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">No posts available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
