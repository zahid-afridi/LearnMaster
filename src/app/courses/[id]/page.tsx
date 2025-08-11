// "use client";

// import React from "react";
// import { Book, Clock, Trophy, TrendingUp, Play, CheckCircle } from "lucide-react";

// // ---------- Card Components ----------

// function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       data-slot="card"
//       className={`bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm ${className}`}
//       {...props}
//     />
//   );
// }

// function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       data-slot="card-header"
//       className={`grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 border-b pb-6 ${className}`}
//       {...props}
//     />
//   );
// }

// function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
//   return (
//     <h4
//       data-slot="card-title"
//       className={`leading-none font-semibold text-lg ${className}`}
//       {...props}
//     />
//   );
// }

// function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
//   return (
//     <p
//       data-slot="card-description"
//       className={`text-gray-500 ${className}`}
//       {...props}
//     />
//   );
// }

// function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       data-slot="card-content"
//       className={`px-6 pb-6 ${className}`}
//       {...props}
//     />
//   );
// }

// // ---------- Progress Component ----------

// function Progress({
//   className = "",
//   value = 0,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement> & { value?: number }) {
//   return (
//     <div
//       data-slot="progress"
//       className={`bg-blue-200 relative h-2 w-full overflow-hidden rounded-full ${className}`}
//       {...props}
//     >
//       <div
//         data-slot="progress-indicator"
//         className="bg-blue-600 h-full transition-all"
//         style={{ transform: `translateX(-${100 - value}%)` }}
//       />
//     </div>
//   );
// }

// // ---------- Button Component ----------

// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
//   size?: "default" | "sm" | "lg" | "icon";
// };

// function Button({
//   className = "",
//   variant = "default",
//   size = "default",
//   ...props
// }: ButtonProps) {
//   const base =
//     "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";

//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     destructive: "bg-red-600 text-white hover:bg-red-700",
//     outline:
//       "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
//     secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
//     ghost: "hover:bg-gray-100 text-gray-900",
//     link: "text-blue-600 underline hover:text-blue-700",
//   };

//   const sizes = {
//     default: "h-9 px-4 py-2",
//     sm: "h-8 px-3 rounded-md gap-1.5",
//     lg: "h-10 px-6 rounded-md",
//     icon: "w-9 h-9 p-0 rounded-md",
//   };

//   return (
//     <button
//       className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     />
//   );
// }

// // ---------- Avatar Components ----------

// function Avatar({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100 ${className}`}
//       {...props}
//     />
//   );
// }

// function AvatarFallback({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={`text-gray-600 text-xs font-semibold flex items-center justify-center w-full h-full ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// // ---------- DashboardCards Combined Component ----------

