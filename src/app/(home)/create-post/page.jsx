// 'use client';
// import React, { useState, useRef } from 'react';

// export default function CreatePostPage() {
//   const [title, setTitle] = useState('');
//   const [tags, setTags] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const editorRef = useRef(null);

//   const handleCommand = (command) => {
//     document.execCommand(command, false, null);
//     editorRef.current.focus();
//   };

//   return (
//     <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <h1 className="text-xl font-bold text-slate-900 dark:text-white">
//               Create New Post
//             </h1>

//             <div className="flex items-center gap-4">
//               <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
//                 Save Draft
//               </button>
//               <button className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2">
//                 <span className="material-symbols-outlined text-base">publish</span>
//                 Publish
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-12 gap-8">
//           {/* Left Side */}
//           <div className="col-span-12 lg:col-span-8">
//             <div className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
              
//               {/* Title */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength="100"
//                   placeholder="Post Title..."
//                   className="form-input w-full bg-transparent border-0 border-b border-slate-200 dark:border-slate-700 focus:ring-0 focus:border-primary p-0 pb-2 text-2xl md:text-3xl font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500"
//                 />
//                 <span className="absolute bottom-[-20px] right-0 text-xs text-slate-400 dark:text-slate-500">
//                   {title.length}/100
//                 </span>
//               </div>

//               {/* Cover Image */}
//               <div className="mt-8">
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                   Cover Image
//                 </label>
//                 <label
//                   htmlFor="file-upload"
//                   className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
//                 >
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-slate-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 48 48"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-slate-600 dark:text-slate-400">
//                       <span className="relative rounded font-medium text-primary hover:text-primary/80">
//                         <span>Upload a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           onChange={(e) => setCoverImage(e.target.files[0])}
//                         />
//                       </span>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
//                   </div>
//                 </label>
//               </div>

//               {/* Rich Text Editor */}
//               <div className="border border-slate-200 dark:border-slate-700 rounded-lg mt-8 overflow-hidden">
//                 {/* Toolbar */}
//                 <div className="rich-text-editor-controls flex items-center p-2 border-b border-slate-200 dark:border-slate-700 space-x-1 flex-wrap">
//                   <button
//                     onClick={() => handleCommand('bold')}
//                     className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400"
//                   >
//                     <span className="material-symbols-outlined text-base">format_bold</span>
//                   </button>
//                   <button
//                     onClick={() => handleCommand('italic')}
//                     className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400"
//                   >
//                     <span className="material-symbols-outlined text-base">format_italic</span>
//                   </button>
//                   <button
//                     onClick={() => handleCommand('underline')}
//                     className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400"
//                   >
//                     <span className="material-symbols-outlined text-base">format_underlined</span>
//                   </button>
//                 </div>

//                 {/* Editable Content */}
//                 <div
//                   ref={editorRef}
//                   contentEditable
//                   suppressContentEditableWarning
//                   className="w-full bg-transparent border-0 focus:ring-0 p-4 h-96 min-h-[400px] max-h-[400px] overflow-y-auto text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none outline-none rounded-b-lg"
//                   placeholder="Start writing your masterpiece..."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }











'use client';

import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const editorRef = useRef(null);

  // ⭐ Get user_id from Redux
  const user_id = useSelector((state) => state.user.user_id);

  const handleCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handlePublish = async () => {
    if (!user_id) {
      alert("User is not logged in!");
      return;
    }

    const content = editorRef.current.innerHTML;
    const tagArray = tags.split(",").map(tag => tag.trim());

    let base64Image = null;
    if (coverImage) {
      base64Image = await convertToBase64(coverImage);
    }

    const payload = {
      user_id,
      title,
      subtitle,
      content,
      post_img: base64Image ? [base64Image] : [],
      tags: tagArray,
    };

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Post created successfully!");
      } else {
        alert("Error: " + JSON.stringify(data.errors || data.message));
      }
    } catch (error) {
      console.error("Publish Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen">
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Create New Post</h1>

            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Save Draft
              </button>

              <button
                onClick={handlePublish}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">

              {/* TITLE */}
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="100"
                  placeholder="Post Title..."
                  className="form-input w-full bg-transparent border-0 border-b border-slate-200 dark:border-slate-700 focus:ring-0 focus:border-primary p-0 pb-2 text-2xl md:text-3xl font-bold"
                />
                <span className="absolute bottom-[-20px] right-0 text-xs text-slate-500">
                  {title.length}/100
                </span>
              </div>

              {/* SUBTITLE */}
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle..."
                className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 pb-2"
              />

              {/* TAGS */}
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tags: react, nextjs, javascript"
                className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 pb-2"
              />

              {/* COVER IMAGE */}
              <div className="mt-8">
                <label className="block text-sm font-medium mb-2">
                  Cover Image
                </label>
                <label
                  htmlFor="file-upload"
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg cursor-pointer"
                >
                  <div className="space-y-1 text-center">
                    <p className="text-sm text-slate-500">Upload Image</p>

                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                  </div>
                </label>
              </div>

              {/* RICH EDITOR */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg mt-8 overflow-hidden">

                {/* Toolbar */}
                <div className="flex items-center p-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                  <button onClick={() => handleCommand('bold')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <b>B</b>
                  </button>
                  <button onClick={() => handleCommand('italic')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <i>I</i>
                  </button>
                  <button onClick={() => handleCommand('underline')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <u>U</u>
                  </button>
                </div>

                {/* Editable Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="p-4 h-96 overflow-y-auto outline-none"
                  placeholder="Start writing..."
                />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
