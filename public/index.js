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




// full course 
///{
// "course": {
//   "slug": "react-fundamentals-complete",
//     "title": "Complete React Fundamentals",
//       "short_description": "Master React from basics to advanced concepts with hands-on projects",
//         "level": "beginner",
//           "tags": ["react", "javascript", "frontend", "web-development", "hooks", "jsx"],
//             "estimated_time": "45 hours",
//               "prerequisites": ["basic-javascript", "basic-html", "basic-css"],
//                 "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&q=80",
//                   "version": "1.0",
//                     "published": true,
//                       "category": "dev",
//                         "is_premium": "true"
// },
// "modules": [
//   {
//     "title": "Getting Started with React",
//     "slug": "getting-started-react",
//     "description": "Learn React basics, setup, and your first component",
//     "lessons": [
//       {
//         "title": "What is React?",
//         "slug": "what-is-react-intro",
//         "difficulty": "easy",
//         "status": "completed",
//         "estimated_time": "25 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "What is React?"
//           },
//           {
//             "type": "paragraph",
//             "text": "React is a popular JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta) in 2013, React has revolutionized how developers think about building interactive UIs."
//           },
//           {
//             "type": "heading",
//             "level": 2,
//             "text": "Why Use React?"
//           },
//           {
//             "type": "paragraph",
//             "text": "React offers several advantages: component-based architecture, virtual DOM for better performance, large ecosystem, strong community support, and backing by Meta."
//           },
//           {
//             "type": "image",
//             "src": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&q=80",
//             "alt": "React components visualization"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Official React Documentation",
//             "url": "https://react.dev/"
//           },
//           {
//             "type": "link",
//             "title": "React GitHub Repository",
//             "url": "https://github.com/facebook/react"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What company originally created React?",
//             "options": ["Google", "Facebook", "Microsoft", "Netflix"],
//             "correct_index": 1
//           },
//           {
//             "question": "What is React primarily used for?",
//             "options": ["Backend development", "Database management", "Building user interfaces", "Server configuration"],
//             "correct_index": 2
//           }
//         ]
//       },
//       {
//         "title": "Setting Up Development Environment",
//         "slug": "setup-dev-environment",
//         "difficulty": "easy",
//         "status": "current",
//         "estimated_time": "35 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Setting Up Your React Development Environment"
//           },
//           {
//             "type": "paragraph",
//             "text": "Before we start building React applications, we need to set up our development environment. We'll use Create React App, which provides a modern build setup with no configuration."
//           },
//           {
//             "type": "heading",
//             "level": 2,
//             "text": "Prerequisites"
//           },
//           {
//             "type": "paragraph",
//             "text": "Make sure you have Node.js installed on your computer. You can download it from nodejs.org. We recommend using the LTS (Long Term Support) version."
//           },
//           {
//             "type": "heading",
//             "level": 2,
//             "text": "Creating Your First React App"
//           },
//           {
//             "type": "code",
//             "code": "npx create-react-app my-react-app\ncd my-react-app\nnpm start",
//             "language": "bash"
//           },
//           {
//             "type": "paragraph",
//             "text": "This command creates a new React application with all the necessary dependencies and a basic project structure."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Create React App Documentation",
//             "url": "https://create-react-app.dev/"
//           },
//           {
//             "type": "link",
//             "title": "Node.js Download",
//             "url": "https://nodejs.org/"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "Which command creates a new React application?",
//             "options": ["npm create react-app", "npx create-react-app", "react new app", "npm init react"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Your First React Component",
//         "slug": "first-component-basics",
//         "difficulty": "easy",
//         "status": "locked",
//         "estimated_time": "30 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Your First React Component"
//           },
//           {
//             "type": "paragraph",
//             "text": "Components are the building blocks of React applications. Let's create your first component and understand how it works."
//           },
//           {
//             "type": "heading",
//             "level": 2,
//             "text": "Function Component"
//           },
//           {
//             "type": "code",
//             "code": "function Welcome() {\n  return <h1>Hello, World!</h1>;\n}\n\nexport default Welcome;",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "This is a simple function component that returns JSX. JSX looks like HTML but is actually JavaScript."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Components and Props",
//             "url": "https://react.dev/learn/your-first-component"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What does JSX stand for?",
//             "options": ["JavaScript XML", "Java Syntax Extension", "Just Simple XML", "JavaScript Extension"],
//             "correct_index": 0
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "JSX and Components",
//     "slug": "jsx-components",
//     "description": "Deep dive into JSX syntax and component creation",
//     "lessons": [
//       {
//         "title": "Understanding JSX",
//         "slug": "understanding-jsx-syntax",
//         "difficulty": "easy",
//         "status": "locked",
//         "estimated_time": "40 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Understanding JSX"
//           },
//           {
//             "type": "paragraph",
//             "text": "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and easier to write."
//           },
//           {
//             "type": "heading",
//             "level": 2,
//             "text": "JSX Rules"
//           },
//           {
//             "type": "paragraph",
//             "text": "There are several important rules to follow when writing JSX:"
//           },
//           {
//             "type": "code",
//             "code": "// Must have a single parent element\nfunction MyComponent() {\n  return (\n    <div>\n      <h1>Title</h1>\n      <p>Description</p>\n    </div>\n  );\n}\n\n// Or use React Fragment\nfunction MyComponent() {\n  return (\n    <>\n      <h1>Title</h1>\n      <p>Description</p>\n    </>\n  );\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "JSX attributes use camelCase naming convention. For example, 'class' becomes 'className' and 'onclick' becomes 'onClick'."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "JSX Documentation",
//             "url": "https://react.dev/learn/writing-markup-with-jsx"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What should you use instead of 'class' in JSX?",
//             "options": ["class", "className", "cssClass", "style"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Component Props",
//         "slug": "component-props-data",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "45 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Component Props"
//           },
//           {
//             "type": "paragraph",
//             "text": "Props (short for properties) are how you pass data from parent components to child components in React."
//           },
//           {
//             "type": "code",
//             "code": "// Parent component\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" />\n      <Welcome name=\"Bob\" />\n    </div>\n  );\n}\n\n// Child component\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// Using destructuring\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "Props are read-only. A component should never modify its props directly."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Props Documentation",
//             "url": "https://react.dev/learn/passing-props-to-a-component"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "Are props mutable in React?",
//             "options": ["Yes, always", "No, they are read-only", "Sometimes", "Only in class components"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Conditional Rendering",
//         "slug": "conditional-render-patterns",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "35 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Conditional Rendering"
//           },
//           {
//             "type": "paragraph",
//             "text": "In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application."
//           },
//           {
//             "type": "code",
//             "code": "function Greeting({ isLoggedIn }) {\n  if (isLoggedIn) {\n    return <h1>Welcome back!</h1>;\n  }\n  return <h1>Please sign up.</h1>;\n}\n\n// Using ternary operator\nfunction Greeting({ isLoggedIn }) {\n  return (\n    <h1>\n      {isLoggedIn ? 'Welcome back!' : 'Please sign up.'}\n    </h1>\n  );\n}\n\n// Using logical AND operator\nfunction Mailbox({ unreadMessages }) {\n  return (\n    <div>\n      <h1>Hello!</h1>\n      {unreadMessages.length > 0 &&\n        <h2>\n          You have {unreadMessages.length} unread messages.\n        </h2>\n      }\n    </div>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Conditional Rendering",
//             "url": "https://react.dev/learn/conditional-rendering"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "Which operator can be used for conditional rendering in JSX?",
//             "options": ["&&", "?:", "if-else", "All of the above"],
//             "correct_index": 3
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "State and Event Handling",
//     "slug": "state-event-handling",
//     "description": "Learn about component state and handling user interactions",
//     "lessons": [
//       {
//         "title": "Introduction to State",
//         "slug": "intro-state-management",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "50 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Introduction to State"
//           },
//           {
//             "type": "paragraph",
//             "text": "State allows React components to change their output over time in response to user actions, network responses, and anything else."
//           },
//           {
//             "type": "code",
//             "code": "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "useState is a Hook that lets you add React state to function components. It returns an array with two elements: the current state value and a function to update it."
//           },
//           {
//             "type": "warning",
//             "text": "Never modify state directly. Always use the setter function returned by useState."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "useState Hook",
//             "url": "https://react.dev/reference/react/useState"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What does useState return?",
//             "options": ["Just the state value", "Just the setter function", "An array with state and setter", "An object"],
//             "correct_index": 2
//           }
//         ]
//       },
//       {
//         "title": "Handling Events",
//         "slug": "event-handling-react",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "40 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Handling Events"
//           },
//           {
//             "type": "paragraph",
//             "text": "React events are named using camelCase, and you pass a function as the event handler rather than a string."
//           },
//           {
//             "type": "code",
//             "code": "function Button() {\n  function handleClick(e) {\n    e.preventDefault();\n    console.log('The link was clicked.');\n  }\n\n  return (\n    <a href=\"#\" onClick={handleClick}>\n      Click me\n    </a>\n  );\n}\n\n// Passing arguments to event handlers\nfunction Button() {\n  return (\n    <button onClick={(e) => handleClick(e, 'some data')}>\n      Click me\n    </button>\n  );\n}\n\nfunction handleClick(e, data) {\n  console.log('Button clicked with data:', data);\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Handling Events",
//             "url": "https://react.dev/learn/responding-to-events"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "How are React events named?",
//             "options": ["lowercase", "UPPERCASE", "camelCase", "snake_case"],
//             "correct_index": 2
//           }
//         ]
//       },
//       {
//         "title": "Forms in React",
//         "slug": "react-forms-input",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "55 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Forms in React"
//           },
//           {
//             "type": "paragraph",
//             "text": "HTML form elements work differently from other DOM elements in React because form elements naturally keep some internal state."
//           },
//           {
//             "type": "code",
//             "code": "import { useState } from 'react';\n\nfunction ContactForm() {\n  const [formData, setFormData] = useState({\n    name: '',\n    email: '',\n    message: ''\n  });\n\n  const handleChange = (e) => {\n    setFormData({\n      ...formData,\n      [e.target.name]: e.target.value\n    });\n  };\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log('Form submitted:', formData);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type=\"text\"\n        name=\"name\"\n        value={formData.name}\n        onChange={handleChange}\n        placeholder=\"Your Name\"\n      />\n      <input\n        type=\"email\"\n        name=\"email\"\n        value={formData.email}\n        onChange={handleChange}\n        placeholder=\"Your Email\"\n      />\n      <textarea\n        name=\"message\"\n        value={formData.message}\n        onChange={handleChange}\n        placeholder=\"Your Message\"\n      />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Forms in React",
//             "url": "https://react.dev/reference/react-dom/components/form"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What is a controlled component in React?",
//             "options": ["A component without state", "A component whose value is controlled by React state", "A component that controls other components", "A component with default values"],
//             "correct_index": 1
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "React Hooks",
//     "slug": "react-hooks",
//     "description": "Master React Hooks for modern functional components",
//     "lessons": [
//       {
//         "title": "useEffect Hook",
//         "slug": "useeffect-hook-guide",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "60 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "useEffect Hook"
//           },
//           {
//             "type": "paragraph",
//             "text": "The useEffect Hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React classes."
//           },
//           {
//             "type": "code",
//             "code": "import { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  // Similar to componentDidMount and componentDidUpdate:\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n\n// Effect with cleanup\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(seconds => seconds + 1);\n    }, 1000);\n\n    return () => clearInterval(interval);\n  }, []);\n\n  return <div>Seconds: {seconds}</div>;\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "The dependency array in useEffect determines when the effect should run. An empty array means it runs once, no array means it runs every render."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "useEffect Documentation",
//             "url": "https://react.dev/reference/react/useEffect"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "When does useEffect run if you pass an empty dependency array?",
//             "options": ["Every render", "Never", "Only once after mount", "Only on unmount"],
//             "correct_index": 2
//           }
//         ]
//       },
//       {
//         "title": "Custom Hooks",
//         "slug": "custom-hooks-patterns",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "45 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Custom Hooks"
//           },
//           {
//             "type": "paragraph",
//             "text": "Custom Hooks are JavaScript functions whose names start with 'use' and that may call other Hooks. They let you extract component logic into reusable functions."
//           },
//           {
//             "type": "code",
//             "code": "import { useState, useEffect } from 'react';\n\n// Custom hook for fetching data\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        setLoading(true);\n        const response = await fetch(url);\n        const result = await response.json();\n        setData(result);\n      } catch (err) {\n        setError(err);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchData();\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Using the custom hook\nfunction UserProfile({ userId }) {\n  const { data, loading, error } = useFetch(`/api/users/${userId}`);\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n\n  return (\n    <div>\n      <h1>{data.name}</h1>\n      <p>{data.email}</p>\n    </div>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Building Your Own Hooks",
//             "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What must custom hook names start with?",
//             "options": ["hook", "use", "custom", "my"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "useContext Hook",
//         "slug": "usecontext-state-management",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "50 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "useContext Hook"
//           },
//           {
//             "type": "paragraph",
//             "text": "useContext lets you consume context values without wrapping your component in a Context.Consumer."
//           },
//           {
//             "type": "code",
//             "code": "import { createContext, useContext, useState } from 'react';\n\n// Create context\nconst ThemeContext = createContext();\n\n// Theme provider component\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n\n  const toggleTheme = () => {\n    setTheme(theme === 'light' ? 'dark' : 'light');\n  };\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// Component using context\nfunction ThemedButton() {\n  const { theme, toggleTheme } = useContext(ThemeContext);\n\n  return (\n    <button\n      onClick={toggleTheme}\n      style={{\n        backgroundColor: theme === 'light' ? '#fff' : '#333',\n        color: theme === 'light' ? '#333' : '#fff'\n      }}\n    >\n      Toggle Theme\n    </button>\n  );\n}\n\n// App component\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemedButton />\n    </ThemeProvider>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "useContext Documentation",
//             "url": "https://react.dev/reference/react/useContext"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What does useContext replace?",
//             "options": ["useState", "useEffect", "Context.Consumer", "Context.Provider"],
//             "correct_index": 2
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Advanced React Concepts",
//     "slug": "advanced-react-concepts",
//     "description": "Explore advanced patterns and optimization techniques",
//     "lessons": [
//       {
//         "title": "React Router",
//         "slug": "react-router-navigation",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "70 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "React Router"
//           },
//           {
//             "type": "paragraph",
//             "text": "React Router is a standard library for routing in React. It enables navigation among views of various components in a React Application."
//           },
//           {
//             "type": "code",
//             "code": "import {\n  BrowserRouter as Router,\n  Routes,\n  Route,\n  Link,\n  useNavigate\n} from 'react-router-dom';\n\nfunction App() {\n  return (\n    <Router>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n        <Link to=\"/contact\">Contact</Link>\n      </nav>\n\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n        <Route path=\"/contact\" element={<Contact />} />\n        <Route path=\"/users/:id\" element={<UserProfile />} />\n      </Routes>\n    </Router>\n  );\n}\n\nfunction Home() {\n  const navigate = useNavigate();\n\n  return (\n    <div>\n      <h1>Home Page</h1>\n      <button onClick={() => navigate('/about')}>\n        Go to About\n      </button>\n    </div>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "React Router Documentation",
//             "url": "https://reactrouter.com/"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "Which component is used to define routes in React Router v6?",
//             "options": ["Switch", "Routes", "Route", "Router"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Performance Optimization",
//         "slug": "react-performance-optimization",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "65 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Performance Optimization"
//           },
//           {
//             "type": "paragraph",
//             "text": "React provides several ways to optimize your application's performance, including React.memo, useMemo, and useCallback."
//           },
//           {
//             "type": "code",
//             "code": "import { memo, useMemo, useCallback, useState } from 'react';\n\n// Memoized component\nconst ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {\n  console.log('ExpensiveComponent rendered');\n  return (\n    <div onClick={onClick}>\n      {data.map(item => <div key={item.id}>{item.name}</div>)}\n    </div>\n  );\n});\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const [items, setItems] = useState([]);\n\n  // Memoized calculation\n  const expensiveValue = useMemo(() => {\n    console.log('Calculating expensive value');\n    return items.reduce((sum, item) => sum + item.value, 0);\n  }, [items]);\n\n  // Memoized callback\n  const handleClick = useCallback(() => {\n    console.log('Item clicked');\n  }, []);\n\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>\n        Count: {count}\n      </button>\n      <p>Expensive value: {expensiveValue}</p>\n      <ExpensiveComponent data={items} onClick={handleClick} />\n    </div>\n  );\n}",
//             "language": "javascript"
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "Optimizing Performance",
//             "url": "https://react.dev/learn/render-and-commit#optimizing-performance"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What does React.memo do?",
//             "options": ["Memoizes state", "Prevents unnecessary re-renders", "Caches API calls", "Optimizes event handlers"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Testing React Components",
//         "slug": "testing-react-components",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "55 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Testing React Components"
//           },
//           {
//             "type": "paragraph",
//             "text": "Testing is an important part of React development. We'll learn how to test React components using Jest and React Testing Library."
//           },
//           {
//             "type": "code",
//             "code": "import { render, screen, fireEvent } from '@testing-library/react';\nimport Counter from './Counter';\n\ntest('renders counter with initial value', () => {\n  render(<Counter />);\n  const countElement = screen.getByText(/you clicked 0 times/i);\n  expect(countElement).toBeInTheDocument();\n});\n\ntest('increments counter when button is clicked', () => {\n  render(<Counter />);\n  const buttonElement = screen.getByRole('button', { name: /click me/i });\n  const countElement = screen.getByText(/you clicked 0 times/i);\n  \n  fireEvent.click(buttonElement);\n  \n  expect(screen.getByText(/you clicked 1 times/i)).toBeInTheDocument();\n});\n\n// Testing with props\ntest('displays welcome message with name', () => {\n  render(<Welcome name=\"Alice\" />);\n  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();\n});",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "React Testing Library encourages testing behavior rather than implementation details, making your tests more maintainable."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "React Testing Library",
//             "url": "https://testing-library.com/docs/react-testing-library/intro/"
//           },
//           {
//             "type": "link",
//             "title": "Jest Documentation",
//             "url": "https://jestjs.io/docs/getting-started"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What does React Testing Library encourage testing?",
//             "options": ["Implementation details", "Component state", "User behavior", "Internal methods"],
//             "correct_index": 2
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Building Real Projects",
//     "slug": "building-real-projects",
//     "description": "Apply your React knowledge by building complete applications",
//     "lessons": [
//       {
//         "title": "Todo List Application",
//         "slug": "todo-list-project",
//         "difficulty": "medium",
//         "status": "locked",
//         "estimated_time": "90 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Building a Todo List Application"
//           },
//           {
//             "type": "paragraph",
//             "text": "Let's build a complete todo list application that demonstrates many React concepts including state management, event handling, and conditional rendering."
//           },
//           {
//             "type": "code",
//             "code": "import { useState } from 'react';\n\nfunction TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n\n  const addTodo = () => {\n    if (inputValue.trim()) {\n      setTodos([...todos, {\n        id: Date.now(),\n        text: inputValue,\n        completed: false\n      }]);\n      setInputValue('');\n    }\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div className=\"todo-app\">\n      <h1>My Todo List</h1>\n      <div className=\"todo-input\">\n        <input\n          type=\"text\"\n          value={inputValue}\n          onChange={(e) => setInputValue(e.target.value)}\n          placeholder=\"Add a new todo...\"\n          onKeyPress={(e) => e.key === 'Enter' && addTodo()}\n        />\n        <button onClick={addTodo}>Add</button>\n      </div>\n      <ul className=\"todo-list\">\n        {todos.map(todo => (\n          <li key={todo.id} className={todo.completed ? 'completed' : ''}>\n            <input\n              type=\"checkbox\"\n              checked={todo.completed}\n              onChange={() => toggleTodo(todo.id)}\n            />\n            <span>{todo.text}</span>\n            <button onClick={() => deleteTodo(todo.id)}>Delete</button>\n          </li>\n        ))}\n      </ul>\n      <div className=\"todo-stats\">\n        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>\n      </div>\n    </div>\n  );\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "This todo application demonstrates state management, array operations, conditional rendering, and event handling - core React concepts."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "React State Updates",
//             "url": "https://react.dev/learn/updating-objects-in-state"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "Which method is used to filter out a todo item?",
//             "options": ["map", "filter", "reduce", "forEach"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "Weather App with API",
//         "slug": "weather-app-api-project",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "120 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "Weather App with API Integration"
//           },
//           {
//             "type": "paragraph",
//             "text": "Build a weather application that fetches data from an external API and displays weather information with a beautiful interface."
//           },
//           {
//             "type": "code",
//             "code": "import { useState, useEffect } from 'react';\n\nfunction WeatherApp() {\n  const [weather, setWeather] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [city, setCity] = useState('London');\n  const [error, setError] = useState(null);\n\n  const API_KEY = 'your-api-key';\n\n  const fetchWeather = async (cityName) => {\n    try {\n      setLoading(true);\n      setError(null);\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`\n      );\n      \n      if (!response.ok) {\n        throw new Error('City not found');\n      }\n      \n      const data = await response.json();\n      setWeather(data);\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  useEffect(() => {\n    fetchWeather(city);\n  }, []);\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    fetchWeather(city);\n  };\n\n  if (loading) return <div className=\"loading\">Loading...</div>;\n  if (error) return <div className=\"error\">Error: {error}</div>;\n\n  return (\n    <div className=\"weather-app\">\n      <form onSubmit={handleSubmit}>\n        <input\n          type=\"text\"\n          value={city}\n          onChange={(e) => setCity(e.target.value)}\n          placeholder=\"Enter city name\"\n        />\n        <button type=\"submit\">Get Weather</button>\n      </form>\n      \n      {weather && (\n        <div className=\"weather-info\">\n          <h2>{weather.name}, {weather.sys.country}</h2>\n          <div className=\"weather-main\">\n            <img\n              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}\n              alt={weather.weather[0].description}\n            />\n            <div>\n              <h3>{Math.round(weather.main.temp)}°C</h3>\n              <p>{weather.weather[0].description}</p>\n            </div>\n          </div>\n          <div className=\"weather-details\">\n            <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>\n            <p>Humidity: {weather.main.humidity}%</p>\n            <p>Wind: {weather.wind.speed} m/s</p>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "This weather app demonstrates API integration, error handling, loading states, and conditional rendering based on data availability."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "OpenWeatherMap API",
//             "url": "https://openweathermap.org/api"
//           },
//           {
//             "type": "link",
//             "title": "Fetch API Guide",
//             "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What should you do when an API request fails?",
//             "options": ["Ignore the error", "Show error message to user", "Crash the app", "Retry infinitely"],
//             "correct_index": 1
//           }
//         ]
//       },
//       {
//         "title": "E-commerce Product Catalog",
//         "slug": "ecommerce-catalog-project",
//         "difficulty": "hard",
//         "status": "locked",
//         "estimated_time": "150 minutes",
//         "published": true,
//         "contents": [
//           {
//             "type": "heading",
//             "level": 1,
//             "text": "E-commerce Product Catalog"
//           },
//           {
//             "type": "paragraph",
//             "text": "Create a product catalog with search, filtering, and cart functionality. This project combines multiple React concepts in a real-world scenario."
//           },
//           {
//             "type": "code",
//             "code": "import { useState, useEffect, useContext, createContext } from 'react';\n\n// Cart Context\nconst CartContext = createContext();\n\nfunction CartProvider({ children }) {\n  const [cart, setCart] = useState([]);\n\n  const addToCart = (product) => {\n    setCart(prev => {\n      const existing = prev.find(item => item.id === product.id);\n      if (existing) {\n        return prev.map(item =>\n          item.id === product.id\n            ? { ...item, quantity: item.quantity + 1 }\n            : item\n        );\n      }\n      return [...prev, { ...product, quantity: 1 }];\n    });\n  };\n\n  const removeFromCart = (id) => {\n    setCart(prev => prev.filter(item => item.id !== id));\n  };\n\n  const getTotalPrice = () => {\n    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);\n  };\n\n  return (\n    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>\n      {children}\n    </CartContext.Provider>\n  );\n}\n\nfunction ProductCard({ product }) {\n  const { addToCart } = useContext(CartContext);\n\n  return (\n    <div className=\"product-card\">\n      <img src={product.image} alt={product.name} />\n      <h3>{product.name}</h3>\n      <p className=\"price\">${product.price}</p>\n      <p className=\"description\">{product.description}</p>\n      <button onClick={() => addToCart(product)}>\n        Add to Cart\n      </button>\n    </div>\n  );\n}\n\nfunction ProductCatalog() {\n  const [products, setProducts] = useState([]);\n  const [filteredProducts, setFilteredProducts] = useState([]);\n  const [searchTerm, setSearchTerm] = useState('');\n  const [categoryFilter, setCategoryFilter] = useState('all');\n  const [sortBy, setSortBy] = useState('name');\n\n  useEffect(() => {\n    // Mock product data\n    const mockProducts = [\n      { id: 1, name: 'Laptop', price: 999, category: 'electronics', image: '/laptop.jpg', description: 'High-performance laptop' },\n      { id: 2, name: 'Phone', price: 599, category: 'electronics', image: '/phone.jpg', description: 'Latest smartphone' },\n      { id: 3, name: 'Book', price: 19, category: 'books', image: '/book.jpg', description: 'Interesting novel' },\n      // More products...\n    ];\n    setProducts(mockProducts);\n    setFilteredProducts(mockProducts);\n  }, []);\n\n  useEffect(() => {\n    let filtered = products.filter(product =>\n      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&\n      (categoryFilter === 'all' || product.category === categoryFilter)\n    );\n\n    // Sort products\n    filtered.sort((a, b) => {\n      if (sortBy === 'price') return a.price - b.price;\n      if (sortBy === 'name') return a.name.localeCompare(b.name);\n      return 0;\n    });\n\n    setFilteredProducts(filtered);\n  }, [products, searchTerm, categoryFilter, sortBy]);\n\n  return (\n    <div className=\"product-catalog\">\n      <div className=\"filters\">\n        <input\n          type=\"text\"\n          placeholder=\"Search products...\"\n          value={searchTerm}\n          onChange={(e) => setSearchTerm(e.target.value)}\n        />\n        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>\n          <option value=\"all\">All Categories</option>\n          <option value=\"electronics\">Electronics</option>\n          <option value=\"books\">Books</option>\n        </select>\n        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>\n          <option value=\"name\">Sort by Name</option>\n          <option value=\"price\">Sort by Price</option>\n        </select>\n      </div>\n      \n      <div className=\"products-grid\">\n        {filteredProducts.map(product => (\n          <ProductCard key={product.id} product={product} />\n        ))}\n      </div>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <CartProvider>\n      <div className=\"app\">\n        <header>\n          <h1>My Store</h1>\n          <Cart />\n        </header>\n        <ProductCatalog />\n      </div>\n    </CartProvider>\n  );\n}",
//             "language": "javascript"
//           },
//           {
//             "type": "paragraph",
//             "text": "This e-commerce catalog demonstrates advanced React patterns including Context API, complex state management, filtering, sorting, and component composition."
//           }
//         ],
//         "resources": [
//           {
//             "type": "link",
//             "title": "React Context API",
//             "url": "https://react.dev/learn/passing-data-deeply-with-context"
//           },
//           {
//             "type": "link",
//             "title": "Complex State Management",
//             "url": "https://react.dev/learn/managing-state"
//           }
//         ],
//         "quizzes": [
//           {
//             "question": "What is the Context API primarily used for?",
//             "options": ["API calls", "Sharing state across components", "Styling components", "Component routing"],
//             "correct_index": 1
//           }
//         ]
//       }
//     ]
//   }
// ]
// }
///