// export  default function page() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
//       {/* Continue Learning */}
//       <Card className="lg:col-span-2">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Book className="h-5 w-5 text-blue-600" />
//             Continue Learning
//           </CardTitle>
//           <CardDescription>Pick up where you left off</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-100/40">
//             <div className="w-16 h-12 bg-blue-600/10 rounded-md flex items-center justify-center">
//               <Play className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-medium">Advanced React Development</h4>
//               <p className="text-sm text-gray-600">Chapter 5: State Management</p>
//               <Progress value={75} className="mt-2 h-2" />
//               <p className="text-xs text-gray-600 mt-1">75% complete</p>
//             </div>
//             <Button size="sm">Continue</Button>
//           </div>
//           <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-100/40">
//             <div className="w-16 h-12 bg-blue-600/10 rounded-md flex items-center justify-center">
//               <Play className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-medium">UI/UX Design Principles</h4>
//               <p className="text-sm text-gray-600">Lesson 3: Color Theory</p>
//               <Progress value={45} className="mt-2 h-2" />
//               <p className="text-xs text-gray-600 mt-1">45% complete</p>
//             </div>
//             <Button size="sm">Continue</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Upcoming Assignments */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Clock className="h-5 w-5 text-blue-600" />
//             Upcoming Assignments
//           </CardTitle>
//           <CardDescription>Due soon</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300">
//             <div>
//               <h5 className="font-medium text-sm">React Project</h5>
//               <p className="text-xs text-gray-600">Due in 2 days</p>
//             </div>
//             <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
//               In Progress
//             </div>
//           </div>
//           <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300">
//             <div>
//               <h5 className="font-medium text-sm">Design Portfolio</h5>
//               <p className="text-xs text-gray-600">Due in 5 days</p>
//             </div>
//             <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
//               Not Started
//             </div>
//           </div>
//           <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300">
//             <div>
//               <h5 className="font-medium text-sm">Final Exam</h5>
//               <p className="text-xs text-gray-600">Due in 1 week</p>
//             </div>
//             <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
//               Ready
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Leaderboard */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Trophy className="h-5 w-5 text-blue-600" />
//             Leaderboard
//           </CardTitle>
//           <CardDescription>Top performers this week</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {[{
//             rank: 1,
//             name: "Sarah Anderson",
//             points: "2,840 pts",
//             fallback: "SA",
//             fallbackClass: ""
//           },{
//             rank: 2,
//             name: "Mike Johnson",
//             points: "2,720 pts",
//             fallback: "MJ",
//             fallbackClass: ""
//           },{
//             rank: 3,
//             name: "John Doe (You)",
//             points: "2,650 pts",
//             fallback: "JD",
//             fallbackClass: "bg-blue-600 text-white"
//           }].map(({rank, name, points, fallback, fallbackClass}) => (
//             <div key={rank} className="flex items-center gap-3">
//               <div
//                 className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
//                   rank === 1 ? "bg-yellow-500" :
//                   rank === 2 ? "bg-gray-400" :
//                   "bg-orange-500"
//                 }`}
//               >
//                 {rank}
//               </div>
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback className={fallbackClass}>{fallback}</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <p className="font-medium text-sm">{name}</p>
//                 <p className="text-xs text-gray-500">{points}</p>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Course Progress */}
//       <Card className="lg:col-span-2 xl:col-span-4">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <TrendingUp className="h-5 w-5 text-blue-600" />
//             Course Progress
//           </CardTitle>
//           <CardDescription>Your learning journey overview</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[{
//               name: "React Development",
//               percent: 75,
//               lessonsCompleted: 15,
//               lessonsTotal: 20,
//               color: "green-600"
//             },{
//               name: "UI/UX Design",
//               percent: 45,
//               lessonsCompleted: 9,
//               lessonsTotal: 20,
//               color: "yellow-600"
//             },{
//               name: "Data Science",
//               percent: 25,
//               lessonsCompleted: 5,
//               lessonsTotal: 20,
//               color: "blue-600"
//             }].map(({name, percent, lessonsCompleted, lessonsTotal, color}) => (
//               <div key={name} className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium">{name}</h4>
//                   <div className="flex items-center gap-1">
//                     <CheckCircle className={`h-4 w-4 text-${color}`} />
//                     <span className="text-sm text-gray-500">{percent}%</span>
//                   </div>
//                 </div>
//                 <Progress value={percent} className="h-2" />
//                 <p className="text-sm text-gray-500">
//                   {lessonsCompleted} of {lessonsTotal} lessons completed
//                 </p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useMemo, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import {
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Clock,
//   CheckCircle,
//   Bookmark,
//   Share2 as Share,
//   MessageCircle,
//   FileText,
//   Search,
//   Sun,
//   Moon,
//   Award,
// } from "lucide-react";
// import Header from "@/components/Header"; // keep your Header

// // Monaco editor only when needed (dynamic import to avoid SSR issues)
// const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false, loading: () => null });

// /**
//  * Tiny markdown-to-html helper for basic content rendering
//  * Supports: # H1, ## H2, ```code``` blocks, and paragraphs.
//  */
// function mdToHtml(md = "") {
//   // escape HTML
//   const esc = (s) =>
//     s
//       .replaceAll("&", "&amp;")
//       .replaceAll("<", "&lt;")
//       .replaceAll(">", "&gt;");
//   const lines = md.split("\n");
//   let out = "";
//   let inCode = false;
//   let codeBuf = [];
//   for (let line of lines) {
//     if (line.trim().startsWith("```")) {
//       if (!inCode) {
//         inCode = true;
//         codeBuf = [];
//       } else {
//         inCode = false;
//         out += `<pre class="bg-gray-900 text-green-300 p-3 rounded-md overflow-auto"><code>${esc(
//           codeBuf.join("\n")
//         )}</code></pre>`;
//       }
//       continue;
//     }
//     if (inCode) {
//       codeBuf.push(line);
//       continue;
//     }
//     if (line.startsWith("# ")) {
//       out += `<h1 class="text-2xl font-bold mt-4 mb-2">${esc(line.replace(/^#\s+/, ""))}</h1>`;
//     } else if (line.startsWith("## ")) {
//       out += `<h2 class="text-xl font-semibold mt-3 mb-1">${esc(line.replace(/^##\s+/, ""))}</h2>`;
//     } else if (line.trim() === "") {
//       out += `<p class="my-2"></p>`;
//     } else {
//       out += `<p class="my-2 leading-relaxed">${esc(line)}</p>`;
//     }
//   }
//   return out;
// }

