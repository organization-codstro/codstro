export const libraries = [
  {
    id: "1",
    name: "React",
    language: "JavaScript",
    category: "Frontend Framework",
    tags: ["UI", "SPA", "Component"],
    description: "A JavaScript library for building user interfaces",
  },
  {
    id: "2",
    name: "Express.js",
    language: "JavaScript",
    category: "Backend Framework",
    tags: ["Node.js", "API", "Web"],
    description: "Fast, unopinionated, minimalist web framework for Node.js",
  },
  {
    id: "3",
    name: "TailwindCSS",
    language: "CSS",
    category: "CSS Framework",
    tags: ["Utility", "Styling", "Design"],
    description:
      "A utility-first CSS framework for rapidly building custom designs",
  },
  {
    id: "4",
    name: "Django",
    language: "Python",
    category: "Backend Framework",
    tags: ["Python", "Full-stack", "ORM"],
    description: "High-level Python web framework",
  },
  {
    id: "5",
    name: "Vue.js",
    language: "JavaScript",
    category: "Frontend Framework",
    tags: ["UI", "SPA", "Component"],
    description: "Progressive JavaScript framework for building UIs",
  },
  {
    id: "6",
    name: "Flask",
    language: "Python",
    category: "Backend Framework",
    tags: ["Python", "Microframework", "API"],
    description: "Lightweight WSGI web application framework",
  },
];

export const library = {
  id: "1",
  name: "React",
  language: "JavaScript",
  category: "Frontend Framework",
  tags: ["UI", "SPA", "Component"],
  officialSite: "https://react.dev",
  description:
    "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.",
  content: `# What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Features

### Component-Based Architecture
Build encapsulated components that manage their own state, then compose them to make complex UIs.

### Declarative Views
Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### Learn Once, Write Anywhere
Develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

## Example Code

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
\`\`\`

## When to Use React?

- Building single-page applications (SPAs)
- Creating interactive user interfaces
- Developing reusable UI components
- Building mobile apps with React Native
- Creating server-rendered applications with Next.js`,
  useCases: [
    "Single Page Applications",
    "Progressive Web Apps",
    "Mobile Applications (React Native)",
    "Interactive Dashboards",
    "E-commerce Websites",
  ],
  relatedConcepts: [
    { id: "2", name: "Vue.js", type: "library" },
    { id: "3", name: "Next.js", type: "library" },
    { id: "4", name: "JavaScript ES6+", type: "concept" },
    { id: "5", name: "Component Lifecycle", type: "concept" },
  ],
};
