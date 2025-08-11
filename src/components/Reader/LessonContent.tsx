interface LessonContentProps {
  content: React.ReactNode;
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg prose-gray max-w-none">
          <style jsx>{`
            .prose h1 {
              font-size: 2rem;
              font-weight: 600;
              color: #111827;
              margin-bottom: 1.5rem;
              line-height: 1.3;
            }
            
            .prose h2 {
              font-size: 1.5rem;
              font-weight: 600;
              color: #111827;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              line-height: 1.4;
            }
            
            .prose h3 {
              font-size: 1.25rem;
              font-weight: 600;
              color: #111827;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              line-height: 1.4;
            }
            
            .prose p {
              font-size: 1.125rem;
              line-height: 1.75;
              color: #374151;
              margin-bottom: 1.5rem;
            }
            
            .prose ul, .prose ol {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            
            .prose li {
              font-size: 1.125rem;
              line-height: 1.75;
              color: #374151;
              margin-bottom: 0.5rem;
            }
            
            .prose code {
              background-color: #F3F4F6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.375rem;
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
              font-size: 0.9em;
              color: #2563EB;
            }
            
            .prose pre {
              background-color: #1F2937;
              color: #F9FAFB;
              padding: 1.5rem;
              border-radius: 0.75rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }
            
            .prose pre code {
              background-color: transparent;
              color: inherit;
              padding: 0;
            }
            
            .prose blockquote {
              border-left: 4px solid #2563EB;
              background-color: #EFF6FF;
              padding: 1rem 1.5rem;
              margin: 1.5rem 0;
              border-radius: 0.5rem;
            }
            
            .prose blockquote p {
              margin: 0;
              font-style: italic;
              color: #1E40AF;
            }
          `}</style>
          {content}
        </div>
      </div>
    </div>
  );
}