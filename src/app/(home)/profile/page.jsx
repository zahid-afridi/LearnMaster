// // 'use client';
// // import React from "react";

// // // 🔹 Modern Icon Button
// // const XIcon = ({ name, count, color, filled = false }) => (
// //   <button
// //     className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
// //   >
// //     <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
// //       <span className="material-symbols-outlined text-[19px]">{name}</span>
// //     </div>
// //     {count !== undefined && (
// //       <span
// //         className={`text-[13px] ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
// //           } transition-colors`}
// //       >
// //         {count}
// //       </span>
// //     )}
// //   </button>
// // );

// // //  Beautiful Post Design
// // const Post = ({ post }) => (
// //   <article className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/60 dark:hover:bg-[#0a0a0a] transition-all duration-200">
// //     <div className="flex items-start space-x-3 sm:space-x-4">
// //       {/* Avatar */}
// //       <img
// //         alt={`${post.name}'s avatar`}
// //         className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover"
// //         src={post.avatar}
// //       />

// //       {/* Post Body */}
// //       <div className="flex-1 min-w-0">
// //         {/* Header */}
// //         <div className="flex items-center gap-1">
// //           <p className="font-semibold text-[15px] sm:text-[16px] text-gray-900 dark:text-white">
// //             {post.name}
// //           </p>
// //           <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400">
// //             {post.username} · {post.time}
// //           </p>
// //           <div className="ml-auto">
// //             <XIcon name="more_horiz" color="primary" />
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="mt-1.5 space-y-2">
// //           <p className="text-[15px] sm:text-[16px] text-gray-900 dark:text-gray-200 leading-relaxed">
// //             <strong>{post.title}</strong>
// //           </p>
// //           <p className="text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-400">
// //             {post.description}
// //           </p>

// //           {/* Image */}
// //           {post.image && (
// //             <div className="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2F3336]">
// //               <img
// //                 src={post.image}
// //                 alt={post.title}
// //                 className="w-full h-auto max-h-[360px] object-cover transition-transform duration-200 hover:scale-[1.01]"
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* Actions */}
// //         <div className="mt-3 flex justify-between max-w-[500px] text-gray-500 dark:text-gray-400">
// //           <XIcon name="chat_bubble" count={post.comments} color="blue-500" />
// //           <XIcon name="repeat" count={post.repeats} color="green-500" />
// //           <XIcon name="favorite" count={post.likes} color="red-500" filled />
// //           <XIcon name="share" color="blue-500" />
// //         </div>
// //       </div>
// //     </div>
// //   </article>
// // );

// // export default function ProfilePage() {
// //   const profile =
// //     "https://lh3.googleusercontent.com/aida-public/AB6AXuA_vbbCh9CfbNsZ3W2KliNdF26KsNFYlBeQO2DoOCSN163yd5n52UzjwzbfSl8I0cwkA_WNchQ5s4YunF6pv-Jn0WKeMAKtE6rMjuPggA4dZG4Y4KhUuD4JaAhQuEMvNEFXNQvpGnRXawlFFXr72cr6UmDNd4GJ6BnoYs4rqqTHZMyBZ8A_uIsjcfQvMNdlGz7oOO2VnZ9bIc9Qkz7t9yrZu3JTv7xObop6IzTHte0Uxd78hHO18ijGcxKH5gI7He-r9uc28VhE";

// //   const posts = [
// //     {
// //       id: 1,
// //       name: "Sophia Bennett",
// //       username: "@sophiab",
// //       time: "1d",
// //       title: "Why React Still Dominates Frontend in 2025 🚀",
// //       description:
// //         "A deep dive into React’s ecosystem, developer adoption, and why it still powers the world’s biggest apps.",
// //       avatar: profile,
// //       image: "https://picsum.photos/700/400?random=6",
// //       comments: 120,
// //       repeats: 45,
// //       likes: "2.3K",
// //     },
// //     {
// //       id: 2,
// //       name: "Sophia Bennett",
// //       username: "@sophiab",
// //       time: "3d",
// //       title: "My Minimalist Desk Setup for Focused Coding 🖥️",
// //       description:
// //         "This setup boosts my focus and flow. Clean, minimal, and distraction-free — exactly how I like it.",
// //       avatar: profile,
// //       image: "https://picsum.photos/700/450?random=8",
// //       comments: 89,
// //       repeats: 30,
// //       likes: 980,
// //     },
// //   ];

