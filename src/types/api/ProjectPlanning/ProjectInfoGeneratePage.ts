/**
 * [프로젝트 페이지 응답 인터페이스]
 */
export interface ProjectPageResponse {
  project_page_id: string;
  project_page_name: string;
  project_page_role: string;
  project_page_function: string;
  project_page_is_complete: boolean;
}

/**
 * [프로젝트 응답 인터페이스]
 */
export interface ProjectResponse {
  project_name?: string;
  project_topic?: string;
  project_description?: string;
  project_start_date?: string;
  project_end_date?: string;
  project_main_color?: string;
  project_style?: string;
  project_effect?: string;
}

/**
 * [할 일 응답 인터페이스]
 */
export interface TodoResponse {
  project_todo_id?: string;
  project_todo_content: string;
  project_todo_is_complete: boolean;
  project_page_id?: string;
  project_id?: string;
}

/**
 * [중간 저장 파라미터]
 */
export interface SavePlanningDraftParams {
  projectId: string;
  basicInfo: Partial<ProjectResponse>;
  pages: Array<ProjectPageResponse & { todos: TodoResponse[] }>;
  projectTodos: TodoResponse[];
}

/**
 * [프로젝트 확정 파라미터]
 */
export interface FinalizeProjectParams {
  projectId: string;
}