// export default function page({ initialCourse }) {
//   // UI state
//   const [course, setCourse] = useState(null); // may come from API; fallback loaded in useEffect
//   const [loading, setLoading] = useState(true);
//   const [dark, setDark] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   // per-lesson state
//   const [selectedLessonId, setSelectedLessonId] = useState(null);
//   const [notes, setNotes] = useState("");
//   const [comments, setComments] = useState([]); // simple local comments
//   const [commentText, setCommentText] = useState("");
//   const contentRef = useRef(null);

//   // fetchCourse: replace this with real API call using slug/params
//   async function fetchCourse() {
//     // simulate network delay
//     await new Promise((r) => setTimeout(r, 350));
//     // fallback data (dynamic-ready)
//     return {
//       id: "react-adv-001",
//       title: "Advanced React Development",
//       isCoding: true,
//       lessons: [
//         { id: 1, title: "Introduction to React", completed: true },
//         { id: 2, title: "Components & JSX", completed: true },
//         { id: 3, title: "Props & Data Flow", completed: true },
//         { id: 4, title: "Event Handling", completed: true },
//         {
//           id: 5,
//           title: "Understanding State Management",
//           completed: false,
//           content: `# Understanding State Management in React

// State management is one of the most crucial concepts in React development. As your applications grow in complexity, managing state effectively becomes essential.

// ## Local Component State vs Global State

// Local state: useState inside component...
// ## Example
// \`\`\`js
// const [count, setCount] = useState(0);
// \`\`\`
// `,
//           duration: "12 min read",
//         },
//         { id: 6, title: "Advanced Hooks", completed: false },
//         { id: 7, title: "Context API Deep Dive", completed: false },
//         { id: 8, title: "Performance Optimization", completed: false },
//       ],
//       xp: 2800,
//       badges: ["React Pro", "State Master"],
//     };
//   }

//   // Load course on mount (or use initialCourse prop)
//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const data = initialCourse ?? (await fetchCourse());
//         if (!mounted) return;
//         setCourse(data);
//         // choose first current-like lesson or first lesson with content
//         const firstWithContent =
//           data.lessons.find((l) => l.content) ?? data.lessons.find((l) => !l.completed) ?? data.lessons[0];
//         setSelectedLessonId(firstWithContent?.id ?? data.lessons[0].id);
//         // bookmark state from localStorage
//         const bookmarkKey = `bookmark_${data.id}`;
//         setIsBookmarked(localStorage.getItem(bookmarkKey) === "1");
//       } catch (err) {
//         console.error("load course", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => (mounted = false);
//   }, [initialCourse]);

//   // derive selected lesson
//   const lesson = useMemo(() => {
//     if (!course) return null;
//     return course.lessons.find((l) => l.id === selectedLessonId) ?? course.lessons[0];
//   }, [course, selectedLessonId]);

//   // localStorage keys helpers
//   const notesKey = useMemo(() => (course && lesson ? `notes_${course.id}_lesson_${lesson.id}` : null), [course, lesson]);
//   const highlightsKey = useMemo(() => (course && lesson ? `highlights_${course.id}_lesson_${lesson.id}` : null), [course, lesson]);
//   const commentsKey = useMemo(() => (course ? `comments_${course.id}` : null), [course]);

//   // load notes & comments when lesson changes
//   useEffect(() => {
//     if (!lesson) return;
//     // load notes
//     try {
//       const saved = localStorage.getItem(notesKey);
//       setNotes(saved ?? "");
//     } catch (e) {
//       setNotes("");
//     }
//     // load comments for course
//     try {
//       const savedComments = commentsKey ? JSON.parse(localStorage.getItem(commentsKey) || "[]") : [];
//       setComments(savedComments);
//     } catch (e) {
//       setComments([]);
//     }
//   }, [lesson, notesKey, commentsKey]);

//   // auto-save notes
//   useEffect(() => {
//     if (!notesKey) return;
//     const t = setTimeout(() => {
//       localStorage.setItem(notesKey, notes);
//     }, 500);
//     return () => clearTimeout(t);
//   }, [notesKey, notes]);

