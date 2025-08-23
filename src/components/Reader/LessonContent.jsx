"use client";
import React, { useState } from "react";
import { Copy, Check, AlertTriangle } from "lucide-react";

export function LessonContent({ clickLesson, course }) {
  console.log('clickLesson', clickLesson)
  console.log('course', course)
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!clickLesson) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        Select a lesson to start learning 📘
      </div>
    );
  }

  // Code block with copy button
  const CodeBlock = ({ code, language = "javascript", index }) => (
    <div className="relative my-4 rounded-md shadow-md overflow-hidden border border-gray-700">
      {/* Header with three dots, language, and copy button */}
      <div className="flex items-center justify-between bg-gray-900 px-3 py-1.5 border-b border-gray-700">
        {/* Left: three dots */}
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        {/* Center: language */}
        <span className="text-xs font-medium text-gray-300">{language}</span>

        {/* Right: copy button */}
        <div>
          <button
            onClick={() => copyToClipboard(code, index)}
            className="flex items-center text-white cursor-pointer gap-1 px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-xs transition-colors"
          >
            {copiedIndex === index ? (
              <>
                <Check color="white" size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy color="white" size={14} /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      <pre className="bg-gray-900 text-gray-100 p-8 overflow-y-auto max-h-96 whitespace-pre-wrap break-words">
        <code className="text-sm leading-relaxed font-mono">{code}</code>
      </pre>
    </div>
  );

  // Warning box
  const InfoBox = ({ text }) => (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 p-3 my-4 rounded-md flex gap-2 shadow-sm">
      <AlertTriangle className="text-yellow-600 flex-shrink-0" size={18} />
      <p className="text-sm m-0">{text}</p>
    </div>
  );

  // Video block
  const VideoBlock = ({ src, alt }) => (
    <div className="my-6 flex justify-center">
      <video controls className="w-full max-w-2xl rounded-lg shadow-md border">
        <source src={src} type="video/mp4" />
        {alt || "Your browser does not support the video tag."}
      </video>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <article className="prose prose-lg max-w-none">
          {clickLesson.content?.map((block, index) => {
            switch (block.type) {
              case "heading":
                return block.level === 1 ? (
                  <h1
                    key={index}
                    className="text-3xl font-bold mt-8 mb-4 text-gray-900"
                  >
                    {block.text}
                  </h1>
                ) : block.level === 2 ? (
                  <h2
                    key={index}
                    className="text-2xl font-bold mt-6 mb-3 text-gray-800"
                  >
                    {block.text}
                  </h2>
                ) : block.level === 3 ? (
                  <h3
                    key={index}
                    className="text-xl font-semibold mt-4 mb-2 text-gray-700"
                  >
                    {block.text}
                  </h3>
                ) : null;

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-base text-gray-700 mb-4 leading-relaxed"
                  >
                    {block.text}
                  </p>
                );

              case "image":
                return (
                  <figure
                    key={index}
                    className="my-6 flex justify-center"
                  >
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="max-h-64 w-full max-w-2xl rounded-lg border shadow-sm object-contain"
                    />
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
                return <InfoBox key={index} text={block.text} />;

              case "video":
                return <VideoBlock key={index} src={block.src} alt={block.alt} />;

              case "quiz":
                return (
                  <div
                    key={index}
                    className="p-4 my-6 border rounded-md bg-blue-50 border-blue-200 shadow-sm"
                  >
                    <p className="font-semibold mb-2 text-gray-800">{block.question}</p>
                    <ul className="space-y-1">
                      {block.options.map((opt, i) => (
                        <li
                          key={i}
                          className="px-2 py-1 border rounded-md bg-white hover:bg-gray-50 cursor-pointer transition-colors text-sm"
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                );

              default:
                return null;
            }
          })}
        </article>

        {/* Display lesson resources if available */}
        {clickLesson.resources && clickLesson.resources.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Additional Resources</h3>
            <ul className="space-y-2">
              {clickLesson.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display lesson quizzes if available */}
        {clickLesson.quizzes && clickLesson.quizzes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Knowledge Check</h3>
            {clickLesson.quizzes.map((quiz, index) => (
              <div
                key={index}
                className="p-4 mb-4 border rounded-md bg-blue-50 border-blue-200 shadow-sm"
              >
                <p className="font-semibold mb-3 text-gray-800">{quiz.question}</p>
                <ul className="space-y-2">
                  {quiz.options.map((option, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 border rounded-md bg-white hover:bg-gray-50 cursor-pointer transition-colors text-sm"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}