const lessondata = [
  {
    id: 1,
    title: "Introduction to React.js",
    lesson: [
      "React.js (commonly called React) is a JavaScript library used for building user interfaces (UI), especially for single-page applications (SPAs).",
      "It was developed by Facebook (Meta) in 2013 and is now maintained by Meta and a large community of developers.",
      "React is component-based, declarative, and makes building dynamic UIs easier."
    ]
  },

  {
    id: 2,
    title: "Understanding JSX",
    lesson: [
      "JSX stands for JavaScript XML. It allows you to write HTML-like syntax inside JavaScript.",
      "JSX makes it easier to visualize the structure of the UI inside the code.",
      "Example: const element = <h1>Hello World</h1>;"
    ]
  },

  {
    id: 3,
    title: "Components in React",
    lesson: [
      "Components are the building blocks of React applications.",
      "There are two types of components: Functional Components and Class Components.",
      "Components help in reusing UI and logic."
    ]
  },

  {
    id: 4,
    title: "useState Hook",
    lesson: [
      "useState is a React Hook that lets you add state to functional components.",
      "Before Hooks, only class components could have state.",
      "Example: const [count, setCount] = useState(0);"
    ]
  },

  {
    id: 5,
    title: "useEffect Hook",
    lesson: [
      "useEffect is a React Hook that lets you perform side effects in functional components.",
      "It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.",
      "Common uses: Fetching data, updating the DOM, setting up subscriptions."
    ]
  },

  {
    id: 6,
    title: "Props in React",
    lesson: [
      "Props (short for properties) are used to pass data from parent to child components.",
      "Props are read-only; a child cannot modify props directly.",
      "Example: <Greeting name='Shakir' />"
    ]
  },

  {
    id: 7,
    title: "Conditional Rendering",
    lesson: [
      "React allows conditional rendering using JavaScript operators like if, &&, and ternary.",
      "Example: {isLoggedIn ? <Dashboard /> : <Login />}"
    ]
  },

  {
    id: 8,
    title: "Lists and Keys",
    lesson: [
      "Lists in React are rendered using the map() function.",
      "Each list item should have a unique 'key' prop for better performance.",
      "Example: items.map(item => <li key={item.id}>{item.name}</li>)"
    ]
  },

  {
    id: 9,
    title: "Forms in React",
    lesson: [
      "Forms in React are controlled using state.",
      "You handle form input values using useState.",
      "Example: <input type='text' value={name} onChange={(e) => setName(e.target.value)} />"
    ]
  },

  {
    id: 10,
    title: "Custom Hooks",
    lesson: [
      "A Custom Hook is a JavaScript function that starts with the word 'use'.",
      "It allows you to extract and reuse logic across multiple components.",
      "Example: useFetch(), useAuth()"
    ]
  },

  {
    id: 11,
    title: "Performance Optimization",
    lesson: [
      "In React.js, performance optimization means making your app faster and smoother.",
      "Techniques include: React.memo, useCallback, useMemo, and code splitting.",
      "Avoid unnecessary re-renders by using keys properly and optimizing state."
    ]
  },

  {
    id: 12,
    title: "React Router",
    lesson: [
      "React Router is used for navigation between different pages in a React app.",
      "It enables Single Page Application (SPA) behavior without reloading the page.",
      "Example: <Route path='/about' element={<About />} />"
    ]
  },

  {
    id: 13,
    title: "State Management",
    lesson: [
      "State management is crucial for handling data across components.",
      "For small apps: useState, useReducer.",
      "For larger apps: Context API, Redux, Zustand, or Recoil."
    ]
  }
];
