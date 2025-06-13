const posts = [
  {
    title: "Hello I am Mario",
    username: "ksenyay",
    posted: "2 hours ago",
    description:
      "This is a sample post about adventures in the Mushroom Kingdom. Mario has been jumping through pipes and rescuing Princess Peach from Bowser. Every level brings new challenges and exciting power-ups that help Mario on his quest!",
    likes: 2,
  },
  {
    title: "Frontend Tips",
    username: "webdev_john",
    posted: "1 hour ago",
    description:
      "Always keep your components small and reusable! Breaking your UI into manageable pieces not only helps maintainability but also makes your app more performant. Using hooks wisely can also make your React components clean and easier to debug.",
    likes: 7,
  },
  {
    title: "Node.js Rocks",
    username: "backend_guru",
    posted: "just now",
    description:
      "Streams, events, and the event loop: Node.js is 🔥. Understanding how the event-driven architecture works helps you build scalable and efficient backend applications. Don't forget to explore async/await and promises to handle asynchronous code more gracefully!",
    likes: 10,
  },
  {
    title: "Why TypeScript?",
    username: "code_master",
    posted: "30 minutes ago",
    description:
      "TypeScript adds static typing to JavaScript, helping catch errors at compile time instead of runtime. It improves code readability and tooling support, making your projects more robust and maintainable. Strongly recommend adopting it for any medium to large-scale project!",
    likes: 5,
  },
  {
    title: "CSS Grid vs Flexbox",
    username: "design_guru",
    posted: "45 minutes ago",
    description:
      "Both CSS Grid and Flexbox are powerful layout systems but serve different purposes. Flexbox is great for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts. Understanding when to use each will greatly enhance your responsive design skills.",
    likes: 8,
  },
  {
    title: "JavaScript Async Patterns",
    username: "async_ninja",
    posted: "15 minutes ago",
    description:
      "Promises, async/await, and callbacks are the backbone of asynchronous JavaScript. Using async/await makes your code cleaner and easier to understand, but under the hood, it’s all still promises. Proper error handling with try/catch blocks ensures your app stays robust.",
    likes: 12,
  },
  {
    title: "React Performance Optimization",
    username: "react_pro",
    posted: "5 minutes ago",
    description:
      "To optimize React app performance, consider memoization with React.memo and useCallback, lazy loading components, and avoiding unnecessary re-renders by managing state wisely. Profiling your app with React DevTools can pinpoint bottlenecks quickly.",
    likes: 9,
  },
];

module.exports = posts;
