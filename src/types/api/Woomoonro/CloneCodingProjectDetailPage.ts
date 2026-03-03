import { CLONE_CODING_STATE_TYPE } from "../../../constants/Woomoonro/woomoonro";

export interface UserCloneCodingResponse {
  user_clone_coding_id: string; // PK / number
  user_clone_coding_status: CLONE_CODING_STATE_TYPE; // text
  user_clone_coding_is_bookmarked: boolean; // boolean
  user_clone_coding_started_at: Date; // date
  user_clone_coding_completed_at: Date; // date
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
  status: string;
}

/**프로젝트 상태 업데이트할때  업데이트 할 요소 저장하는 변수의 타입*/
export interface UpdateProjectStatusData {
  user_clone_coding_status: string;
  user_clone_coding_started_at?: string;
  user_clone_coding_completed_at?: string;
}

export interface GetProjectTodosParams {
  projectId: string;
}

export interface GenerateProjectGuideParams {
  projectTitle: string;
  techStack: string[];
}
