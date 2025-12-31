export const notes = [
  {
    id: "1",
    title: "React Basics Study Notes",
    concepts: ["React", "JSX", "Components"],
    lastUpdated: "2024-01-15",
    preview:
      "My personal notes on React fundamentals including components, props, and state management...",
  },
  {
    id: "2",
    title: "REST API Design Principles",
    concepts: ["REST API", "HTTP", "API Design"],
    lastUpdated: "2024-01-14",
    preview:
      "Understanding REST architecture and best practices for designing scalable APIs...",
  },
  {
    id: "3",
    title: "Data Structures Overview",
    concepts: ["Arrays", "Linked Lists", "Trees", "Graphs"],
    lastUpdated: "2024-01-12",
    preview:
      "Comprehensive notes on common data structures and their use cases...",
  },
];

export const note = {
  id: "1",
  title: "React Basics Study Notes",
  concepts: ["React", "JSX", "Components"],
  lastUpdated: "2024-01-15",
  content: `# React Basics

React is a JavaScript library for building user interfaces.

## Components

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

### Function Components

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### Class Components

\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

## JSX

JSX is a syntax extension to JavaScript. It produces React "elements".

### Key Points:
- JSX looks like HTML but it's actually JavaScript
- You can embed expressions in JSX using curly braces
- JSX is transformed into React.createElement() calls

## Props

Props are arguments passed into React components. They are passed to components via HTML attributes.

## State

State is a built-in object that stores data that determines how the component renders and behaves.

### Using useState Hook

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Next Steps

- Learn about useEffect hook
- Understand component lifecycle
- Study React Router for navigation`,
};
