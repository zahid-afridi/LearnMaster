"use client";
import React, { useState } from "react";
import { Copy, Check, AlertTriangle } from "lucide-react";

// Content block types
type LessonContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "code"; language?: string; code: string }
  | { type: "warning"; text: string }
  | {
      type: "quiz";
      id: string;
      question: string;
      options: string[];
      correctIndex: number;
    };

interface LessonData {
  lessonId: string;
  order: number;
  slug: string;
  title: string;
  difficulty: string;
  estimatedTime: string;
  status: string;
  content: LessonContentBlock[];
  meta?: {
    published?: boolean;
    updatedAt?: string;
  };
}

interface LessonContentProps {
  clickLesson?: LessonData | null;
}

export function LessonContent({ clickLesson }: LessonContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
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

  // ✅ Code block with copy button
  const CodeBlock = ({
    code,
    language,
    index,
  }: {
    code: string;
    language?: string;
    index: number;
  }) => (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-gray-900 text-gray-300 px-4 py-2 rounded-t-lg border border-gray-700">
        <span className="text-sm font-medium">{language || "javascript"}</span>
        <button
          onClick={() => copyToClipboard(code, index)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs transition-colors"
        >
          {copiedIndex === index ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg border border-t-0 border-gray-700 overflow-x-auto">
        <code className="text-sm leading-relaxed font-mono">{code}</code>
      </pre>
    </div>
  );

  // ✅ Info warning box
  const InfoBox = ({ text }: { text: string }) => (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 p-4 my-6 rounded-lg flex gap-3 shadow-sm">
      <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
      <p className="text-base m-0">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <article className="prose prose-lg max-w-none">
          {clickLesson.content?.map((block, index) => {
            switch (block.type) {
              case "heading":
                return block.level === 2 ? (
                  <h2
                    key={index}
                    className="text-2xl font-bold mt-10 mb-4 text-gray-800"
                  >
                    {block.text}
                  </h2>
                ) : block.level === 3 ? (
                  <h3
                    key={index}
                    className="text-xl font-semibold mt-8 mb-3 text-gray-700"
                  >
                    {block.text}
                  </h3>
                ) : null;

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-lg text-gray-700 mb-6 leading-relaxed"
                  >
                    {block.text}
                  </p>
                );

              case "image":
                return (
                  <figure key={index} className="my-8 flex justify-center">
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="max-h-72 w-auto rounded-lg border shadow-md object-contain"
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

              case "quiz":
                return (
                  <div
                    key={index}
                    className="p-5 my-8 border rounded-lg bg-blue-50 border-blue-200 shadow-sm"
                  >
                    <p className="font-semibold mb-3 text-gray-800">
                      {block.question}
                    </p>
                    <ul className="space-y-2">
                      {block.options.map((opt, i) => (
                        <li
                          key={i}
                          className="px-3 py-2 border rounded-md bg-white hover:bg-gray-50 cursor-pointer transition-colors"
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
      </div>
    </div>
  );
}
