export interface ProjectResponse {
  project_id: number;
  project_name: string;
  project_description?: string;
  project_topic: string;
  project_stacks: string;
  project_start_date: string;
  project_end_date: string;
  project_main_color: string;
  project_style: string;
  project_effect: string;
  project_created_date: string;
  user_id: number;
  project_status?: "planning" | "active"; // 기획중 | 진행중
}


export interface ProjectPageResponse {
  project_page_id: number;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
  project_id: number;
}

export interface TodoResponse {
  id: number;
  field_id?: number;
  project_page_id?: number;
  name: string;
  description?: string;
  content: string;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
}