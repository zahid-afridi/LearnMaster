'use client';

import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import CreatePostLoader from "../../components/CreatePostLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // for navigation

export default function CreatePostPage() {
  // Form States
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null); // Image Preview

  // Loader State
  const [loading, setLoading] = useState(false);

  // Rich Editor Reference
  const editorRef = useRef(null);

  // User ID From Redux
  const user_id = useSelector((state) => state.user.user_id);

  // Router for redirect
  const router = useRouter();

  // Toolbar Commands
  const handleCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  // Convert Image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  // Publish Post
  const handlePublish = async () => {
    if (!user_id) {
      // alert("User is not logged in!");
      toast.error("User is not logged in!");

      return;
    }

    setLoading(true); // Show Loader

    const content = editorRef.current.innerHTML;
    const tagArray = tags.split(",").map((tag) => tag.trim());

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
        toast.success("Post added successfully!");
        setLoading(false);

        // Redirect to home after 1 second delay
        setTimeout(() => {
          router.push("/");
        }, 1000);

      } else {
        setLoading(false);
        alert("Error: " + JSON.stringify(data.errors || data.message));
      }
    } catch (error) {
      console.error("Publish Error:", error);
      setLoading(false);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen">

      {loading && <CreatePostLoader />}

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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* Left Section */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">

              {/* Title */}
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="100"
                  placeholder="Post Title..."
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 text-2xl md:text-3xl font-bold border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute bottom-[-20px] right-0 text-xs text-slate-500">
                  {title.length}/100
                </span>
              </div>

              {/* Subtitle */}
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle..."
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Tags */}
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tags: react, nextjs, javascript"
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />

             {/* Cover Image Upload */}
<div className="mt-4">
  <label className="block text-sm font-medium mb-2">Cover Image</label>

  {/* Hidden File Input */}
  <input
    id="coverUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }}
  />

  {/* Custom Styled Button */}
 <label
  htmlFor="coverUpload"
  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md cursor-pointer shadow hover:bg-gray-800 transition-all gap-2"
>
  <span className="material-symbols-outlined text-base">upload</span>
  Choose Post Image
</label>


  {/* File Name Display */}
  {coverImage && (
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Selected: <span className="font-medium">{coverImage.name}</span>
    </p>
  )}

  {/* Preview */}
  {preview && (
    <div className="mt-4">
      <p className="text-sm mb-1 font-semibold">Preview:</p>
      <img
        src={preview}
        alt="preview"
        className="w-60 h-40 object-cover rounded-md shadow-lg border"
      />
    </div>
  )}
</div>


              {/* Rich Text Editor */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg mt-8 overflow-hidden">

                {/* Toolbar */}
                <div className="flex items-center p-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                  <button onClick={() => handleCommand("bold")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <b>B</b>
                  </button>
                  <button onClick={() => handleCommand("italic")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <i>I</i>
                  </button>
                  <button onClick={() => handleCommand("underline")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <u>U</u>
                  </button>
                </div>

                {/* Editable Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="p-4 h-96 overflow-y-auto outline-none bg-gray-50 dark:bg-gray-800"
                />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
