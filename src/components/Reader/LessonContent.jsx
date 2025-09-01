


"use client";
import React, { useState } from "react";
import { Copy, Check, AlertTriangle, Play, Sparkles, BookOpen, Award, ExternalLink, Loader2, Menu, ChevronLeft, ChevronRight, } from "lucide-react";
import { useSelector } from "react-redux";


export function LessonContent({ clickLesson, loading }) {
  const { coursemeta, module, lesson } = useSelector((state) => state.course);



 
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleQuizAnswer = (quizIndex, answerIndex) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [quizIndex]: answerIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
              <BookOpen size={40} className="text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-spin">
              <Sparkles size={20} />
            </div>
            <div className="absolute -bottom-2 -left-2 text-purple-400 animate-ping">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Loading Your Course
            </h3>
            <p className="text-slate-600 text-lg">
              Preparing an amazing learning experience...
            </p>
            <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!clickLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen size={48} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Learn?
          </h3>
          <p className="text-gray-600 text-lg">Select a lesson from the sidebar to begin your journey</p>
        </div>
      </div>
    );
  }

  // Enhanced Code block with syntax highlighting feel
  const CodeBlock = ({ code, language = "javascript", index }) => (
    <div className="group relative my-8 rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300">
      {/* Enhanced header with gradient */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-4">
        {/* macOS style dots */}
        <div className="flex gap-2.5">
          <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></div>
          <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full shadow-sm"></div>
          <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></div>
        </div>

        {/* Language badge */}
        <div className="px-3 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-300/30">
          <span className="text-sm font-medium text-indigo-200">{language}</span>
        </div>

        {/* Copy button */}
        <button
          onClick={() => copyToClipboard(code, index)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
        >
          {copiedIndex === index ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-sm font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span className="text-sm font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with enhanced styling */}
      <div className="relative bg-gray-950">
        <pre className="p-8 overflow-x-auto max-h-96 text-gray-100 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <code className="text-sm leading-relaxed font-mono whitespace-pre">{code}</code>
        </pre>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
      </div>
    </div>
  );

  // Enhanced warning/info box
  const InfoBox = ({ text, type = "warning" }) => {
    const styles = {
      warning: {
        bg: "bg-gradient-to-r from-amber-50 to-orange-50",
        border: "border-amber-200",
        text: "text-amber-900",
        icon: "text-amber-600"
      },
      info: {
        bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
        border: "border-blue-200",
        text: "text-blue-900",
        icon: "text-blue-600"
      }
    };

    const style = styles[type] || styles.warning;

    return (
      <div className={`${style.bg} ${style.border} border-l-4 border-l-amber-500 rounded-r-xl shadow-lg p-6 my-8 backdrop-blur-sm`}>
        <div className="flex gap-4">
          <AlertTriangle className={`${style.icon} flex-shrink-0 mt-0.5`} size={20} />
          <div className="flex-1">
            <p className={`${style.text} text-base leading-relaxed m-0 font-medium`}>{text}</p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Video block
  // Enhanced Video block
  const VideoBlock = ({ src, alt }) => (
    <div className="my-8 flex justify-center">
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm border border-gray-200">
        <video
          controls
          className="w-full h-auto aspect-video object-contain rounded-2xl"
          poster="/api/placeholder/800/450"
        >
          <source src={src} type="video/mp4" />
          {alt || "Your browser does not support the video tag."}
        </video>
      </div>
    </div>
  );


  // Enhanced Quiz component
  const QuizBlock = ({ question, options, quizIndex }) => (
    <div className="my-8 p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl border border-indigo-200 shadow-xl">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Award size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Knowledge Check</h4>
          <p className="text-gray-800 text-lg font-medium leading-relaxed">{question}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {options.map((option, i) => (
          <label
            key={i}
            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedQuizAnswers[quizIndex] === i
              ? 'border-indigo-500 bg-indigo-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
          >
            <input
              type="radio"
              name={`quiz-${quizIndex}`}
              value={i}
              checked={selectedQuizAnswers[quizIndex] === i}
              onChange={() => handleQuizAnswer(quizIndex, i)}
              className="w-5 h-5 text-indigo-600 mr-4"
            />
            <span className="text-gray-800 font-medium flex-1">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero section with lesson title */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <div className="text-indigo-200 font-medium">
              {coursemeta?.title || 'Current Lesson'}
            </div>
          </div>
          <h1 className="text-4xl  md:text-5xl font-bold  bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            {lesson.title || 'Lesson Content'}
          </h1>
          {clickLesson.duration && (
            <div className="flex items-center gap-2 text-indigo-200">
              <Play size={16} />
              <span>{clickLesson.duration} minutes</span>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 ">
        <article className="space-y-8">
          {clickLesson.contents?.map((block, index) => {
            switch (block.type) {
              case "heading":
                return block.level === 1 ? (
                  <h1
                    key={index}
                    className="text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    {block.text}
                  </h1>
                ) : block.level === 2 ? (
                  <h2
                    key={index}
                    className="text-3xl font-bold mt-12 mb-6 text-gray-800 border-l-4 border-indigo-500 pl-6"
                  >
                    {block.text}
                  </h2>
                ) : block.level === 3 ? (
                  <h3
                    key={index}
                    className="text-2xl font-semibold mt-10 mb-4 text-gray-700"
                  >
                    {block.text}
                  </h3>
                ) : null;

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-lg text-gray-700 leading-relaxed mb-6 font-medium"
                  >
                    {block.text}
                  </p>
                );

              case "image":
                return (
                  <figure key={index} className="my-8 flex justify-center">
                    <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                  </figure>
                );


              case "code":
                return (
                  <CodeBlock
                    key={index}
                    code={block.code}
                    language={block.language}
                    index={index}
                  />
                );

              case "warning":
                return <InfoBox key={index} text={block.text} type="warning" />;

              case "video":
                return <VideoBlock key={index} src={block.src} alt={block.alt} />;

              case "quiz":
                return (
                  <QuizBlock
                    key={index}
                    question={block.question}
                    options={block.options}
                    quizIndex={index}
                  />
                );

              default:
                return null;
            }
          })}
        </article>

        {/* Enhanced Resources section */}
        {clickLesson.resources && clickLesson.resources.length > 0 && (
          <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl border border-gray-200 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <ExternalLink size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Additional Resources</h3>
            </div>

            <div className="grid gap-4">
              {clickLesson.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 group"
                >
                  <span className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors">
                    {resource.title}
                  </span>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced standalone quizzes */}
        {clickLesson.quizzes && clickLesson.quizzes.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-gray-600 text-lg">Put your learning to the test with these questions</p>
            </div>

            <div className="space-y-8">
              {clickLesson.quizzes.map((quiz, index) => (
                <QuizBlock
                  key={index}
                  question={quiz.question}
                  options={quiz.options}
                  quizIndex={`standalone-${index}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Lesson completion section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Lesson Complete!</h3>
            <p className="text-gray-600 mb-6">Great job! You've finished this lesson. Ready for the next one?</p>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}