//   // toggle bookmark
//   function toggleBookmark() {
//     if (!course) return;
//     const key = `bookmark_${course.id}`;
//     const newVal = !isBookmarked;
//     setIsBookmarked(newVal);
//     localStorage.setItem(key, newVal ? "1" : "0");
//   }

//   // mark lesson complete and go to next
//   function markCompleteAndNext() {
//     if (!course || !lesson) return;
//     // find lesson index
//     const idx = course.lessons.findIndex((l) => l.id === lesson.id);
//     if (idx === -1) return;
//     // update completed locally (in real app call API)
//     const updated = { ...course };
//     updated.lessons = updated.lessons.map((l) => (l.id === lesson.id ? { ...l, completed: true } : l));
//     // set XP and badges for mock gamification
//     updated.xp = (updated.xp || 0) + 50;
//     if (!updated.badges) updated.badges = [];
//     if (updated.lessons.filter((l) => l.completed).length >= 5 && !updated.badges.includes("Learner")) {
//       updated.badges.push("Learner");
//     }
//     setCourse(updated);
//     // go to next lesson
//     const next = updated.lessons[idx + 1];
//     if (next) setSelectedLessonId(next.id);
//   }

//   // previous/next navigation
//   function goPrev() {
//     if (!course || !lesson) return;
//     const idx = course.lessons.findIndex((l) => l.id === lesson.id);
//     if (idx > 0) setSelectedLessonId(course.lessons[idx - 1].id);
//   }
//   function goNext() {
//     if (!course || !lesson) return;
//     const idx = course.lessons.findIndex((l) => l.id === lesson.id);
//     if (idx < course.lessons.length - 1) setSelectedLessonId(course.lessons[idx + 1].id);
//   }

//   // add comment (local)
//   function submitComment() {
//     if (!commentText.trim() || !course) return;
//     const newComment = {
//       id: Date.now(),
//       text: commentText.trim(),
//       createdAt: new Date().toISOString(),
//     };
//     const updated = [newComment, ...comments];
//     setComments(updated);
//     localStorage.setItem(commentsKey, JSON.stringify(updated));
//     setCommentText("");
//   }

//   // highlights: save selected text
//   function saveHighlight() {
//     if (!contentRef.current || !course || !lesson) return;
//     const sel = window.getSelection();
//     if (!sel || sel.isCollapsed) return alert("Select text to highlight first.");
//     const text = sel.toString().trim();
//     if (!text) return;
//     const existing = JSON.parse(localStorage.getItem(highlightsKey) || "[]");
//     const next = [...existing, { id: Date.now(), text }];
//     localStorage.setItem(highlightsKey, JSON.stringify(next));
//     alert("Highlight saved ✔");
//   }

//   // load highlights
//   const highlights = useMemo(() => {
//     if (!highlightsKey) return [];
//     try {
//       return JSON.parse(localStorage.getItem(highlightsKey) || "[]");
//     } catch {
//       return [];
//     }
//   }, [highlightsKey, lesson?.id]);

//   // filtered lessons by search
//   const filteredLessons = useMemo(() => {
//     if (!course) return [];
//     if (!searchTerm.trim()) return course.lessons;
//     return course.lessons.filter((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()));
//   }, [course, searchTerm]);

//   // derive progress
//   const progressPercent = useMemo(() => {
//     if (!course) return 0;
//     const done = course.lessons.filter((l) => l.completed).length;
//     return Math.round((done / course.lessons.length) * 100);
//   }, [course]);

//   if (loading || !course) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//           <div className="text-center p-8 bg-white rounded-xl shadow-md dark:bg-gray-800">
//             <p className="text-lg text-gray-600 dark:text-gray-200">Loading course...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className={`${dark ? "dark" : ""}`}>
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//           <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 p-6">
//             {/* Sidebar */}
//             <aside className="hidden lg:block sticky top-6 h-[calc(100vh-48px)] overflow-auto">
//               <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-lg font-bold">{course.title}</h3>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
//                       <BookOpen className="w-4 h-4" />
//                       <span>{course.lessons.length} lessons</span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-xs text-gray-500 dark:text-gray-300">XP</div>
//                     <div className="font-semibold">{course.xp ?? 0}</div>
//                   </div>
//                 </div>

//                 {/* progress */}
//                 <div className="mb-3">
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all" style={{ width: `${progressPercent}%` }} />
//                   </div>
//                   <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
//                     <span>{progressPercent}% completed</span>
//                     <span>{course.lessons.filter((l) => l.completed).length} / {course.lessons.length}</span>
//                   </div>
//                 </div>

