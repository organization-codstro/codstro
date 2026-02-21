// import {
//   Group,
//   RecommendedPin,
// } from "../../types/pages/Woomoonjeong/woomoonjeong";

// export const woomoonjeongData: Group[] = [
//   {
//     group_id: "1",
//     group_name: "web",
//     group_description: "Web frontend technologies and frameworks",

//     created_at: "2024-01-15T09:00:00Z",
//     fields: [
//       {
//         field_id: "1",
//         field_name: "React Ecosystem",
//         field_description: "React and related libraries",
//         created_at: "2024-01-15T09:30:00Z",
//         updated_at: "2024-01-15T09:30:00Z",
//         pins: [
//           {
//             pin_id: "1",
//             pin_title: "React Official Documentation",
//             pin_description: "Complete guide to React concepts and API",
//             pin_url: "https://react.dev",
//             pin_label: ["react", "documentation", "official"],
//             created_at: "2024-01-15T10:00:00Z",
//           },
//           {
//             pin_id: "2",
//             pin_title: "Next.js Tutorial",
//             pin_description: "Learn Next.js with hands-on examples",
//             pin_url: "https://nextjs.org/learn",
//             pin_label: ["nextjs", "tutorial", "ssr"],
//             created_at: "2024-01-16T14:30:00Z",
//           },
//         ],
//       },
//       {
//         field_id: "2",
//         field_name: "CSS & Styling",
//         field_description: "Modern CSS techniques and frameworks",
//         created_at: "2024-01-17T11:00:00Z",
//         updated_at: "2024-01-15T09:30:00Z",
//         pins: [
//           {
//             pin_id: "3",
//             pin_title: "Tailwind CSS Documentation",
//             pin_description: "Utility-first CSS framework",
//             pin_url: "https://tailwindcss.com/docs",
//             pin_label: ["css", "tailwind", "utility"],
//             created_at: "2024-01-17T11:30:00Z",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export const todosData: Todo[] = [
//   {
//     todo_id: "1",
//     field_id: "1",
//     todo_name: "Complete React Tutorial",
//     todo_description:
//       "Finish the official React tutorial and build a tic-tac-toe game",
//     todo_start_date: "2024-01-20",
//     todo_end_date: "2024-01-22",
//     todo_status: "in-progress",
//     todo_created_date: "2024-01-20T09:00:00Z",
//   },
//   {
//     todo_id: "2",
//     field_id: "1",
//     todo_name: "Setup Tailwind CSS Project",
//     todo_description: "Create a new project with Tailwind CSS configuration",
//     todo_start_date: "2024-01-21",
//     todo_end_date: "2024-01-21",
//     todo_status: "waiting",
//     todo_created_date: "2024-01-20T10:00:00Z",
//   },
//   {
//     todo_id: "3",
//     field_id: "2",
//     todo_name: "React Native Environment Setup",
//     todo_description:
//       "Install and configure React Native development environment",
//     todo_start_date: "2024-01-19",
//     todo_end_date: "2024-01-19",
//     todo_status: "done",
//     todo_created_date: "2024-01-19T08:00:00Z",
//   },
//   {
//     todo_id: "4",
//     field_id: "3",
//     todo_name: "Build REST API with Express",
//     todo_description: "Create a simple REST API using Express.js",
//     todo_start_date: "2024-01-23",
//     todo_end_date: "2024-01-25",
//     todo_status: "waiting",
//     todo_created_date: "2024-01-20T11:00:00Z",
//   },
//   // 2026년 1월 2일 예시 데이터
//   {
//     todo_id: "5",
//     field_id: "1",
//     todo_name: "Learn TypeScript Fundamentals",
//     todo_description:
//       "Study TypeScript basic types, interfaces, and generics for better code quality",
//     todo_start_date: "2026-01-02",
//     todo_end_date: "2026-01-02",
//     todo_status: "waiting",
//     todo_created_date: "2026-01-01T09:00:00Z",
//   },
//   {
//     todo_id: "6",
//     field_id: "1",
//     todo_name: "Build Portfolio Website",
//     todo_description:
//       "Create a personal portfolio website using React and showcase recent projects",
//     todo_start_date: "2026-01-02",
//     todo_end_date: "2026-01-05",
//     todo_status: "in-progress",
//     todo_created_date: "2026-01-01T10:00:00Z",
//   },
//   {
//     todo_id: "7",
//     field_id: "2",
//     todo_name: "Flutter App Development",
//     todo_description:
//       "Start learning Flutter framework and build a simple mobile app",
//     todo_start_date: "2026-01-02",
//     todo_end_date: "2026-01-04",
//     todo_status: "waiting",
//     todo_created_date: "2026-01-01T11:00:00Z",
//   },
//   {
//     todo_id: "8",
//     field_id: "3",
//     todo_name: "Database Design Practice",
//     todo_description:
//       "Practice designing normalized database schemas for e-commerce applications",
//     todo_start_date: "2026-01-02",
//     todo_end_date: "2026-01-03",
//     todo_status: "done",
//     todo_created_date: "2026-01-01T12:00:00Z",
//   },
// ];

// export const recommendedPins = [
//   {
//     id: "1",
//     title: "JavaScript ES6+ Features",
//     description: "Modern JavaScript features every developer should know",
//     url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
//     tags: ["javascript", "es6", "modern"],
//     field_type: "web" as const,
//     created_at: "2024-01-20T12:00:00Z",
//   },
//   {
//     id: "2",
//     title: "Flutter Documentation",
//     description:
//       "Google's UI toolkit for building natively compiled applications",
//     url: "https://flutter.dev/docs",
//     tags: ["flutter", "mobile", "dart"],
//     field_type: "app" as const,
//     created_at: "2024-01-20T13:00:00Z",
//   },
//   {
//     id: "3",
//     title: "Docker Getting Started",
//     description: "Containerization platform for modern applications",
//     url: "https://docs.docker.com/get-started/",
//     tags: ["docker", "containers", "devops"],
//     field_type: "server" as const,
//     created_at: "2024-01-20T14:00:00Z",
//   },
// ];

// // Extended recommended pins data for demonstration
// export const extendedRecommendedPins: RecommendedPin[] = [
//   {
//     pin_id: "4",
//     pin_title: "TypeScript Handbook",
//     pin_description: "Complete guide to TypeScript for JavaScript developers",
//     pin_url: "https://www.typescriptlang.org/docs/",
//     pin_label: ["typescript", "javascript", "types"],
//     created_at: "2024-01-20T15:00:00Z",
//   },
//   {
//     pin_id: "5",
//     pin_title: "Swift Programming Guide",
//     pin_description: "Apple's official Swift programming language guide",
//     pin_url: "https://docs.swift.org/swift-book/",
//     pin_label: ["swift", "ios", "apple"],
//     created_at: "2024-01-20T16:00:00Z",
//   },
//   {
//     pin_id: "6",
//     pin_title: "Node.js Best Practices",
//     pin_description: "Collection of Node.js best practices and guidelines",
//     pin_url: "https://github.com/goldbergyoni/nodebestpractices",
//     pin_label: ["nodejs", "backend", "best-practices"],
//     created_at: "2024-01-20T17:00:00Z",
//   },
// ];
