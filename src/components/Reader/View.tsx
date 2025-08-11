'use client'
import { useState } from "react";
import { LessonSidebar } from "./LessonSidebar";
import { LessonHeader } from "./LessonHeader";
import { LessonContent } from "./LessonContent";
import { NotesSection } from "./NotesSection";
import { LessonNavigation } from "./LessonNavigation";
import { Menu } from "lucide-react";

const courseData = {
  title: "Advanced React Development",
  lessons: [
    { id: 1, title: "Introduction to React Hooks", duration: "15 min", status: 'completed' as const },
    { id: 2, title: "Understanding useEffect", duration: "20 min", status: 'completed' as const },
    { id: 3, title: "Custom Hooks Patterns", duration: "25 min", status: 'current' as const },
    { id: 4, title: "Performance Optimization", duration: "30 min", status: 'locked' as const },
    { id: 5, title: "Testing React Components", duration: "35 min", status: 'locked' as const },
    { id: 6, title: "State Management with Context", duration: "25 min", status: 'locked' as const },
    { id: 7, title: "Advanced Patterns", duration: "40 min", status: 'locked' as const },
  ]
};

const sampleCourse = {
  id: 1,
  title: "Advanced React Development",
  lessons: [
    {
      id: 1,
      title: "Introduction to React Hooks",
      duration: "15 min",
      status: "completed",
      content: [
        { type: "h1" as const, text: "Introduction to React Hooks" },
        { type: "p" as const, text: "React Hooks let you use state and other React features without writing a class. In this lesson you'll learn the basic hooks and when to use them." },
        { type: "img" as const, src: "/hooks-intro.png", alt: "React hooks illustration", caption: "React hooks lifecycle overview" },
        { type: "h2" as const, text: "Basic Hooks" },
        { type: "p" as const, text: "The most common hooks are useState, useEffect, and useRef." },
        {
          type: "code" as const,
          language: "javascript",
          code: `// simple counter with useState
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`
        },
        { type: "blockquote" as const, text: "Hooks let you reuse stateful logic without changing your component hierarchy." }
      ]
    },
    {
      id: 2,
      title: "Custom Hooks Patterns",
      duration: "25 min",
      status: "current",
      content: [
        { type: "h1" as const, text: "Custom Hooks Patterns" },
        { type: "p" as const, text: "Custom hooks help you extract reusable logic. We'll walk through examples, from localStorage hooks to compound hooks." },
        {
          type: "code" as const,
          language: "javascript",
          code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}`
        },
        { type: "h2" as const, text: "Compound Hooks" },
        { type: "p" as const, text: "Return objects when your hook has multiple helpers." },
        { type: "ul" as const, items: ["Return objects for many helpers", "Use useCallback to memoize functions", "Test hooks with react-hooks-testing-library"] }
      ]
    },
    // ... add more lessons here
  ]
};

export default function View() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [lessonProgress, setLessonProgress] = useState(45);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(2);
  const [notes, setNotes] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentLesson = courseData.lessons.find(lesson => lesson.id === currentLessonId);
  const currentLessonIndex = courseData.lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  const handleLessonClick = (lessonId: number) => {
    const lesson = courseData.lessons.find(l => l.id === lessonId);
    if (lesson && lesson.status !== 'locked') {
      setCurrentLessonId(lessonId);
      setLessonProgress(0);
      setMobileSidebarOpen(false); // Close sidebar on mobile
    }
  };

  const handleMarkComplete = () => {
    setLessonProgress(100);
    setCompletedLessons(prev => Math.max(prev, currentLessonId));
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = courseData.lessons[currentLessonIndex - 1];
      if (prevLesson.status !== 'locked') {
        setCurrentLessonId(prevLesson.id);
      }
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < courseData.lessons.length - 1) {
      const nextLesson = courseData.lessons[currentLessonIndex + 1];
      if (nextLesson.status !== 'locked') {
        setCurrentLessonId(nextLesson.id);
      }
    }
  };

  const handleSaveNotes = (newNotes: string) => {
    setNotes(newNotes);
    console.log('Notes saved:', newNotes);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 border-b">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="font-bold">{courseData.title}</h1>
        <div></div>
      </div>

      <div
        className={`fixed lg:static inset-y-0 left-0 bg-white z-50 transform 
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 border-r 
          flex xs:flex-row lg:flex-col`}
      >
        <LessonSidebar
          courseTitle={courseData.title}
          totalLessons={courseData.lessons.length}
          completedLessons={completedLessons}
          currentLessonId={currentLessonId}
          lessons={courseData.lessons}
          onLessonClick={handleLessonClick}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <LessonHeader
          title={currentLesson?.title || 'Lesson'}
          readingTime="8 min"
          progress={lessonProgress}
          isBookmarked={isBookmarked}
          onBookmark={() => setIsBookmarked(!isBookmarked)}
          onShare={() => console.log('Share clicked')}
          onComments={() => console.log('Comments clicked')}
        />

        <div className="flex-1 overflow-y-auto">
          {/* <LessonContent content={sampleContent} /> */}
          <LessonContent content={sampleCourse.lessons.find(l => l.id === currentLessonId)?.content || []} />

          <NotesSection
            lessonId={currentLessonId}
            initialNotes={notes}
            onSave={handleSaveNotes}
          />
        </div>

        <LessonNavigation
          hasPrevious={currentLessonIndex > 0}
          hasNext={currentLessonIndex < courseData.lessons.length - 1}
          isCompleted={lessonProgress === 100}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onMarkComplete={handleMarkComplete}
        />
      </div>
    </div>
  );
}