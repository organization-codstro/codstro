export interface CloneCodingsResponse {
  clone_coding_id: string; // PK / number
  clone_coding_title: string; // text
  clone_coding_description: string; // text
  clone_coding_tech_stack: string; // text[]
  clone_codings_tags: string; // text[]
  clone_codings_difficulty: string; // text
  clone_codings_estimated_hours: string; // text
  clone_codings_thumbnail_url: string; // text
  clone_codings_github_url: string | null; // text
  clone_codings_demo_url: string | null; // text
  clone_codings_steps: any; // json
  clone_codings_project_structure: string | null; // text
  clone_codings_created_at: Date; // date
}

export interface UserCloneCodingsResponse {
  user_clone_codings_id: string; // PK / number
  user_clone_codings_status: string; // text
  user_clone_codings_is_bookmarked: boolean; // boolean
  user_clone_codings_started_at: Date; // date
  user_clone_codings_completed_at: Date; // date
  clone_coding_id: string; // FK / number
  user_id: string; // FK / number
}

export interface ProjectTodoResponse {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  created_at: string;
}

export interface GetProjectDetailParams {
  projectId: string;
}

export interface GetUserProjectStatusParams {
  userId: string;
  projectId: string;
}

export interface ToggleBookmarkParams {
  userId: string;
  projectId: string;
  currentStatus: boolean;
}

export interface UpdateProjectStatusParams {
  userId: string;
  projectId: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface GetProjectTodosParams {
  userId: string;
  projectId: string;
}

export interface GenerateProjectGuideParams {
  projectTitle: string;
  techStack: string[];
}
