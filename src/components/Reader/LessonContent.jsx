"use client";
import React, { useEffect, useState } from "react";
import {
  Copy,
  Check,
  Play,
  Sparkles,
  BookOpen,
  Award,
} from "lucide-react";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { useRouter } from "next/navigation";

export function LessonContent({ clickLesson, loading }) {
  const router=useRouter()
  const { coursemeta, lesson } = useSelector((state) => state.course);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});

  const handleRun = async (code, language) => {
    const encodedCode = encodeURIComponent(code);
    const url = `/online-compiler?code=${encodedCode}&lang=${language}`;
    window.open(url, "_blank"); // ✅ opens in new tab
  };

  // Reset quiz answers when lesson changes
  useEffect(() => {
    setSelectedQuizAnswers({});
  }, [clickLesson?.lesson_id]);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleQuizAnswer = (quizKey, answerIndex) => {
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [quizKey]: Number(answerIndex),
    }));
  };

  // ------------------ QUIZ BLOCK ------------------
  const QuizBlock = ({ question, options, quizKey, correctIndex }) => {
    const selected = selectedQuizAnswers[quizKey];
    const isAnswered = selected !== undefined && selected !== null;
    const isCorrect = isAnswered && Number(selected) === Number(correctIndex);

    return (
      <div className="my-6 p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl border border-indigo-200 shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Award size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Knowledge Check</h4>
            <p className="text-gray-700 text-base">{question}</p>
          </div>
        </div>

        <div className="grid gap-2">
          {options.map((option, i) => {
            const isSelected = selected === i;
            const showCorrectMark = isAnswered && Number(correctIndex) === i;

            return (
              <label
                key={i}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200
                  ${isSelected
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                  }
                `}
              >
                <input
                  type="radio"
                  name={`quiz-${quizKey}`}
                  value={i}
                  checked={isSelected}
                  onChange={() => handleQuizAnswer(quizKey, i)}
                  className="w-4 h-4 text-indigo-600 mr-3"
                />
                <span className="text-gray-800 text-sm">{option}</span>

                {isAnswered && showCorrectMark && (
                  <span className="ml-auto text-green-600 font-bold">✔</span>
                )}
              </label>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mt-4 font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect, try again."}
          </div>
        )}
      </div>
    );
  };

  // ------------------ CODE BLOCK ------------------
  const CodeBlock = ({ code: initialCode, language = "javascript", index }) => {
    const [editableCode, setEditableCode] = useState(initialCode);

    return (
      <div className="my-6 rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-800/90 px-4 py-2">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wide text-slate-300">
              {language}
            </span>
          </div>

          {/* Right side: copy + run */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRun(editableCode, language)}
              className="flex items-center cursor-pointer gap-1.5 px-2 py-1 rounded-md text-green-400 hover:text-white hover:bg-green-600 transition-colors"
            >
              <Play size={14} />
              <span className="text-xs">Run</span>
            </button>

            <button
              onClick={() => copyToClipboard(editableCode, index)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              {copiedIndex === index ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editable Code Area */}
        <textarea
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          spellCheck="false"
          className="w-full bg-slate-900 text-slate-100 text-sm px-5 py-4 font-mono leading-relaxed resize-y min-h-[160px] focus:outline-none"
        />
      </div>
    );
  };



  // ------------------ UI STATES ------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Loading Your Course
          </h3>
          <p className="text-slate-600 text-lg">Preparing an amazing learning experience...</p>
          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!clickLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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

  // ------------------ MAIN CONTENT ------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <div className="text-indigo-200 font-medium">
              {coursemeta?.title || "Current Lesson"}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            {lesson.title || "Lesson Content"}
          </h1>
          {clickLesson.duration && (
            <div className="flex items-center gap-2 text-indigo-200 mt-1">
              <Play size={16} />
              <span>{clickLesson.duration} minutes</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="space-y-6">
          {clickLesson.contents?.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-800 mt-6">
                    {block.text}
                  </h2>
                );
              case "paragraph":
                return (
                  <p key={index} className="text-base text-gray-700 leading-relaxed">
                    {block.text}
                  </p>
                );
              case "image":
                return (
                  <figure key={index} className="my-4 flex justify-center">
                    <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-md border border-gray-200">
                      <img
                        src={block.src}
                        alt={block.alt || ""}
                        className="w-full max-h-[420px] object-contain transition-transform duration-500 hover:scale-105"
                      />
                      {block.alt && (
                        <figcaption className="text-sm text-gray-500 text-center mt-2 p-2">
                          {block.alt}
                        </figcaption>
                      )}
                    </div>
                  </figure>
                );
              case "video":
                return <VideoPlayer key={index} src={block.src} alt={block.alt} />;
              case "code":
                return <CodeBlock key={index} code={block.code} language={block.language} index={index} />;
              case "quiz":
                return (
                  <QuizBlock
                    key={index}
                    question={block.question}
                    options={block.options}
                    quizKey={`content-${index}`}
                    correctIndex={Number(block.correctIndex)}
                  />
                );
              default:
                return null;
            }
          })}

          {clickLesson.quizzes && clickLesson.quizzes.length > 0 && (
            <section className="mt-8">
              <h3 className="text-xl font-bold mb-4">Test Your Knowledge</h3>
              <div className="space-y-4">
                {clickLesson.quizzes.map((quiz, qIndex) => (
                  <QuizBlock
                    key={quiz.quiz_id ?? qIndex}
                    question={quiz.question}
                    options={quiz.options}
                    quizKey={`standalone-${qIndex}`}
                    correctIndex={Number(quiz.correctIndex)}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
