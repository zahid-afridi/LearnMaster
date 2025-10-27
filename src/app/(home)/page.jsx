
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// === ICON COMPONENT ===
const XIcon = ({ name, count, color, filled = false }) => (
  <button
    className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
  >
    <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
      <span className="material-symbols-outlined text-base">{name}</span>
    </div>
    {count !== undefined && (
      <span
        className={`text-xs ${
          filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
        } transition-colors`}
      >
        {count}
      </span>
    )}
  </button>
);

// === POST COMPONENT ===
const Post = ({ post, handleBlog }) => (
  <article className="p-3 sm:p-4 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/50 dark:hover:bg-[#080808] transition-colors duration-200">
    <div className="flex items-start space-x-3">
      <img
        alt={`${post.user_name || "User"}'s avatar`}
        className="h-10 w-10 rounded-full object-cover shrink-0"
        src={post.profile_images || "https://i.pravatar.cc/150?img=47"}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1 mb-1">
          <p className="font-bold text-gray-900 dark:text-white truncate max-w-[calc(100%-8rem)] sm:max-w-xs">
            {post.user_name || "Unknown User"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {new Date(post.created_at).toLocaleDateString()}
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
            {post.content?.slice(0, 150)}...{" "}
            <span
              onClick={() => handleBlog(post.post_id)}
              className="text-gray-500 font-medium cursor-pointer hover:underline"
            >
              See More
            </span>
          </p>

          {/* === Render post images (array) === */}
         {Array.isArray(post.post_img) && post.post_img.length > 0 && (
  <img
    alt="Post preview"
    className="w-full h-auto rounded-xl object-cover border border-gray-200 dark:border-[#2F3336] max-h-[400px]"
    src={post.post_img[0]} // only first image
  />
)}

        </div>

        <div className="mt-2 flex justify-between items-center text-gray-500 dark:text-gray-400 max-w-md">
          <XIcon name="chat_bubble" count={34} color="primary" />
          <XIcon name="repeat" count={10} color="green-500" />
          <XIcon name="favorite" count={120} color="red-500" filled={true} />
          <XIcon name="share" color="primary" />
        </div>
      </div>
    </div>
  </article>
);

// === MAIN PAGE ===
export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBlog = (id) => router.push(`/blog/${id}`, { scroll: true });

  // === Fetch API ===
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();


        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const primaryColor = "#000000";
  const bgColorLight = "white";
  const bgColorDark = "#000000";

  return (
    <div
      className={`flex-grow flex justify-center min-h-screen bg-${bgColorLight} dark:bg-${bgColorDark} text-gray-900 dark:text-white`}
    >
      <div className="flex w-full max-w-[1300px]">
        {/* searching tab */}
        <main className="w-full lg:w-[600px] border-x border-gray-200 dark:border-[#2F3336]">
          {/* HEADER */}
          <header
            className={`sticky top-0 z-10 bg-${bgColorLight}/80 dark:bg-${bgColorDark}/80 backdrop-blur-sm border-b border-gray-200 dark:border-[#2F3336] px-4 hidden md:block`}
          >
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center flex-grow">
                <h1 className="text-xl font-bold mr-4 shrink-0">Home</h1>
                <div className="relative flex-grow max-w-sm ml-4">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                    search
                  </span>
                  <input
                    className={`bg-gray-100 dark:bg-[#202327] border border-transparent focus:ring-2 focus:ring-${primaryColor} focus:border-${primaryColor} rounded-full py-2 pl-10 pr-4 text-sm w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="Search..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* POSTS */}
          <div className="divide-y divide-gray-200 dark:divide-[#2F3336]">
            {loading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading posts...
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.post_id} post={post} handleBlog={handleBlog} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No posts found.
              </div>
            )}
          </div>

          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {loading ? "Loading more posts..." : ""}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full max-w-[350px] xl:max-w-[400px] shrink-0 hidden lg:block sticky top-0 h-screen py-4 pl-8 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-[#181818] rounded-xl p-4 space-y-0.5">
              <h3 className="font-extrabold text-xl mb-3">Trends for you</h3>
              <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Trending in Tech
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    #AIRevolution
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    12.5k posts
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center hover:bg-gray-200/50 dark:hover:bg-[#202327] -mx-4 px-4 py-3 cursor-pointer rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Travel & Adventure
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    #DigitalNomad
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    8,934 posts
                  </p>
                </div>
              </div>
              <a
                className={`text-${primaryColor} text-sm font-medium pt-2 block`}
                href="#"
              >
                Show more
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}






