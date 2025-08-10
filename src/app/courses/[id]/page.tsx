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



"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle,
  Bookmark,
  Share,
  MessageCircle,
  FileText,
} from "lucide-react";
import Header from "@/components/Header";



export default function Page() {
  
  const [notes, setNotes] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const courseData = {
    title: "Advanced React Development",
    currentLesson: {
      title: "Understanding State Management in React",
      duration: "15 min read",
      progress: 45,
      content: `
# Understanding State Management in React

State management is one of the most crucial concepts in React development. As your applications grow in complexity, managing state effectively becomes essential for maintaining clean, scalable, and performant code.

## What is State?

State in React represents the data that can change over time within a component or application. Unlike props, which are passed down from parent components and remain immutable within the receiving component, state is owned and managed by the component itself.

... (content truncated for brevity) ...
`,
    },
    lessons: [
      { id: 1, title: "Introduction to React", completed: true, current: false },
      { id: 2, title: "Components and JSX", completed: true, current: false },
      { id: 3, title: "Props and Data Flow", completed: true, current: false },
      { id: 4, title: "Event Handling", completed: true, current: false },
      { id: 5, title: "Understanding State Management", completed: false, current: true },
      { id: 6, title: "Advanced Hooks", completed: false, current: false },
      { id: 7, title: "Context API Deep Dive", completed: false, current: false },
      { id: 8, title: "Performance Optimization", completed: false, current: false },
    ],
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-900">
        <div className="flex">
          {/* Sidebar - Lesson Navigation */}
          <aside className="hidden lg:block w-80 border-r bg-gray-100/20">
            <div className="sticky top-0 h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="font-semibold text-lg mb-2">{courseData.title}</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{courseData.lessons.length} lessons</span>
                  </div>
                  <div className="bg-blue-200 rounded-full h-2 w-full overflow-hidden relative">
                    <div
                      className="bg-blue-600 h-full transition-all"
                      style={{ transform: `translateX(-${100 - 62}%)` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">5 of 8 completed</p>
                </div>
              </div>

              <nav className="p-4">
                <div className="space-y-2">
                  {courseData.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        lesson.current
                          ? "bg-blue-700/10 border border-blue-700/20"
                          : lesson.completed
                          ? "hover:bg-gray-100/50"
                          : "hover:bg-gray-100/50 opacity-75"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : lesson.current ? (
                          <div className="w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-400/30 rounded-full" />
                        )}
                      </div>
                      <p
                        className={`flex-1 min-w-0 text-sm font-medium truncate ${
                          lesson.current ? "text-blue-700" : ""
                        }`}
                      >
                        {lesson.title}
                      </p>
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                    type="button"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div>
                    <h1 className="font-semibold">{courseData.currentLesson.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{courseData.currentLesson.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isBookmarked ? "text-blue-700" : "text-gray-700"
                    }`}
                    aria-label="Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700"
                    aria-label="Share"
                  >
                    <Share className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700"
                    aria-label="Comments"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-4 pb-4">
                {/* Progress Bar */}
                <div className="bg-blue-200 rounded-full h-2 w-full overflow-hidden relative">
                  <div
                    className="bg-blue-600 h-full transition-all"
                    style={{ transform: `translateX(-${100 - courseData.currentLesson.progress}%)` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-600">
                    {courseData.currentLesson.progress}% completed
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                    <FileText className="w-3 h-3" />
                    Text Lesson
                  </span>
                </div>
              </div>
            </header>

            {/* Reading Content */}
            <article className="max-w-4xl mx-auto p-6 lg:p-8 prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
              {courseData.currentLesson.content}
            </article>

            {/* Notes Section */}
            <section className="max-w-4xl mx-auto p-6 lg:p-8 mt-12 border rounded-lg shadow-sm bg-white">
              <header className="mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-semibold">My Notes</h2>
              </header>
              <textarea
                placeholder="Take notes while reading this lesson..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full min-h-[8rem] p-3 rounded border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">Notes are automatically saved</p>
                <button
                  type="button"
                  className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Notes
                </button>
              </div>
            </section>

            {/* Navigation Footer */}
            <footer className="max-w-4xl mx-auto p-6 lg:p-8 mt-12 pt-8 border-t flex justify-between items-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2 rounded bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Complete & Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
