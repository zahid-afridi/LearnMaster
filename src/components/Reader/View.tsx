"use client";

import { useState, useEffect } from "react";
import { LessonSidebar } from "./LessonSidebar";
import { LessonHeader } from "./LessonHeader";
import { LessonContent } from "./LessonContent";
import { NotesSection } from "./NotesSection";
import { LessonNavigation } from "./LessonNavigation";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import lessonData from "../../../public/index.js";

// Import centralized types
import type { Lesson, Module, LessonData, ExtendedLesson } from "../../types/lesson";

// Safe cast to centralized type
const typedLessonData = lessonData as unknown as LessonData;

export default function View() {
  const [lessonProgress, setLessonProgress] = useState(45);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [clickLesson, setClickLesson] = useState<ExtendedLesson | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Create flat list of all lessons
  const getAllLessons = (): ExtendedLesson[] => {
    const allLessons: ExtendedLesson[] = [];
    typedLessonData.modules.forEach((module, moduleIndex) => {
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

  // Initialize first lesson
  useEffect(() => {
    if (allLessons.length > 0) {
      setClickLesson(allLessons[0]);
      setCurrentLessonIndex(0);
    }
  }, []);

  // Update current lesson index when lesson changes
  useEffect(() => {
    if (clickLesson?.lessonId) {
      const index = allLessons.findIndex(
        (lesson) => lesson.lessonId === clickLesson.lessonId
      );
      if (index !== -1) {
        setCurrentLessonIndex(index);
      }
    }
  }, [clickLesson, allLessons]);

  // Navigation handlers
  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      setClickLesson(prevLesson);
      setCurrentLessonIndex(currentLessonIndex - 1);
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

  // Handle lesson selection from sidebar
  const handleLessonClick = (lesson: Lesson) => {
    const extendedLesson = allLessons.find(
      (l) => l.lessonId === lesson.lessonId
    );
    if (extendedLesson) {
      setClickLesson(extendedLesson);
    }
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  // Wait until lesson selected
  if (!clickLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 border-b">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="font-bold">{typedLessonData.metadata.title}</h1>
        <div></div>
      </div>

      {/* Desktop Sidebar Toggle */}
      <button
        onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
        className="hidden lg:block fixed top-4 left-5 z-50 p-[3px] bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        style={{
          left: desktopSidebarOpen ? "250px" : "16px",
          transition: "left 0.3s ease-in-out",
          marginTop: "12px",
        }}
      >
        {desktopSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 bg-white z-40 transform
           ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
           lg:translate-x-0 transition-all duration-300 ease-in-out border-r
           flex xs:flex-row lg:flex-col
          ${desktopSidebarOpen ? "lg:w-64" : "lg:w-0 lg:overflow-hidden"}
          w-64`}
      >
        <LessonSidebar
          lessonData={typedLessonData}
          setClickLesson={handleLessonClick}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          !desktopSidebarOpen ? "lg:ml-0" : ""
        }`}
        onClick={() => {
          if (mobileSidebarOpen) setMobileSidebarOpen(false);
        }}
      >
        <LessonHeader
          HeaderData={clickLesson}
          progress={lessonProgress}
          isBookmarked={isBookmarked}
          onBookmark={() => setIsBookmarked(!isBookmarked)}
          onShare={() => console.log("Share clicked")}
          onComments={() => console.log("Comments clicked")}
        />

        <div className="flex-1 overflow-y-auto">
          <LessonContent clickLesson={clickLesson} />
          <NotesSection />
        </div>

        <LessonNavigation
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
  );
}
