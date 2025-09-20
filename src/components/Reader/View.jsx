"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { LessonSidebar } from "./LessonSidebar";
import { LessonContent } from "./LessonContent";
import { LessonNavigation } from "./LessonNavigation";
import { Menu, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { setCourseMeta, setLesson, setModule } from "@/redux/slices/course/courseSlice";
import { toast } from "sonner";
import NocourseFound from "../NocourseFound";

export default function View() {
  const { data: session } = useSession();
  const userId = session?.user?.user_id;
  const { coursemeta, module, lesson } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [clickedLesson, setClickedLesson] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarTransition, setSidebarTransition] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [courseNotFound, setCourseNotFound] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);



  const mainContentRef = useRef(null);


  useEffect(() => {
    const contentEl = mainContentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50; // adjust 50px if needed
      setShowNavigation(isNearBottom);
    };

    contentEl.addEventListener("scroll", handleScroll);
    return () => contentEl.removeEventListener("scroll", handleScroll);
  }, []);

  // Collect all lessons with memoization
  const allLessons = useMemo(() => {
    if (!coursemeta?.modules) return [];
    return coursemeta.modules.flatMap((mod, moduleIndex) =>
      mod.lessons.map((les, lessonIndex) => ({
        ...les,
        moduleIndex,
        lessonIndex,
        moduleTitle: mod.title,
        parentModule: mod,
      }))
    );
  }, [coursemeta]);

  // Update lesson progress
  useEffect(() => {
    if (lesson) setLessonProgress(lesson.is_completed ? 100 : 0);
  }, [lesson]);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      dispatch(setLesson(prevLesson));
      dispatch(setModule(prevLesson.parentModule));
      setCurrentLessonIndex((i) => i - 1);
      setTimeout(scrollToTop, 100);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      dispatch(setLesson(nextLesson));
      dispatch(setModule(nextLesson.parentModule));
      setCurrentLessonIndex((i) => i + 1);

      if (lessonProgress < 100) setLessonProgress(100);
      setTimeout(scrollToTop, 100);
    }
  };

  const handleMarkComplete = async () => {
    if (!userId) return toast.error("Please login to continue");

    try {
      const res = await fetch("/api/course/modules/completedlesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId: coursemeta.course_id,
          moduleId: module?.module_id,
          lessonId: clickedLesson?.lesson_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to mark complete");

      const updatedCourse = {
        ...coursemeta,
        completed_lessons: (coursemeta.completed_lessons || 0) + 1,
        modules: coursemeta.modules.map((m) =>
          m.module_id !== module.module_id
            ? m
            : {
              ...m,
              lessons: m.lessons.map((l) =>
                l.lesson_id === clickedLesson.lesson_id
                  ? { ...l, is_completed: true }
                  : l
              ),
            }
        ),
      };

      dispatch(setCourseMeta(updatedCourse));
      toast.success("Lesson completed!");
      setLessonProgress(100);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Fetch current lesson
  useEffect(() => {
    if (!lesson) return;

    const fetchLesson = async () => {
      setLoading(true);
      try {
        const query = userId ? `?userId=${userId}` : "";
        const res = await fetch(`/api/course/modules/lesson/${lesson.lesson_id}${query}`);
        const data = await res.json();

        if (res.ok && data?.data?.length > 0) {
          setClickedLesson(data.data[0]);
          const idx = allLessons.findIndex((l) => l.lesson_id === lesson.lesson_id);
          if (idx !== -1) setCurrentLessonIndex(idx);
        } else {
          setCourseNotFound(true);
        }
      } catch (err) {
        setCourseNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lesson, coursemeta, userId, allLessons]);

  const handleDesktopSidebarToggle = () => {
    setSidebarTransition(true);
    setDesktopSidebarOpen(!desktopSidebarOpen);
    setTimeout(() => setSidebarTransition(false), 300);
  };

  if (courseNotFound) return <NocourseFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white/60 backdrop-blur-xl z-20">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-slate-800 truncate px-4">{coursemeta.title}</h1>
        <div className="w-6" />
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={handleDesktopSidebarToggle}
        className="hidden lg:block fixed top-6 z-50 p-3 bg-white/80 border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 hover:scale-105 group"
        style={{ left: desktopSidebarOpen ? "290px" : "20px" }}
        aria-label={desktopSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      >
        {desktopSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-all duration-300
         ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
         lg:translate-x-0 border-r border-slate-200
         ${desktopSidebarOpen ? "lg:w-80" : "lg:w-0 lg:overflow-hidden"}
         w-80`}
      >
        <LessonSidebar setCoursenotfound={setCourseNotFound} />
      </div>

      {/* Backdrop for mobile sidebar */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/20"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!desktopSidebarOpen ? "lg:ml-0" : ""}`}>
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-hidden">
            <div
              ref={mainContentRef}
              className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 hover:scrollbar-thumb-slate-400/50"
            >
              <LessonContent clickLesson={clickedLesson} loading={loading} />
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-slate-200">
            <LessonNavigation
              loading={loading}
              hasPrevious={currentLessonIndex > 0}
              hasNext={currentLessonIndex < allLessons.length - 1}
              isCompleted={lessonProgress === 100}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onMarkComplete={handleMarkComplete}
              currentLesson={coursemeta?.completed_lessons || 0}
              totalLessons={allLessons.length}
            />
          </div>
        </div>
      </div>

      {/* Floating button for mobile sidebar */}
      <button
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 z-30"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <BookOpen size={24} />
      </button>
    </div>
  );
}
