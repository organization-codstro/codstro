// ===========================
// WoomoonkyungMainService 타입 파일
// ===========================

import { PlanStatsResult, StudyPlan } from "../../common/Woomoonkyung";

/**
 * [GetActiveMyPlansParams]
 * 진행 중인 내 학습 계획 목록 조회 파라미터
 */
export interface GetActiveMyPlansParams {
  userId: string;
}

/**
 * [DeletePlanParams]
 * 계획 삭제 파라미터
 */
export interface DeletePlanParams {
  planId: string;
}

/**
 * [GetPlanStatsParams]
 * 계획별 상세 통계 조회 파라미터
 */
export interface GetPlanStatsParams {
  planId: string;
}

/**
 * [PlanWithStats]
 * 진행 중인 학습 계획과 통계 정보 포함
 */
export interface PlanWithStats extends StudyPlan {
  [key: string]: any;
  stats: PlanStatsResult;
}
