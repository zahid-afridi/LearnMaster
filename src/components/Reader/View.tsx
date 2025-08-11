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

const sampleContent = (
  <div>
    <h1>Custom Hooks Patterns</h1>
    
    <p>
      Custom hooks are one of React's most powerful features, allowing you to extract and reuse stateful logic 
      between components. In this lesson, we'll explore advanced patterns and best practices for creating 
      maintainable and efficient custom hooks.
    </p>

    <h2>What are Custom Hooks?</h2>
    
    <p>
      A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks. 
      Custom hooks let you extract component logic into reusable functions, promoting code reuse and separation of concerns.
    </p>

    <h3>Basic Example</h3>
    
    <p>Let's start with a simple custom hook for managing local storage:</p>

    <pre><code>{`function useLocalStorage(key, initialValue) {
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
}`}</code></pre>

    <blockquote>
      <p>
        Remember: Custom hooks should always start with "use" to follow React's naming conventions 
        and ensure that the Rules of Hooks are properly enforced.
      </p>
    </blockquote>

    <h2>Advanced Patterns</h2>

    <p>
      As your applications grow more complex, you'll encounter scenarios where simple custom hooks 
      aren't sufficient. Let's explore some advanced patterns that can help you build more robust solutions.
    </p>

    <h3>1. Compound Custom Hooks</h3>

    <p>
      Sometimes you need to combine multiple pieces of state and logic. Compound custom hooks 
      return objects with multiple values and functions:
    </p>

    <pre><code>{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return {
    count,
    increment,
    decrement,
    reset,
    isZero: count === 0,
    isPositive: count > 0,
    isNegative: count < 0
  };
}`}</code></pre>

    <h3>Key Takeaways</h3>

    <ul>
      <li>Custom hooks promote code reuse and maintainability</li>
      <li>Always start hook names with "use" to follow conventions</li>
      <li>Use <code>useCallback</code> to optimize function references</li>
      <li>Consider returning objects for complex hooks with multiple values</li>
      <li>Test your custom hooks thoroughly to ensure reliability</li>
    </ul>

    <p>
      In the next lesson, we'll dive deeper into performance optimization techniques and learn 
      how to use React's built-in profiling tools to identify bottlenecks in your applications.
    </p>
  </div>
);

export default function View() {
  const [currentLessonId, setCurrentLessonId] = useState(3);
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
          <LessonContent content={sampleContent} />
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