// //   return (
// //     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-white overflow-y-auto">
// //       {/* Cover */}
// //       <div
// //         className="relative h-44 sm:h-60 md:h-72 bg-cover bg-center"
// //         style={{
// //           backgroundImage:
// //             "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
// //         }}
// //       >
// //         <div className="absolute inset-0 bg-black/30" />
// //         <button className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1 transition">
// //           <span className="material-symbols-outlined text-sm sm:text-base">
// //             edit
// //           </span>
// //           Edit Cover
// //         </button>
// //       </div>

// //       {/* Profile Section */}
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-10 -mt-14 sm:-mt-20 md:-mt-24 flex flex-col items-center text-center sm:items-start sm:text-left">
// //         {/* Avatar */}
// //         <div className="relative group">
// //           <div
// //             className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-900 shadow-md"
// //             style={{ backgroundImage: `url(${profile})` }}
// //           ></div>
// //           <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition">
// //             <span className="material-symbols-outlined text-lg sm:text-xl">
// //               photo_camera
// //             </span>
// //           </button>
// //         </div>

// //         {/* Name */}
// //         <div className="flex flex-col sm:flex-row items-center justify-center mt-4 md:mt-6 gap-1 sm:gap-2">
// //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
// //             Sophia Bennett
// //           </h1>
// //           <span className="material-symbols-outlined text-blue-500 text-lg sm:text-xl">
// //             verified
// //           </span>
// //         </div>

// //         {/* Bio */}
// //         <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md text-left leading-relaxed">
// //           Tech creator ✨ | Frontend specialist ⚛️ | Coffee lover ☕ | Sharing my
// //           journey in coding & creativity 🚀
// //         </p>

// //         {/* Stats */}
// //         <div className="mt-3 flex items-center justify-start gap-6 sm:gap-8 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
// //           <div>
// //             <span className="font-bold text-slate-900 dark:text-white">
// //               1,286
// //             </span>{" "}
// //             Posts
// //           </div>
// //           <div>
// //             <span className="font-bold text-slate-900 dark:text-white">
// //               12.5K
// //             </span>{" "}
// //             Followers
// //           </div>
// //           <div>
// //             <span className="font-bold text-slate-900 dark:text-white">
// //               500
// //             </span>{" "}
// //             Following
// //           </div>
// //         </div>

// //         {/* Button */}
// //         <div className="mt-5 flex gap-3 justify-start">
// //           <button className="px-6 py-2 rounded-full bg-black hover:bg-gray-900 text-white text-sm font-semibold transition flex items-center gap-1">
// //             <span className="material-symbols-outlined text-sm">
// //               person_add
// //             </span>
// //             Follow
// //           </button>
// //         </div>

// //         {/* Tabs */}
// //         <div className="border-b border-slate-200 dark:border-slate-800 mt-6 w-full"></div>
// //         <nav className="flex justify-start gap-6 sm:gap-10 mt-4 text-sm sm:text-base flex-wrap">
// //           <a className="py-3 border-b-2 border-blue-600 text-blue-600 font-semibold flex items-center gap-1">
// //             <span className="material-symbols-outlined text-base">grid_view</span>
// //             Posts
// //           </a>
// //           <a className="py-3 border-b-2 border-transparent text-slate-500 hover:text-blue-600 transition flex items-center gap-1">
// //             <span className="material-symbols-outlined text-base">bookmark</span>
// //             Saved
// //           </a>
// //           <a className="py-3 border-b-2 border-transparent text-slate-500 hover:text-blue-600 transition flex items-center gap-1">
// //             <span className="material-symbols-outlined text-base">history</span>
// //             Activity
// //           </a>
// //         </nav>

// //         {/* Posts */}
// //         <div className="w-full max-w-3xl mx-auto mt-2 divide-y divide-gray-200 dark:divide-[#2F3336]">
// //           {posts.map((post) => (
// //             <Post key={post.id} post={post} />
// //           ))}
// //         </div>

// //         <div className="text-center py-6 text-gray-500 dark:text-gray-400">
// //           Loading more posts...
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // -----------------------------------


// 'use client';

// import React from "react";
// import { useSelector } from "react-redux";

