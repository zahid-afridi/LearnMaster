const lessonData = {
  courseId: "react-101",
  slug: "react-tutorial",
  hasModules: true,
  metadata: {
    title: "React Tutorial",
    shortDescription: "Learn React step by step — from basics to advanced concepts with real-world examples.",
    level: "Beginner → Advanced",
    tags: ["react", "frontend", "hooks", "javascript"],
    estimatedTime: "14h",
    prerequisites: ["HTML & CSS", "JavaScript (ES6+)"],
    author: { id: "team-1", name: "LMS Academy" },
    version: "1.0.0",
    published: true,
    totalLessons:10,
    completedlesson:4,
    createdAt: "2025-08-20T20:00:00Z",
    updatedAt: "2025-08-20T20:00:00Z"

  },
  // basic React.Js
  modules: [
    {
      moduleId: "m1",
      order: 1,
      slug: "basics",
      title: "React Basics",
      description: "Fundamental building blocks of React.",
      lessons: [
        {
          lessonId: "l1-intro",
          order: 1,
          slug: "introduction-to-react",
          title: "Introduction to React",
          difficulty: "easy",
          estimatedTime: "12m",
          status: 'completed',
          content: [
            { type: "heading", level: 2, text: "What is React?" },
            { type: "paragraph", text: "React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components." },
            { type: "image", src: "https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg", alt: "React lifecycle" },
            { type: "heading", level: 2, text: "What is React?" },
            { type: "paragraph", text: "React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components. React is a JavaScript library for building user interfaces. It enables you to create reusable UI components." },
            { type: "video", src: "https://d3c33hcgiwev3.cloudfront.net/KK4OyulLR6KXEaaEzSJqvw.mediaconvert/full/KK4OyulLR6KXEaaEzSJqvw_390e0f2f922342159cae8be70704a2a1_AI4E23-C1-W1-L1_Intro_v4_MP4_540.mp4?Expires=1755993600&Signature=iqEJ6qQYuQW5iH44UDzvc9f9jbok4gsNJ4~sMf6uLpHhgVjuG~HZce4HpXz2kjRjWe84MTRC5M5iOlwp9jiP0MhjscEtnr16h5MDKys~se7QgU6dawntXQmRBMD~xQ5DzNgEK8z7AINDtF8vHJxUvTiYjxvayjROl-Gz~Ak-F5c_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A", alt: "React lifecycle" },
            { type: "code", language: "javascript", code: "function Welcome(){ return <h1>Hello, React!</h1> } export default Welcome;" },
            { type: "warning", text: "React only manages the view layer — for routing and state management, you need extra libraries." },
            { type: "quiz", id: "q-l1-1", question: "React is a:", options: ["Library", "Framework", "Database"], correctIndex: 0 }
          ],
          resources: [
            { type: "link", title: "React Official Docs", url: "https://react.dev" }
          ],
          meta: { published: true, updatedAt: "2025-08-20T20:00:00Z" }
        },
        {
          lessonId: "l2-jsx",
          order: 2,
          slug: "jsx-in-react",
          title: "JSX in React",
          difficulty: "easy",
          status: 'current',
          
          estimatedTime: "15m",
          content: [
            { type: "heading", level: 2, text: "What is JSX?" },
            { type: "paragraph", text: "JSX looks like HTML but compiles to JavaScript. It makes writing UI components easier." },
            { type: "code", language: "javascript", code: "const el = <h1 className='title'>Hello</h1>;" },
            { type: "note", text: "JSX must return a single root node." }
          ]
        },
       
     
        
        
      ]
    },
// React.Js hooks
    {
      moduleId: "m2",
      order: 2,
      slug: "hooks",
      title: "React Hooks",
      description: "Learn how to use hooks for state and lifecycle management.",
      lessons: [
        {
          lessonId: "l3-usestate",
          order: 1,
          slug: "useState",
          title: "useState Hook",
          difficulty: "medium",
          estimatedTime: "18m",
          content: [
            { type: "paragraph", text: "useState allows you to manage state in functional components." },
            { type: "code", language: "javascript", code: "const [count,setCount] = useState(0);" },
            { type: "quiz", id: "q-l3-1", question: "What does useState return?", options: ["value", "[value, setter]", "setter only"], correctIndex: 1 }
          ]
        },
        {
          lessonId: "l4-useeffect",
          order: 2,
          slug: "useEffect",
          title: "useEffect Hook",
          difficulty: "medium",
          estimatedTime: "20m",
          content: [
            { type: "paragraph", text: "useEffect lets you perform side effects such as fetching data or subscriptions." },
            { type: "code", language: "javascript", code: "useEffect(()=>{ fetchData(); },[])" },
            { type: "warning", text: "Empty dependency array runs the effect only once after mount." }
          ]
        }
      ]
    },
// Advanced React.Js
    {
      moduleId: "m3",
      order: 3,
      slug: "advanced",
      title: "Advanced React",
      description: "Complex concepts and performance patterns.",
      lessons: [
        {
          lessonId: "l5-context",
          order: 1,
          slug: "context-api",
          title: "React Context API",
          difficulty: "hard",
          estimatedTime: "25m",
          content: [
            { type: "paragraph", text: "Context helps avoid prop-drilling by providing global state." },
            { type: "code", language: "javascript", code: "const ThemeContext = createContext('light');" }
          ]
        },
        {
          lessonId: "l6-performance",
          order: 2,
          slug: "performance-optimization",
          title: "Performance Optimization",
          difficulty: "hard",
          estimatedTime: "30m",
          content: [
            { type: "paragraph", text: "React provides memoization, lazy loading, and virtualization for performance optimization." },
            { type: "code", language: "javascript", code: "const MemoComp = React.memo(MyComponent);" },
            { type: "note", text: "Always measure before optimizing!" }
          ]
        }
      ]
    },
    
  ]
};


export default lessonData