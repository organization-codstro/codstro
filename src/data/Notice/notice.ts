import { Notice } from "../../types/Notice/Notice";

export const notices: Notice[] = [
  {
    id: "1",
    title: "New React 19 Features Released",
    category: "Update",
    date: "2024-01-20",
    preview:
      "Explore the latest features and improvements in React 19, including new hooks and performance optimizations...",
    isPinned: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Maintenance Schedule - Server Updates",
    category: "Maintenance",
    date: "2024-01-19",
    preview:
      "We will be performing scheduled maintenance on January 25, 2024...",
    isPinned: true,
    isNew: true,
  },
  {
    id: "3",
    title: "New Coding Challenges Available",
    category: "Feature",
    date: "2024-01-18",
    preview: "Try our new collection of beginner-friendly coding challenges...",
    isPinned: false,
    isNew: true,
  },
];

export const notice = {
  id: 1,
  title: "New React 19 Features Released",
  category: "Update",
  date: "2024-01-20",
  author: "Codstro Team",
  content: `# React 19 - What's New?

React 19 brings several exciting new features and improvements to enhance your development experience. Let's explore what's new!

## Key Features

### 1. Automatic Batching
React 19 now automatically batches all state updates within event handlers and lifecycle methods, improving performance by reducing the number of re-renders.

\`\`\`javascript
// Before: Two separate renders
handleClick = () => {
  this.setState({ count: this.state.count + 1 });
  this.setState({ name: 'John' });
};

// After: Single batched render
const handleClick = () => {
  setCount(count + 1);
  setName('John');
};
\`\`\`

### 2. Improved Hooks

#### useTransition
Allows you to mark state updates as transitions, which are lower priority than urgent updates.

\`\`\`javascript
const [isPending, startTransition] = useTransition();

const handleSearch = (e) => {
  const value = e.target.value;
  startTransition(() => {
    setSearchTerm(value);
  });
};
\`\`\`

#### useDeferredValue
Lets you defer updating a non-critical part of the UI until more urgent updates are complete.

\`\`\`javascript
const deferredValue = useDeferredValue(value);
\`\`\`

### 3. Server Components (Experimental)
Write components that render on the server and send the rendered content to the browser.

\`\`\`javascript
// This component runs on the server
export default async function ServerComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}
\`\`\`

### 4. New useId Hook
Generates unique IDs that are stable across server and client renders.

\`\`\`javascript
const id = useId(); // Ensures unique ID across SSR
\`\`\`

### 5. Suspense for Data Fetching
Full support for Suspense with data fetching libraries.

\`\`\`javascript
<Suspense fallback={<Loading />}>
  <UserData userId={userId} />
</Suspense>
\`\`\`

## Migration Guide

Upgrading to React 19 is straightforward. Follow these steps:

1. Update React to version 19:
   \`\`\`bash
   npm install react@19 react-dom@19
   \`\`\`

2. Check your dependencies - most packages already support React 19

3. Review the Breaking Changes section in the official documentation

4. Test your application thoroughly

5. Update your code to use new features gradually

## Performance Improvements

React 19 includes multiple performance optimizations:

- **Faster Server Rendering**: Improved server-side rendering performance
- **Better Code Splitting**: Automatic detection of suspendable components
- **Reduced Bundle Size**: Tree-shaking improvements for unused code

## Breaking Changes

Before upgrading, be aware of these changes:

- Removed PropTypes from the main React package
- Deprecated string refs
- Changes to event handling behavior

## Resources

- [Official React Documentation](https://react.dev)
- [React 19 Release Notes](https://react.dev/blog/2024/01/20/react-19)
- [Upgrade Guide](https://react.dev/blog/2024/01/20/react-19-upgrade-guide)

## What's Next?

Start exploring React 19 features in your projects and join the community discussions to share your experiences!`,
};
