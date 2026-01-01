export interface Project {
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

export interface ProjectPage {
  project_page_id: number;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
  project_id: number;
}

export interface Todo {
  todo_id: number;
  todo_name: string;
  todo_content: string;
  todo_description: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: "waiting" | "in progress" | "done";
  todo_created_date: string;
  group_id?: number;
  project_id?: number;
  project_page_id?: number;
}

export interface Meeting {
  meeting_id: number;
  meeting_name: string;
  meeting_purpose: string;
  meeting_detail: string;
  meeting_summary?: string;
  meeting_created_date: string;
  project_id: number;
}

export interface MeetingMessage {
  message_id: number;
  sender: "AI" | "USER";
  message: string;
  created_at: string;
  meeting_id: number;
}

export interface ProjectPlanningLog {
  project_tasks_logs_id: number;
  project_tasks_logs_sender: "AI" | "USER";
  project_tasks_logs_message: string;
  project_tasks_logs_created_at: string;
  project_tasks_logs_meeting_index: number;
  project_id: number;
}

export interface ProjectBasicInfo {
  project_topic?: string;
  desired_features?: string;
  concepts_to_cover?: string;
  other_info?: string;
}
