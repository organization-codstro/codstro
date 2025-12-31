import { ProjectPage, Todo } from "../../types/ProjectPlanning/project";

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
