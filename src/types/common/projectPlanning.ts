import {
  PROJECT_CHAT_SENDER,
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
  created_at: string;
  user_id: string;
  project_status?: PROJECT_STATUS_TYPE;
}

export interface ProjectPlanningDetail {
  project_id: string;
  project_name: string;
  project_topic: string;
  project_description: string;
  project_main_color: string;
  project_style: string;
  project_effect: string;
  project_start_date: string;
  project_end_date: string;
  project_stacks: string;
  pages: Array<ProjectPage & { todos: ProjectTodo[] }>;
}

export interface ProjectPage {
  project_page_id: string;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
  project_id: string;
  project_page_status?: PROJECT_STATUS_TYPE;
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
export interface NewProjectTodo {
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

// ProjectPage + todos 를 함께 다루는 뷰 전용 타입
export interface ProjectPageWithTodos extends ProjectPage {
  todos: ProjectTodo[];
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
  message_id?: string;
  sender: PROJECT_CHAT_SENDER;
  message: string;
  created_at?: string;
  meeting_id?: string;
}

export interface ProjectPlanningLog {
  project_meeting_log_id: string;
  project_meeting_log_sender: PROJECT_CHAT_SENDER;
  project_meeting_log_message: string;
  project_meeting_log_created_at: string;
  project_meeting_log_meeting_index: number;
  project_id: string;
}

export interface ProjectBasicInfo {
  project_name: string;
  project_topic?: string;
  desired_features?: string;
  concepts_to_cover?: string;
  other_info?: string;
}

export interface ProjectMessage {
  sender: PROJECT_CHAT_SENDER;
  message: string;
  create_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
}
