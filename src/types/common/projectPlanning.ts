import {
  PROJECT_ROOM_TYPE,
  PROJECT_STATUS_TYPE,
} from "../../constants/ProjectPlanning/ProjectPlanning";

export interface Project {
  project_id: string;
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
  user_id: string;
  project_status?: PROJECT_STATUS_TYPE;
}

export interface ProjectPage {
  project_page_id: string;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
  project_id: string;
}

export interface ProjectTodo {
  id: string;
  field_id?: string;
  project_page_id?: string;
  name: string;
  description?: string;
  content: string;
  start_date: string;
  end_date: string;
  status: PROJECT_STATUS_TYPE;
  created_at: string;
}

//생성시 입력할 정보들
export interface newTodo {
  group_id?: string;
  project_page_id?: string;
  name: string;
  description?: string;
  content: string;
  start_date: string;
  end_date: string;
  status: PROJECT_STATUS_TYPE;
}

//생성시 임시적으로 id필요할때 사용하는 인터페이스
export interface UITodo {
  client_id: string;
  id?: string;
  project_id?: string;
  project_page_id?: string;
  name: string;
  description?: string;
  content: string;
  start_date: string;
  end_date: string;
  status: PROJECT_STATUS_TYPE;
}

export interface Meeting {
  meeting_id: string;
  meeting_name: string;
  meeting_purpose: string;
  meeting_detail: string;
  meeting_summary?: string;
  meeting_created_date: string;
  project_meeting_index: number;
  type: PROJECT_ROOM_TYPE;
  project_id: string;
}

export interface MeetingMessage {
  message_id: string;
  sender: "AI" | "USER";
  message: string;
  created_at: string;
  meeting_id: string;
}

export interface ProjectPlanningLog {
  project_tasks_logs_id: string;
  project_tasks_logs_sender: "AI" | "USER";
  project_tasks_logs_message: string;
  project_tasks_logs_created_at: string;
  project_tasks_logs_meeting_index: number;
  project_id: string;
}

export interface ProjectBasicInfo {
  project_topic?: string;
  desired_features?: string;
  concepts_to_cover?: string;
  other_info?: string;
}

export interface ProjectMessage {
  sender: "AI" | "USER";
  message: string;
  timestamp: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
}
