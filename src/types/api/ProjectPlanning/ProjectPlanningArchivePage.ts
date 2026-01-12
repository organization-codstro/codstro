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

/**
 * [아카이브된 프로젝트 목록 조회 파라미터]
 */
export interface GetArchivedProjectsParams {
  userId: number;
}

/**
 * [프로젝트 복구 또는 기간 연장 파라미터]
 */
export interface ExtendProjectPeriodParams {
  projectId: number;
  newEndDate: string;
}
