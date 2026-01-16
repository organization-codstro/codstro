export interface CloneCodingProject {
  id: string;
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

export interface UserCloneCodingProject {
  id: string;
  user_id: string;
  project_id: string;
  status: "waiting" | "in progress" | "done";
  is_bookmarked: boolean;
  progress_notes?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface ProjectGroup {
  id: string;
  user_id: string;
  project_id: string;
  name: string;
  links: {
    title: string;
    url: string;
    type: "documentation" | "library" | "tutorial" | "other";
  }[];
  created_at: string;
}

export interface ProjectTodo {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  created_at: string;
}
