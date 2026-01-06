export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  thumbnail_url?: string;
  github_url?: string;
  demo_url?: string;
  tags: string[];
  created_at: string;
}

export interface UserProject {
  id: number;
  user_id: number;
  project_id: number;
  status: "not_started" | "in_progress" | "completed";
  is_bookmarked: boolean;
  progress_notes?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface ProjectGroup {
  id: number;
  user_id: number;
  project_id: number;
  name: string;
  links: {
    title: string;
    url: string;
    type: "documentation" | "library" | "tutorial" | "other";
  }[];
  created_at: string;
}

export interface ProjectTodo {
  id: number;
  user_id: number;
  project_id?: number;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  created_at: string;
}

