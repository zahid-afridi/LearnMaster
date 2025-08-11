import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Info, Lightbulb, AlertTriangle } from 'lucide-react';

interface LessonContentBlock {
  type: "h1" | "h2" | "h3" | "p" | "img" | "code" | "blockquote" | "ul" | "ol";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  language?: string;
  code?: string;
  items?: string[];
}

interface LessonContentProps {
  content: LessonContentBlock[];
}

export function LessonContent({ content }: LessonContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock = ({ code, language, index }: { code: string; language?: string; index: number }) => (
    <div className="relative group my-8">
      <div className="flex items-center justify-between bg-gray-900 text-gray-300 px-4 py-3 rounded-t-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium ml-2">{language || 'javascript'}</span>
        </div>
        <button
          onClick={() => copyToClipboard(code, index)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors text-xs"
        >
          {copiedIndex === index ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg border border-t-0 border-gray-700 overflow-x-auto">
        <code className="text-sm leading-relaxed font-mono">
          {code}
        </code>
      </pre>
    </div>
  );

  const InfoBox = ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'tip' | 'warning' }) => {
    const configs = {
      info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-900'
      },
      tip: {
        icon: Lightbulb,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        textColor: 'text-green-900'
      },
      warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-600',
        textColor: 'text-yellow-900'
      }
    };

    const config = configs[type];
    const IconComponent = config.icon;

    return (
      <div className={`${config.bgColor} ${config.borderColor} ${config.textColor} border-l-4 p-4 my-6 rounded-r-lg`}>
        <div className="flex items-start gap-3">
          <IconComponent className={`${config.iconColor} flex-shrink-0 mt-0.5`} size={20} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8">
        <article className="prose prose-lg max-w-none">
          {content.map((block, index) => {
            switch (block.type) {
              case "h1":
                return null; // Skip rendering h1

              case "h2":
                return (
                  <h2 
                    key={index} 
                    className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-12 mb-6 leading-tight flex items-center gap-3"
                  >
                    <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                    {block.text}
                  </h2>
                );

              case "h3":
                return (
                  <h3 
                    key={index} 
                    className="text-xl sm:text-2xl font-semibold text-gray-700 mt-10 mb-4 leading-tight"
                  >
                    {block.text}
                  </h3>
                );

              case "p":
                return (
                  <p 
                    key={index} 
                    className="text-lg text-gray-700 leading-relaxed mb-6 font-normal"
                  >
                    {block.text}
                  </p>
                );

              case "img":
                return (
                  <figure key={index} className="my-10">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <img 
                        src={block.src} 
                        alt={block.alt}
                        className="w-full rounded-lg shadow-md border border-gray-200" 
                      />
                      {block.caption && (
                        <figcaption className="text-center text-gray-600 mt-4 text-base italic">
                          {block.caption}
                        </figcaption>
                      )}
                    </div>
                  </figure>
                );

              case "code":
                return (
                  <CodeBlock 
                    key={index}
                    code={block.code || ''} 
                    language={block.language} 
                    index={index}
                  />
                );

              case "blockquote":
                return (
                  <InfoBox key={index} type="tip">
                    <p className="text-lg font-medium italic m-0">
                      {block.text}
                    </p>
                  </InfoBox>
                );

              case "ul":
                return (
                  <ul key={index} className="space-y-3 my-6">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );

              case "ol":
                return (
                  <ol key={index} className="space-y-3 my-6 counter-reset">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-lg text-gray-700">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          {i + 1}
                        </span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                );

              default:
                return null;
            }
          })}

          {/* Reading Progress Indicator - Removed */}

          {/* Table of Contents - Removed */}
        </article>

        {/* Reading time and metadata */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                8 min read
              </span>
              <span>•</span>
              <span>Updated 2 days ago</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Share:</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}