// "use client";

// import { useState, useEffect } from "react";
// import { LessonSidebar } from "./LessonSidebar";
// import { LessonHeader } from "./LessonHeader";
// import { LessonContent } from "./LessonContent";
// import { NotesSection } from "./NotesSection";
// import { LessonNavigation } from "./LessonNavigation";
// import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
// import lessonData from "../../../public/index.js";
// import { useParams } from "next/navigation";

// export default function View() {
//   const params = useParams()
//   console.log(params.id)

//   const [lessonProgress, setLessonProgress] = useState(45);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
//   const [clickLesson, setClickLesson] = useState(null);
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
//   const [course, setCourse] = useState([])
//   console.log('course', course)

//   useEffect(() => {
//     GetCourseMeta();
//   }, []);

//   const GetCourseMeta = async () => {
//     try {
//       const res = await fetch(`/api/course/${params.id}`, {
//         method: "GET",
//       });
//       const data = await res.json();
//       if (data) {
//         setCourse(data.data[0])
//         console.log(data)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Create flat list of all lessons from course data instead of static lessonData
//   const getAllLessons = () => {
//     if (!course?.modules) return [];

//     const allLessons = [];
//     course.modules.forEach((module, moduleIndex) => {
//       module.lessons.forEach((lesson, lessonIndex) => {
//         allLessons.push({
//           ...lesson,
//           moduleIndex,
//           lessonIndex,
//           moduleTitle: module.title,
//         });
//       });
//     });
//     return allLessons;
//   };

//   const allLessons = getAllLessons();
//   { allLessons && console.log(allLessons) }

//   // Initialize first lesson - wait for course data to load
//   useEffect(() => {
//     if (course?.modules && allLessons.length > 0 && !clickLesson) {
//       setClickLesson(allLessons[0]);
//       setCurrentLessonIndex(0);
//     }
//   }, [course, allLessons.length]);

//   // Update current lesson index when lesson changes
//   useEffect(() => {
//     if (clickLesson?.lesson_id) {
//       const index = allLessons.findIndex(
//         (lesson) => lesson.lesson_id === clickLesson.lesson_id
//       );
//       if (index !== -1) {
//         setCurrentLessonIndex(index);
//       }
//     }
//   }, [clickLesson, allLessons]);

//   // Navigation handlers
//   const handlePrevious = () => {
//     if (currentLessonIndex > 0) {
//       const prevLesson = allLessons[currentLessonIndex - 1];
//       setClickLesson(prevLesson);
//       setCurrentLessonIndex(currentLessonIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentLessonIndex < allLessons.length - 1) {
//       const nextLesson = allLessons[currentLessonIndex + 1];
//       setClickLesson(nextLesson);
//       setCurrentLessonIndex(currentLessonIndex + 1);

//       if (lessonProgress < 100) {
//         setLessonProgress(100);
//       }
//     }
//   };

//   const handleMarkComplete = () => {
//     setLessonProgress(100);

//     setTimeout(() => {
//       if (currentLessonIndex < allLessons.length - 1) {
//         handleNext();
//       }
//     }, 500);
//   };

//   // Handle lesson selection from sidebar
//   const handleLessonClick = (lesson) => {
//     const extendedLesson = allLessons.find(
//       (l) => l.lesson_id === lesson.lesson_id
//     );
//     if (extendedLesson) {
//       setClickLesson(extendedLesson);
//     }
//     if (mobileSidebarOpen) {
//       setMobileSidebarOpen(false);
//     }
//   };

//   // Wait until course data is loaded and lesson is selected
//   if (!course?.modules || !clickLesson) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
//       {/* Mobile Header */}
//       <div className="lg:hidden flex items-center justify-between bg-white p-4 border-b">
//         <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
//           <Menu size={24} />
//         </button>
//         <h1 className="font-bold">{course.title}</h1>
//         <div></div>
//       </div>

//       {/* Desktop Sidebar Toggle */}
//       <button
//         onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
//         className="hidden lg:block fixed top-4 left-5 z-50 p-[3px] bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
//         style={{
//           left: desktopSidebarOpen ? "250px" : "16px",
//           transition: "left 0.3s ease-in-out",
//           marginTop: "12px",
//         }}
//       >
//         {desktopSidebarOpen ? (
//           <ChevronLeft size={20} />
//         ) : (
//           <ChevronRight size={20} />
//         )}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static inset-y-0 left-0 bg-white z-40 transform
//            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//            lg:translate-x-0 transition-all duration-300 ease-in-out border-r
//            flex xs:flex-row lg:flex-col
//           ${desktopSidebarOpen ? "lg:w-64" : "lg:w-0 lg:overflow-hidden"}
//           w-64`}
//       >
//         <LessonSidebar
//           course={course}
//           setClickLesson={handleLessonClick}
//         />
//       </div>

//       {/* Main Content */}
//       <div
//         className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${!desktopSidebarOpen ? "lg:ml-0" : ""
//           }`}
//         onClick={() => {
//           if (mobileSidebarOpen) setMobileSidebarOpen(false);
//         }}
//       >
//         <LessonHeader
//           HeaderData={clickLesson}
//           progress={lessonProgress}
//           isBookmarked={isBookmarked}
//           setClickLesson={setClickLesson}
//           onBookmark={() => setIsBookmarked(!isBookmarked)}
//           onShare={() => console.log("Share clicked")}
//           onComments={() => console.log("Comments clicked")}
//         />

