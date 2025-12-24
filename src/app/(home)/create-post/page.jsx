'use client';
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import CreatePostLoader from "../../components/CreatePostLoader";
import CreatePostLoader from "../../components/CreatePostLoader"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  /* ================= STATES ================= */
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= REFS ================= */
  const editorRef = useRef(null);
  const selectionRef = useRef(null);

  /* ================= GLOBAL ================= */
  const user_id = useSelector((state) => state.user.user_id);
  const router = useRouter();

  /* ================= SELECTION HANDLING ================= */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      selectionRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (selectionRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(selectionRef.current);
    }
  };

  /* ================= TOOLBAR COMMAND ================= */
  const handleCommand = (command) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, null);
    saveSelection();
  };

  /* ================= IMAGE PREVIEW ================= */
  useEffect(() => {
    if (!coverImage) return;
    const url = URL.createObjectURL(coverImage);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  /* ================= BASE64 ================= */
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /* ================= CONTENT CLEANER ================= */
  const getEditorContent = () => {
    if (!editorRef.current) return "";
    const html = editorRef.current.innerHTML.trim();
    if (html === "<br>" || html === "<div><br></div>") return "";
    return html;
  };

  /* ================= PUBLISH ================= */
 /* ================= PUBLISH ================= */
const handlePublish = async () => {
  if (!user_id) {
    toast.error("⚠️ Please log in or register first to create a post.", {
      description: "You must be logged in to publish posts.",
      duration: 4000,
    });
    return;
  }

  const content = getEditorContent();
  if (!content) {
    toast.error("Post content cannot be empty!", {
      description: "Please add some content before publishing.",
      duration: 3000,
    });
    return;
  }

  setLoading(true);

  try {
    const base64Image = coverImage ? await convertToBase64(coverImage) : null;

    const payload = {
      user_id,
      title,
      subtitle,
      content,
      post_img: base64Image ? [base64Image] : [],
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    };

   const res = await fetch("/api/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(payload),
});

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Publish failed");
    }

    toast.success("Post published successfully!", {
      description: "Your post is now live.",
      duration: 3000,
    });
    setTimeout(() => router.push("/"), 1000);

  } catch (error) {
    console.error("Publish Error:", error);
    toast.error(" Something went wrong while publishing.", {
      description: "Please try again later.",
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};


  /* ================= JSX (UNCHANGED UI) ================= */
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

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
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

              {/* Cover Image */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <input
                  id="coverUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
                <label
                  htmlFor="coverUpload"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md cursor-pointer shadow hover:bg-gray-800 transition-all gap-2"
                >
                  <span className="material-symbols-outlined text-base">upload</span>
                  Choose Post Image
                </label>

                {preview && (
                  <div className="mt-4">
                    <p className="text-sm mb-1 font-semibold">Preview:</p>
                    <img src={preview} alt="preview" className="w-60 h-40 object-cover rounded-md shadow-lg border" />
                  </div>
                )}
              </div>

              {/* Editor */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg mt-8 overflow-hidden">
                <div className="flex items-center p-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleCommand("bold")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"><b>B</b></button>
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleCommand("italic")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"><i>I</i></button>
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleCommand("underline")} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"><u>U</u></button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onMouseUp={saveSelection}
                  onKeyUp={saveSelection}
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
