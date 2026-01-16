/**
 * [아카이브 플랜 인터페이스]
 * API 응답 데이터와 UI 연동을 위한 타입 정의
 */
export interface ArchivedPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description: string;
  study_plan_image_url: string;
  study_plan_state: "waiting" | "in progress" | "done";
  study_plan_is_recommendation: boolean;
  study_plan_is_archived: boolean;
  study_plan_start_date: string;
  study_plan_end_date: string;
  created_at : string;
  totalNodes: number;
}

/**
 * [플랜 통계 인터페이스]
 * 각 플랜의 진행률 및 노드 완료 상태 정의
 */
export interface PlanStats {
  total: number;
  completed: number;
  progress: number;
}

