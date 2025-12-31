import { RecommendedPin } from "../../types/Woomoonjeong/woomoonjeong";

export interface Field {
  id: string;
  name: string;
  type: "web" | "app" | "server" | "game" | "security" | "work" | "other";
  description: string;
  image?: string;
  groups: Group[];
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  pins: Pin[];
  created_at: string;
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  created_at: string;
}

export interface Todo {
  id: string;
  field_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
}

export const fieldTypeColors = {
  web: "bg-red-100 text-red-700 border-red-200",
  app: "bg-orange-100 text-orange-700 border-orange-200",
  server: "bg-yellow-100 text-yellow-700 border-yellow-200",
  game: "bg-green-100 text-green-700 border-green-200",
  security: "bg-blue-100 text-blue-700 border-blue-200",
  work: "bg-indigo-100 text-indigo-700 border-indigo-200",
  other: "bg-purple-100 text-purple-700 border-purple-200",
};

export const woomoonjeongData: Field[] = [
  {
    id: "1",
    name: "Frontend Development",
    type: "web",
    description: "Web frontend technologies and frameworks",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    created_at: "2024-01-15T09:00:00Z",
    groups: [
      {
        id: "1-1",
        name: "React Ecosystem",
        description: "React and related libraries",
        created_at: "2024-01-15T09:30:00Z",
        pins: [
          {
            id: "1-1-1",
            title: "React Official Documentation",
            description: "Complete guide to React concepts and API",
            url: "https://react.dev",
            tags: ["react", "documentation", "official"],
            created_at: "2024-01-15T10:00:00Z",
          },
          {
            id: "1-1-2",
            title: "Next.js Tutorial",
            description: "Learn Next.js with hands-on examples",
            url: "https://nextjs.org/learn",
            tags: ["nextjs", "tutorial", "ssr"],
            created_at: "2024-01-16T14:30:00Z",
          },
        ],
      },
      {
        id: "1-2",
        name: "CSS & Styling",
        description: "Modern CSS techniques and frameworks",
        created_at: "2024-01-17T11:00:00Z",
        pins: [
          {
            id: "1-2-1",
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
    name: "Mobile Development",
    type: "app",
    description: "iOS and Android app development",
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    created_at: "2024-01-18T13:00:00Z",
    groups: [
      {
        id: "2-1",
        name: "React Native",
        description: "Cross-platform mobile development",
        created_at: "2024-01-18T13:30:00Z",
        pins: [
          {
            id: "2-1-1",
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
    name: "Backend Development",
    type: "server",
    description: "Server-side development and APIs",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    created_at: "2024-01-19T15:00:00Z",
    groups: [
      {
        id: "3-1",
        name: "Node.js",
        description: "JavaScript runtime for server-side development",
        created_at: "2024-01-19T15:30:00Z",
        pins: [
          {
            id: "3-1-1",
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
    id: "t1",
    field_id: "1",
    name: "Complete React Tutorial",
    description:
      "Finish the official React tutorial and build a tic-tac-toe game",
    start_date: "2024-01-20",
    end_date: "2024-01-22",
    status: "in-progress",
    created_at: "2024-01-20T09:00:00Z",
  },
  {
    id: "t2",
    field_id: "1",
    name: "Setup Tailwind CSS Project",
    description: "Create a new project with Tailwind CSS configuration",
    start_date: "2024-01-21",
    end_date: "2024-01-21",
    status: "pending",
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "t3",
    field_id: "2",
    name: "React Native Environment Setup",
    description: "Install and configure React Native development environment",
    start_date: "2024-01-19",
    end_date: "2024-01-19",
    status: "completed",
    created_at: "2024-01-19T08:00:00Z",
  },
  {
    id: "t4",
    field_id: "3",
    name: "Build REST API with Express",
    description: "Create a simple REST API using Express.js",
    start_date: "2024-01-23",
    end_date: "2024-01-25",
    status: "pending",
    created_at: "2024-01-20T11:00:00Z",
  },
];

export const recommendedPins = [
  {
    id: "r1",
    title: "JavaScript ES6+ Features",
    description: "Modern JavaScript features every developer should know",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    tags: ["javascript", "es6", "modern"],
    field_type: "web" as const,
    created_at: "2024-01-20T12:00:00Z",
  },
  {
    id: "r2",
    title: "Flutter Documentation",
    description:
      "Google's UI toolkit for building natively compiled applications",
    url: "https://flutter.dev/docs",
    tags: ["flutter", "mobile", "dart"],
    field_type: "app" as const,
    created_at: "2024-01-20T13:00:00Z",
  },
  {
    id: "r3",
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
  ...recommendedPins.map((pin) => ({
    ...pin,
    difficulty: "beginner" as const,
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    views: Math.floor(Math.random() * 1000) + 100,
  })),
  {
    id: "r4",
    title: "TypeScript Handbook",
    description: "Complete guide to TypeScript for JavaScript developers",
    url: "https://www.typescriptlang.org/docs/",
    tags: ["typescript", "javascript", "types"],
    field_type: "web" as const,
    created_at: "2024-01-20T15:00:00Z",
    difficulty: "intermediate" as const,
    rating: 5,
    views: 850,
  },
  {
    id: "r5",
    title: "Swift Programming Guide",
    description: "Apple's official Swift programming language guide",
    url: "https://docs.swift.org/swift-book/",
    tags: ["swift", "ios", "apple"],
    field_type: "app" as const,
    created_at: "2024-01-20T16:00:00Z",
    difficulty: "intermediate" as const,
    rating: 5,
    views: 650,
  },
  {
    id: "r6",
    title: "Node.js Best Practices",
    description: "Collection of Node.js best practices and guidelines",
    url: "https://github.com/goldbergyoni/nodebestpractices",
    tags: ["nodejs", "backend", "best-practices"],
    field_type: "server" as const,
    created_at: "2024-01-20T17:00:00Z",
    difficulty: "advanced" as const,
    rating: 5,
    views: 920,
  },
  {
    id: "r7",
    title: "Unity Game Development",
    description: "Learn game development with Unity engine",
    url: "https://learn.unity.com/",
    tags: ["unity", "game-dev", "c#"],
    field_type: "game" as const,
    created_at: "2024-01-20T18:00:00Z",
    difficulty: "beginner" as const,
    rating: 4,
    views: 750,
  },
  {
    id: "r8",
    title: "OWASP Security Guide",
    description: "Web application security best practices",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    tags: ["security", "web", "owasp"],
    field_type: "security" as const,
    created_at: "2024-01-20T19:00:00Z",
    difficulty: "advanced" as const,
    rating: 5,
    views: 480,
  },
  {
    id: "r9",
    title: "Agile Development Methodology",
    description: "Understanding Agile and Scrum methodologies",
    url: "https://agilemanifesto.org/",
    tags: ["agile", "scrum", "methodology"],
    field_type: "work" as const,
    created_at: "2024-01-20T20:00:00Z",
    difficulty: "beginner" as const,
    rating: 4,
    views: 320,
  },
];