//                 {/* search */}
//                 <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mb-3">
//                   <Search className="w-4 h-4 text-gray-500" />
//                   <input
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search lessons..."
//                     className="bg-transparent outline-none text-sm w-full"
//                   />
//                 </div>

//                 {/* lessons */}
//                 <nav className="space-y-2 max-h-[52vh] overflow-auto pr-1">
//                   {filteredLessons.map((l) => (
//                     <button
//                       key={l.id}
//                       onClick={() => setSelectedLessonId(l.id)}
//                       className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition 
//                         ${l.id === lesson.id ? "bg-blue-600/10 border border-blue-600/20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
//                     >
//                       <div className="flex-shrink-0">
//                         {l.completed ? (
//                           <CheckCircle className="w-5 h-5 text-green-500" />
//                         ) : (
//                           <div className={`w-5 h-5 rounded-full ${l.id === lesson.id ? "bg-blue-600" : "border-2 border-gray-300"}`} />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <div className={`font-medium text-sm ${l.id === lesson.id ? "text-blue-700 dark:text-blue-300" : ""}`}>{l.title}</div>
//                         {l.duration && <div className="text-xs text-gray-500 dark:text-gray-400">{l.duration}</div>}
//                       </div>
//                     </button>
//                   ))}
//                 </nav>

//                 {/* badges */}
//                 <div className="mt-4">
//                   <div className="text-xs text-gray-500 mb-2">Badges</div>
//                   <div className="flex flex-wrap gap-2">
//                     {course.badges?.map((b, i) => (
//                       <div key={i} className="px-2 py-1 text-xs bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
//                         {b}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </aside>

//             {/* Main */}
//             <main>
//               {/* Top header */}
//               <div className="sticky top-6 z-20 bg-transparent mb-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <button onClick={goPrev} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow">
//                       <ChevronLeft className="w-4 h-4" /> Previous
//                     </button>
//                     <div>
//                       <h1 className="text-xl font-bold">{lesson?.title ?? "Lesson"}</h1>
//                       <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//                         <Clock className="w-4 h-4" />
//                         <span>{lesson?.duration ?? "—"}</span>
//                         <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">{lesson?.content ? "Text Lesson" : course.isCoding ? "Coding" : "Video/Text"}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div className="text-sm text-gray-500 mr-2 hidden sm:block">Dark</div>
//                     <button onClick={() => setDark((s) => !s)} className="p-2 rounded bg-white dark:bg-gray-800 shadow-sm">
//                       {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//                     </button>
//                     <button onClick={toggleBookmark} className={`p-2 rounded bg-white dark:bg-gray-800 shadow-sm ${isBookmarked ? "text-blue-600" : ""}`}>
//                       <Bookmark className="w-4 h-4" />
//                     </button>
//                     <button onClick={() => navigator.share ? navigator.share({ title: course.title, text: lesson.title }).catch(()=>{}) : alert('Share not supported')} className="p-2 rounded bg-white dark:bg-gray-800 shadow-sm">
//                       <Share className="w-4 h-4" />
//                     </button>
//                     <button onClick={() => {
//                       // quick scroll to comments
//                       const el = document.getElementById("comments-area");
//                       if (el) el.scrollIntoView({ behavior: "smooth" });
//                     }} className="p-2 rounded bg-white dark:bg-gray-800 shadow-sm">
//                       <MessageCircle className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* small progress bar */}
//                 <div className="mt-3">
//                   <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" style={{ width: `${progressPercent}%` }} />
//                   </div>
//                 </div>
//               </div>

//               {/* content + tools */}
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
//                   {/* left - reading */}
//                   <section>
//                     <article ref={contentRef} className="prose max-w-none dark:prose-invert">
//                       {/* If lesson has content (markdown), render transformed HTML */}
//                       {lesson?.content ? (
//                         <div dangerouslySetInnerHTML={{ __html: mdToHtml(lesson.content) }} />
//                       ) : (
//                         <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-md">
//                           <p className="text-sm text-gray-500">No text content for this lesson. Use code editor or video resource for this lesson.</p>
//                         </div>
//                       )}
//                     </article>