//         <div className="flex-1 overflow-y-auto">
//           <LessonContent clickLesson={clickLesson} course={course} />
//           <NotesSection />
//         </div>

//         <LessonNavigation
//           hasPrevious={currentLessonIndex > 0}
//           hasNext={currentLessonIndex < allLessons.length - 1}
//           isCompleted={lessonProgress === 100}
//           onPrevious={handlePrevious}
//           onNext={handleNext}
//           onMarkComplete={handleMarkComplete}
//           currentLesson={currentLessonIndex + 1}
//           totalLessons={allLessons.length}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { LessonSidebar } from "./LessonSidebar";
import { LessonHeader } from "./LessonHeader";
import { LessonContent } from "./LessonContent";
import { NotesSection } from "./NotesSection";
import { LessonNavigation } from "./LessonNavigation";
import { Menu, ChevronLeft, ChevronRight, Sparkles, BookOpen, Loader2 } from "lucide-react";

import { useParams } from "next/navigation";

export default function View() {
  const params = useParams();

  const [lessonProgress, setLessonProgress] = useState(45);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [clickLesson, setClickLesson] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarTransition, setSidebarTransition] = useState(false);
  const mainContentRef = useRef(null); // Add ref for scroll control

  // Improved scroll to top function
  const scrollToTop = () => {
    // First try to scroll the main content area (most likely to work for your layout)
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }



    // Final fallback: scroll the window
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };





  const getAllLessons = () => {
    if (!course?.modules) return [];

    const allLessons = [];
    course.modules.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        allLessons.push({
          ...lesson,
          moduleIndex,
          lessonIndex,
          moduleTitle: module.title,
        });
      });
    });
    return allLessons;
  };

  const allLessons = getAllLessons();


  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      setClickLesson(prevLesson);
      setCurrentLessonIndex(currentLessonIndex - 1);

      // Add small delay to ensure content is rendered before scrolling
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      setClickLesson(nextLesson);
      setCurrentLessonIndex(currentLessonIndex + 1);

      if (lessonProgress < 100) {
        setLessonProgress(100);
      }

      // Add small delay to ensure content is rendered before scrolling
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const handleMarkComplete = () => {
    setLessonProgress(100);

    setTimeout(() => {
      if (currentLessonIndex < allLessons.length - 1) {
        handleNext();
      }
    }, 500);
  };

  const handleLessonClick = async (lesson) => {
   
    try {
      setLoading(true)
      const res = await fetch(`/api/course/modules/lesson/${lesson.lesson_id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data) {


        
         
        setClickLesson(data.data[0]);
        setLoading(false)
      }
      setLoading(false)

    } catch (error) {
setLoading(false)
    }

  };

  const handleDesktopSidebarToggle = () => {
    setSidebarTransition(true);
    setDesktopSidebarOpen(!desktopSidebarOpen);
    setTimeout(() => setSidebarTransition(false), 300);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col lg:flex-row relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-purple-100/40 pointer-events-none"></div>

      <div className="lg:hidden flex items-center justify-between p-4 border-b relative z-20">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="w-10 h-10"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-slate-800 truncate px-4">{course.title}</h1>
        <div className="w-10"></div>
      </div>

      <button
        onClick={handleDesktopSidebarToggle}
        className="hidden lg:block fixed top-6 z-50 p-3 bg-white/80 border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 hover:scale-105 group"
        style={{
          left: desktopSidebarOpen ? "290px" : "20px",
        }}
      >
        {desktopSidebarOpen ? (
          <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
        )}

        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {desktopSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </div>
      </button>

      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-all duration-300 ease-out
           ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
           lg:translate-x-0 border-r border-slate-200/60
           ${desktopSidebarOpen ? "lg:w-80" : "lg:w-0 lg:overflow-hidden"}
           w-80 ${sidebarTransition ? 'transition-all duration-300' : ''}`}
      >
        <div className="h-full bg-white/60 backdrop-blur-xl">
          <LessonSidebar
            course={course}
            setClickLesson={handleLessonClick}
          
          />
        </div>
      </div>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-out relative
          ${!desktopSidebarOpen ? "lg:ml-0" : ""}
        `}
      >
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-hidden">
            {/* Add the ref to this scrollable container */}
            <div
              ref={mainContentRef}
              className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent hover:scrollbar-thumb-slate-400/50"
            >
              <LessonContent clickLesson={clickLesson} course={course} loading={loading}/>
            </div>
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-slate-200/60">
            <LessonNavigation
            loading={loading}
              hasPrevious={currentLessonIndex > 0}
              hasNext={currentLessonIndex < allLessons.length - 1}
              isCompleted={lessonProgress === 100}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onMarkComplete={handleMarkComplete}
              currentLesson={currentLessonIndex + 1}
              totalLessons={allLessons.length}
            />
          </div>
        </div>
      </div>

      <button
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 z-30"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <BookOpen size={24} />
      </button>
    </div>
  );
}