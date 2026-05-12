import { CLONE_CODING_STATE_TYPE } from "../../constants/Woomoonro/Woomoonro";

interface CloneCodingSteps {
  title: string;
  description: string;
}
export interface CloneCodingProject {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  difficulty: CLONE_CODING_STATE_TYPE;
  estimated_hours: string;
  thumbnail_url?: string;
  github_url?: string;
  demo_url?: string;
  tags: string[];
  clone_coding_steps: CloneCodingSteps[];
  clone_coding_project_structure: string;
  created_at?: string;
}

export interface UserCloneCodingProject {
  id: string;
  user_id: string;
  project_id: string;
  status: CLONE_CODING_STATE_TYPE;
  is_bookmarked: boolean;
  progress_notes?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface CloneCodingProjectGroup {
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

export interface CloneCodingProjectTodo {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  created_at: string;
}