// // 🔹 Modern Icon Button
// const XIcon = ({ name, count, color, filled = false }) => (
//   <button
//     className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
//   >
//     <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
//       <span className="material-symbols-outlined text-[19px]">{name}</span>
//     </div>
//     {count !== undefined && (
//       <span
//         className={`text-[13px] ${
//           filled ? `text-${color} font-semibold` : `group-hover:text-${color}`
//         } transition-colors`}
//       >
//         {count}
//       </span>
//     )}
//   </button>
// );

// //  Beautiful Post Design
// const Post = ({ post }) => (
//   <article className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/60 dark:hover:bg-[#0a0a0a] transition-all duration-200">
//     <div className="flex items-start space-x-3 sm:space-x-4">

//       {/* Avatar */}
//       <img
//         alt={`${post.name}'s avatar`}
//         className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover"
//         src={post.avatar}
//       />

//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-1">
//           <p className="font-semibold text-[15px] sm:text-[16px] text-gray-900 dark:text-white">
//             {post.name}
//           </p>
//           <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400">
//             {post.username} · {post.time}
//           </p>

//           <div className="ml-auto">
//             <XIcon name="more_horiz" color="primary" />
//           </div>
//         </div>

//         <div className="mt-1.5 space-y-2">
//           <p className="text-[15px] sm:text-[16px] text-gray-900 dark:text-gray-200 leading-relaxed">
//             <strong>{post.title}</strong>
//           </p>
//           <p className="text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-400">
//             {post.description}
//           </p>

//           {post.image && (
//             <div className="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2F3336]">
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-auto max-h-[360px] object-cover transition-transform duration-200 hover:scale-[1.01]"
//               />
//             </div>
//           )}
//         </div>

//         <div className="mt-3 flex justify-between max-w-[500px] text-gray-500 dark:text-gray-400">
//           <XIcon name="chat_bubble" count={post.comments} color="blue-500" />
//           <XIcon name="repeat" count={post.repeats} color="green-500" />
//           <XIcon name="favorite" count={post.likes} color="red-500" filled />
//           <XIcon name="share" color="blue-500" />
//         </div>
//       </div>
//     </div>
//   </article>
// );

// export default function ProfilePage() {
//   // ⭐ GET USER INFO FROM REDUX
//   const user = useSelector((state) => state.user);

//   const profileImg =
//     user.profile_images ||
//     "https://cdn-icons-png.flaticon.com/512/847/847969.png";

//   const name = user.name || "Guest User";
//   const bio =
//     user.bio ||
//     "No bio added yet. Edit your profile to add your introduction.";

//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-white overflow-y-auto">

//       {/* Cover */}
//       <div
//         className="relative h-44 sm:h-60 md:h-72 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/30" />
//         <button className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1 transition">
//           <span className="material-symbols-outlined text-sm sm:text-base">
//             edit
//           </span>
//           Edit Cover
//         </button>
//       </div>

//       {/* Profile Section */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-10 -mt-14 sm:-mt-20 md:-mt-24 flex flex-col items-center text-center sm:items-start sm:text-left">

//         {/* Avatar */}
//         <div className="relative group">
//           <div
//             className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-900 shadow-md"
//             style={{ backgroundImage: `url(${profileImg})` }}
//           ></div>

//           <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition">
//             <span className="material-symbols-outlined text-lg sm:text-xl">
//               photo_camera
//             </span>
//           </button>
//         </div>

//         {/* Name */}
//         <div className="flex flex-col sm:flex-row items-center justify-center mt-4 md:mt-6 gap-1 sm:gap-2">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
//             {name}
//           </h1>
//           <span className="material-symbols-outlined text-blue-500 text-lg sm:text-xl">
//             verified
//           </span>
//         </div>

//         {/* Bio */}
//         <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md text-left leading-relaxed">
//           {bio}
//         </p>

//         {/* Stats */}
//         <div className="mt-3 flex items-center justify-start gap-6 sm:gap-8 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
//           <div>
//             <span className="font-bold text-slate-900 dark:text-white">
//               0
//             </span>{" "}
//             Posts
//           </div>

//           <div>
//             <span className="font-bold text-slate-900 dark:text-white">
//               0
//             </span>{" "}
//             Followers
//           </div>

//           <div>
//             <span className="font-bold text-slate-900 dark:text-white">
//               0
//             </span>{" "}
//             Following
//           </div>
//         </div>

