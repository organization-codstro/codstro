import { PROJECT_STATUS_TYPE } from "../../../constants/ProjectPlanning/ProjectPlanning";
import { TODO_STATUS_TYPE } from "../../../constants/Woomoonjeong/woomoonjeong";

export interface ProjectResponse {
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
  project_status?: PROJECT_STATUS_TYPE; // 기획중 | 진행중
}

export interface ProjectPageResponse {
  project_page_id: string;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
  project_id: string;
}

export interface TodoResponse {
  id: string;
  field_id?: string;
  project_page_id?: string;
  name: string;
  description?: string;
  content: string;
  start_date: string;
  end_date: string;
  status: TODO_STATUS_TYPE;
  created_at: string;
}
