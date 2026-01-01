import {
  ProjectPage,
  Todo,
  Project,
} from "../../types/ProjectPlanning/project";

// 예시 데이터: 진행중인 프로젝트 (기획 완료)
export const activeProjectsData: Project[] = [
  {
    project_id: 1,
    project_name: "AI Chat App",
    project_description: "A modern chat application with AI integration",
    project_topic: "Real-time messaging application",
    project_stacks: "React, TypeScript, Node.js, WebSocket",
    project_start_date: "2025-12-01",
    project_end_date: "2026-03-31",
    project_main_color: "#587CF0",
    project_style: "Modern, minimalist",
    project_effect: "Smooth transitions, fade animations",
    project_created_date: "2025-11-15",
    user_id: 1,
    project_status: "active",
  },
  {
    project_id: 2,
    project_name: "E-commerce Platform",
    project_description:
      "Full-stack e-commerce solution with payment integration",
    project_topic: "Online shopping platform",
    project_stacks: "Next.js, PostgreSQL, Stripe",
    project_start_date: "2025-11-20",
    project_end_date: "2026-04-20",
    project_main_color: "#10B981",
    project_style: "Clean, professional",
    project_effect: "Hover effects, loading animations",
    project_created_date: "2025-11-10",
    user_id: 1,
    project_status: "active",
  },
];

// 예시 데이터: 기획중인 프로젝트
export const planningProjectsData: Project[] = [
  {
    project_id: 3,
    project_name: "Task Management Tool",
    project_description: "A collaborative task management application",
    project_topic: "Productivity and collaboration",
    project_stacks: "Vue.js, Express, MongoDB",
    project_start_date: "",
    project_end_date: "",
    project_main_color: "#F59E0B",
    project_style: "",
    project_effect: "",
    project_created_date: "2025-12-20",
    user_id: 1,
    project_status: "planning",
  },
  {
    project_id: 4,
    project_name: "Social Media Dashboard",
    project_description: "Analytics dashboard for social media management",
    project_topic: "Data visualization and analytics",
    project_stacks: "React, D3.js, Python",
    project_start_date: "",
    project_end_date: "",
    project_main_color: "#8B5CF6",
    project_style: "",
    project_effect: "",
    project_created_date: "2025-12-22",
    user_id: 1,
    project_status: "planning",
  },
];

export const projectTodosData: Todo[] = [
  {
    todo_id: 1,
    todo_name: "Setup project repository",
    todo_content: "Initialize Git and setup development environment",
    todo_description:
      "Create GitHub repository and configure development tools",
    todo_start_date: "2025-12-25",
    todo_end_date: "2025-12-27",
    todo_status: "waiting",
    todo_created_date: "2025-12-25",
  },
  {
    todo_id: 2,
    todo_name: "Design database schema",
    todo_content: "Plan and create database structure",
    todo_description: "Design ERD and create migration files",
    todo_start_date: "2025-12-27",
    todo_end_date: "2025-12-30",
    todo_status: "waiting",
    todo_created_date: "2025-12-25",
  },
];

export const pagesData: Array<ProjectPage & { todos: Todo[] }> = [
  {
    project_page_id: 1,
    project_page_name: "Authentication",
    project_page_role: "User Management",
    project_page_function: "Login, Signup, Password Reset",
    project_page_is_complete: false,
    project_id: 0,
    todos: [
      {
        todo_id: 10,
        todo_name: "Design login UI",
        todo_content: "Create responsive login form",
        todo_description: "Design and implement login page with validation",
        todo_start_date: "2025-12-25",
        todo_end_date: "2025-12-28",
        todo_status: "waiting",
        todo_created_date: "2025-12-25",
      },
      {
        todo_id: 11,
        todo_name: "Implement authentication logic",
        todo_content: "Set up auth flow",
        todo_description: "Connect to backend authentication service",
        todo_start_date: "2025-12-28",
        todo_end_date: "2026-01-02",
        todo_status: "waiting",
        todo_created_date: "2025-12-25",
      },
    ],
  },
  {
    project_page_id: 2,
    project_page_name: "Chat Interface",
    project_page_role: "Messaging",
    project_page_function: "Send messages, display chat history",
    project_page_is_complete: false,
    project_id: 0,
    todos: [
      {
        todo_id: 12,
        todo_name: "Create chat UI",
        todo_content: "Design message list and input",
        todo_description: "Build real-time chat interface",
        todo_start_date: "2026-01-03",
        todo_end_date: "2026-01-10",
        todo_status: "waiting",
        todo_created_date: "2025-12-25",
      },
    ],
  },
];

// 예시 데이터: 아카이브된 프로젝트 (마감일이 끝난 프로젝트)
export const archivedProjectsData: Project[] = [
  {
    project_id: 5,
    project_name: "Portfolio Website",
    project_description: "Personal portfolio website with blog functionality",
    project_topic: "Personal branding and portfolio",
    project_stacks: "React, Next.js, Tailwind CSS",
    project_start_date: "2025-01-01",
    project_end_date: "2025-06-30",
    project_main_color: "#6366F1",
    project_style: "Modern, clean",
    project_effect: "Smooth scroll animations",
    project_created_date: "2024-12-15",
    user_id: 1,
    project_status: "active",
  },
  {
    project_id: 6,
    project_name: "Weather App",
    project_description: "Real-time weather application with location services",
    project_topic: "Weather data visualization",
    project_stacks: "Vue.js, OpenWeather API",
    project_start_date: "2025-02-01",
    project_end_date: "2025-05-31",
    project_main_color: "#14B8A6",
    project_style: "Minimalist, informative",
    project_effect: "Weather animations",
    project_created_date: "2025-01-20",
    user_id: 1,
    project_status: "active",
  },
];

//오늘의 주요 뉴스?
export const trendingNewsData = [
  {
    id: 1,
    title: "AI-powered development tools gaining popularity",
    date: "2025-12-25",
  },
  { id: 2, title: "New React 19 features released", date: "2025-12-24" },
  { id: 3, title: "TypeScript 5.4 improvements", date: "2025-12-23" },
];
