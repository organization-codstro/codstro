import {
  Group,
  RecommendedPin,
  Todo,
} from "../../types/pages/Woomoonjeong/woomoonjeong";

export const fieldTypeColors = {
  web: "bg-red-100 text-red-700 border-red-200",
  app: "bg-orange-100 text-orange-700 border-orange-200",
  server: "bg-yellow-100 text-yellow-700 border-yellow-200",
  game: "bg-green-100 text-green-700 border-green-200",
  security: "bg-blue-100 text-blue-700 border-blue-200",
  work: "bg-indigo-100 text-indigo-700 border-indigo-200",
  other: "bg-purple-100 text-purple-700 border-purple-200",
};

export const woomoonjeongData: Group[] = [
  {
    id: "1",
    name: "web",
    description: "Web frontend technologies and frameworks",

    created_at: "2024-01-15T09:00:00Z",
    fields: [
      {
        id: "1",
        name: "React Ecosystem",
        description: "React and related libraries",
        created_at: "2024-01-15T09:30:00Z",
        pins: [
          {
            id: "1",
            title: "React Official Documentation",
            description: "Complete guide to React concepts and API",
            url: "https://react.dev",
            tags: ["react", "documentation", "official"],
            created_at: "2024-01-15T10:00:00Z",
          },
          {
            id: "2",
            title: "Next.js Tutorial",
            description: "Learn Next.js with hands-on examples",
            url: "https://nextjs.org/learn",
            tags: ["nextjs", "tutorial", "ssr"],
            created_at: "2024-01-16T14:30:00Z",
          },
        ],
      },
      {
        id: "2",
        name: "CSS & Styling",
        description: "Modern CSS techniques and frameworks",
        created_at: "2024-01-17T11:00:00Z",
        pins: [
          {
            id: "3",
            title: "Tailwind CSS Documentation",
            description: "Utility-first CSS framework",
            url: "https://tailwindcss.com/docs",
            tags: ["css", "tailwind", "utility"],
            created_at: "2024-01-17T11:30:00Z",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "app",
    description: "iOS and Android app development",
    created_at: "2024-01-18T13:00:00Z",
    fields: [
      {
        id: "3",
        name: "React Native",
        description: "Cross-platform mobile development",
        created_at: "2024-01-18T13:30:00Z",
        pins: [
          {
            id: "4",
            title: "React Native Getting Started",
            description: "Official React Native setup guide",
            url: "https://reactnative.dev/docs/getting-started",
            tags: ["react-native", "mobile", "cross-platform"],
            created_at: "2024-01-18T14:00:00Z",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "server",
    description: "Server-side development and APIs",
    created_at: "2024-01-19T15:00:00Z",
    fields: [
      {
        id: "4",
        name: "Node.js",
        description: "JavaScript runtime for server-side development",
        created_at: "2024-01-19T15:30:00Z",
        pins: [
          {
            id: "5",
            title: "Express.js Guide",
            description: "Fast, unopinionated web framework for Node.js",
            url: "https://expressjs.com/en/guide/routing.html",
            tags: ["nodejs", "express", "api"],
            created_at: "2024-01-19T16:00:00Z",
          },
        ],
      },
    ],
  },
];

export const todosData: Todo[] = [
  {
    todo_id: "1",
    field_id: "1",
    todo_name: "Complete React Tutorial",
    todo_description:
      "Finish the official React tutorial and build a tic-tac-toe game",
    todo_start_date: "2024-01-20",
    todo_end_date: "2024-01-22",
    todo_status: "in-progress",
    todo_created_date: "2024-01-20T09:00:00Z",
  },
  {
    todo_id: "2",
    field_id: "1",
    todo_name: "Setup Tailwind CSS Project",
    todo_description: "Create a new project with Tailwind CSS configuration",
    todo_start_date: "2024-01-21",
    todo_end_date: "2024-01-21",
    todo_status: "waiting",
    todo_created_date: "2024-01-20T10:00:00Z",
  },
  {
    todo_id: "3",
    field_id: "2",
    todo_name: "React Native Environment Setup",
    todo_description: "Install and configure React Native development environment",
    todo_start_date: "2024-01-19",
    todo_end_date: "2024-01-19",
    todo_status: "done",
    todo_created_date: "2024-01-19T08:00:00Z",
  },
  {
    todo_id: "4",
    field_id: "3",
    todo_name: "Build REST API with Express",
    todo_description: "Create a simple REST API using Express.js",
    todo_start_date: "2024-01-23",
    todo_end_date: "2024-01-25",
    todo_status: "waiting",
    todo_created_date: "2024-01-20T11:00:00Z",
  },
  // 2026년 1월 2일 예시 데이터
  {
    todo_id: "5",
    field_id: "1",
    todo_name: "Learn TypeScript Fundamentals",
    todo_description:
      "Study TypeScript basic types, interfaces, and generics for better code quality",
    todo_start_date: "2026-01-02",
    todo_end_date: "2026-01-02",
    todo_status: "waiting",
    todo_created_date: "2026-01-01T09:00:00Z",
  },
  {
    todo_id: "6",
    field_id: "1",
    todo_name: "Build Portfolio Website",
    todo_description:
      "Create a personal portfolio website using React and showcase recent projects",
    todo_start_date: "2026-01-02",
    todo_end_date: "2026-01-05",
    todo_status: "in-progress",
    todo_created_date: "2026-01-01T10:00:00Z",
  },
  {
    todo_id: "7",
    field_id: "2",
    todo_name: "Flutter App Development",
    todo_description:
      "Start learning Flutter framework and build a simple mobile app",
    todo_start_date: "2026-01-02",
    todo_end_date: "2026-01-04",
    todo_status: "waiting",
    todo_created_date: "2026-01-01T11:00:00Z",
  },
  {
    todo_id: "8",
    field_id: "3",
    todo_name: "Database Design Practice",
    todo_description:
      "Practice designing normalized database schemas for e-commerce applications",
    todo_start_date: "2026-01-02",
    todo_end_date: "2026-01-03",
    todo_status: "done",
    todo_created_date: "2026-01-01T12:00:00Z",
  },
];

export const recommendedPins = [
  {
    id: "1",
    title: "JavaScript ES6+ Features",
    description: "Modern JavaScript features every developer should know",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    tags: ["javascript", "es6", "modern"],
    field_type: "web" as const,
    created_at: "2024-01-20T12:00:00Z",
  },
  {
    id: "2",
    title: "Flutter Documentation",
    description:
      "Google's UI toolkit for building natively compiled applications",
    url: "https://flutter.dev/docs",
    tags: ["flutter", "mobile", "dart"],
    field_type: "app" as const,
    created_at: "2024-01-20T13:00:00Z",
  },
  {
    id: "3",
    title: "Docker Getting Started",
    description: "Containerization platform for modern applications",
    url: "https://docs.docker.com/get-started/",
    tags: ["docker", "containers", "devops"],
    field_type: "server" as const,
    created_at: "2024-01-20T14:00:00Z",
  },
];

// Extended recommended pins data for demonstration
export const extendedRecommendedPins: RecommendedPin[] = [
  {
    pin_id: "4",
    pin_title: "TypeScript Handbook",
    pin_description: "Complete guide to TypeScript for JavaScript developers",
    pin_url: "https://www.typescriptlang.org/docs/",
    pin_label: ["typescript", "javascript", "types"],
    created_at: "2024-01-20T15:00:00Z",
  },
  {
    pin_id: "5",
    pin_title: "Swift Programming Guide",
    pin_description: "Apple's official Swift programming language guide",
    pin_url: "https://docs.swift.org/swift-book/",
    pin_label: ["swift", "ios", "apple"],
    created_at: "2024-01-20T16:00:00Z",
  },
  {
    pin_id: "6",
    pin_title: "Node.js Best Practices",
    pin_description: "Collection of Node.js best practices and guidelines",
    pin_url: "https://github.com/goldbergyoni/nodebestpractices",
    pin_label: ["nodejs", "backend", "best-practices"],
    created_at: "2024-01-20T17:00:00Z",
  },
  {
    pin_id: "7",
    pin_title: "Unity Game Development",
    pin_description: "Learn game development with Unity engine",
    pin_url: "https://learn.unity.com/",
    pin_label: ["unity", "game-dev", "c#"],
    created_at: "2024-01-20T18:00:00Z",
  },
  {
    pin_id: "8",
    pin_title: "OWASP Security Guide",
    pin_description: "Web application security best practices",
    pin_url: "https://owasp.org/www-project-web-security-testing-guide/",
    pin_label: ["security", "web", "owasp"],
    created_at: "2024-01-20T19:00:00Z",
  },
  {
    pin_id: "9",
    pin_title: "Agile Development Methodology",
    pin_description: "Understanding Agile and Scrum methodologies",
    pin_url: "https://agilemanifesto.org/",
    pin_label: ["agile", "scrum", "methodology"],
    created_at: "2024-01-20T20:00:00Z",
  },
];