//         {/* Button */}
//         <div className="mt-5 flex gap-3 justify-start">
//           <button className="px-6 py-2 rounded-full bg-black hover:bg-gray-900 text-white text-sm font-semibold transition flex items-center gap-1">
//             <span className="material-symbols-outlined text-sm">
//               person_add
//             </span>
//             Follow
//           </button>
//         </div>

//         <div className="border-b border-slate-200 dark:border-slate-800 mt-6 w-full"></div>

//         {/* No posts yet */}
//         <div className="text-center py-6 text-gray-500 dark:text-gray-400 w-full">
//           No posts yet...
//         </div>
//       </div>
//     </div>
//   );
// }
















// ------------------------------



'use client';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// 🔹 Modern Icon Button
const XIcon = ({ name, count, color, filled = false }) => (
  <button
    className={`flex items-center space-x-1 group text-gray-500 hover:text-${color} transition-colors duration-150`}
  >
    <div className={`p-2 rounded-full group-hover:bg-${color}/10`}>
      <span className="material-symbols-outlined text-[19px]">{name}</span>
    </div>
    {count !== undefined && (
      <span
        className={`text-[13px] ${filled ? `text-${color} font-semibold` : `group-hover:text-${color}`} transition-colors`}
      >
        {count}
      </span>
    )}
  </button>
);

//  Beautiful Post Design
const Post = ({ post }) => (
  <article className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#2F3336] hover:bg-gray-50/60 dark:hover:bg-[#0a0a0a] transition-all duration-200">
    <div className="flex items-start space-x-3 sm:space-x-4">
      {/* Avatar */}
      <img
        alt={`${post.name}'s avatar`}
        className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover"
        src={post.avatar}
      />
      {/* Post Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="font-semibold text-[15px] sm:text-[16px] text-gray-900 dark:text-white">
            {post.name}
          </p>
          <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400">
            {post.username} · {post.time}
          </p>
          <div className="ml-auto">
            <XIcon name="more_horiz" color="primary" />
          </div>
        </div>
        <div className="mt-1.5 space-y-2">
          <p className="text-[15px] sm:text-[16px] text-gray-900 dark:text-gray-200 leading-relaxed">
            <strong>{post.title}</strong>
          </p>
          <p className="text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-400">
            {post.description}
          </p>
          {post.image && (
            <div className="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2F3336]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[360px] object-cover transition-transform duration-200 hover:scale-[1.01]"
              />
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-between max-w-[500px] text-gray-500 dark:text-gray-400">
          <XIcon name="chat_bubble" count={post.comments} color="blue-500" />
          <XIcon name="repeat" count={post.repeats} color="green-500" />
          <XIcon name="favorite" count={post.likes} color="red-500" filled />
          <XIcon name="share" color="blue-500" />
        </div>
      </div>
    </div>
  </article>
);

export default function ProfilePage() {
  const user = useSelector((state) => state.user); // Logged-in user info
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user's posts from backend or local storage
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Example API call - replace with your actual backend endpoint
        const res = await fetch(`/api/post?user_id=${user.user_id}`);
        const data = await res.json();
        setUserPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load user posts", err);
      }
    };

    if (user.user_id) {
      fetchUserPosts();
    }
  }, [user.user_id]);

  const profileImg =
    user.profile_images || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const name = user.name || "Guest User";
  const bio = user.bio || "No bio added yet. Edit your profile to add your introduction.";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-white overflow-y-auto">
      {/* Cover */}
      <div
        className="relative h-44 sm:h-60 md:h-72 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 -mt-14 sm:-mt-20 md:-mt-24 flex flex-col items-center text-center sm:items-start sm:text-left">
        {/* Avatar */}
        <div className="relative group">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-900 shadow-md"
            style={{ backgroundImage: `url(${profileImg})` }}
          />
        </div>

        {/* Name */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 md:mt-6 gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{name}</h1>
          <span className="material-symbols-outlined text-blue-500 text-lg sm:text-xl">
            verified
          </span>
        </div>

        {/* Bio */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md text-left leading-relaxed">
          {bio}
        </p>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-start gap-6 sm:gap-8 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">{userPosts.length}</span> Posts
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">12.5K</span> Followers
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">500</span> Following
          </div>
        </div>

        {/* Posts */}
        <div className="w-full max-w-3xl mx-auto mt-6 divide-y divide-gray-200 dark:divide-[#2F3336]">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400 w-full">
              No posts yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