//                     {/* code editor area for coding lessons */}
//                     {course.isCoding && (
//                       <div className="mt-6">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="text-sm font-medium">Interactive Editor</div>
//                           <div className="text-xs text-gray-500">Try code & experiment</div>
//                         </div>
//                         <div className="h-64 bg-gray-900 rounded-md overflow-hidden">
//                           {/* Monaco only loads in client and if package installed */}
//                           {/* If Monaco not available user will see blank - you can install @monaco-editor/react */}
//                           <MonacoEditor defaultLanguage="javascript" theme={dark ? "vs-dark" : "light"} />
//                         </div>
//                       </div>
//                     )}

//                     {/* note + actions */}
//                     <div className="mt-6 bg-white dark:bg-gray-900 border rounded-lg p-4 shadow-sm">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-5 h-5" />
//                           <h3 className="font-semibold">My Notes</h3>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <button onClick={saveHighlight} className="px-3 py-1 rounded bg-blue-50 text-sm">Highlight</button>
//                           <button onClick={() => { navigator.clipboard?.writeText(lesson.content || ""); alert("Content copied to clipboard"); }} className="px-3 py-1 rounded bg-gray-100 text-sm">Copy</button>
//                         </div>
//                       </div>

//                       <textarea
//                         placeholder="Take notes for this lesson..."
//                         value={notes}
//                         onChange={(e) => setNotes(e.target.value)}
//                         className="w-full mt-3 min-h-[140px] p-3 rounded outline-none border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
//                       />
//                       <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                         <div>Notes auto-save</div>
//                         <div className="flex items-center gap-2">
//                           <button onClick={goPrev} className="px-3 py-1 rounded border">Prev</button>
//                           <button onClick={markCompleteAndNext} className="px-4 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-500 text-white">Mark Complete & Continue <ChevronRight className="inline-block w-4 h-4 ml-2" /></button>
//                         </div>
//                       </div>
//                     </div>
//                   </section>

//                   {/* right - tools */}
//                   <aside>
//                     <div className="sticky top-24">
//                       <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border">
//                         <div className="flex items-center justify-between mb-3">
//                           <div className="flex items-center gap-2">
//                             <Award className="w-5 h-5 text-yellow-500" />
//                             <div>
//                               <div className="text-xs text-gray-500">Progress</div>
//                               <div className="font-semibold">{progressPercent}%</div>
//                             </div>
//                           </div>
//                           <div className="text-xs text-gray-500">{course.lessons.filter(l=>l.completed).length}/{course.lessons.length}</div>
//                         </div>

//                         <div className="mb-3">
//                           <div className="text-xs text-gray-500 mb-2">Highlights</div>
//                           <div className="space-y-2 max-h-32 overflow-auto">
//                             {highlights.length === 0 && <div className="text-xs text-gray-500">No highlights yet</div>}
//                             {highlights.map((h) => (
//                               <div key={h.id} className="text-sm bg-white dark:bg-gray-800 p-2 rounded">{h.text}</div>
//                             ))}
//                           </div>
//                         </div>

//                         <div id="comments-area" className="mt-3">
//                           <div className="text-xs text-gray-500 mb-2">Discussion</div>
//                           <div className="space-y-2 max-h-40 overflow-auto">
//                             {comments.length === 0 && <div className="text-xs text-gray-500">No comments yet</div>}
//                             {comments.map((c) => (
//                               <div key={c.id} className="bg-white dark:bg-gray-800 p-2 rounded text-sm">
//                                 <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
//                                 <div>{c.text}</div>
//                               </div>
//                             ))}
//                           </div>

//                           <div className="mt-3">
//                             <textarea value={commentText} onChange={(e)=>setCommentText(e.target.value)} placeholder="Ask something..." className="w-full rounded p-2 bg-gray-50 dark:bg-gray-800 text-sm"></textarea>
//                             <div className="flex justify-between items-center mt-2">
//                               <div className="text-xs text-gray-500">Be kind — public comments</div>
//                               <button onClick={submitComment} className="px-3 py-1 rounded bg-blue-600 text-white">Comment</button>
//                             </div>
//                           </div>
//                         </div>

//                       </div>

//                       {/* quick actions */}
//                       <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
//                         <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
//                         <div className="flex flex-col gap-2">
//                           <button onClick={() => { alert("Share link copied"); }} className="px-3 py-2 rounded border text-sm">Copy share link</button>
//                           <button onClick={() => { alert("Leaderboards coming soon"); }} className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-sm">View Leaderboard</button>
//                         </div>
//                       </div>

//                     </div>
//                   </aside>

//                 </div>
//               </div>

//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client'

import View from '@/components/Reader/View'
import React from 'react'

export default function page() {
  return (
    <View/>
    
  )
}
