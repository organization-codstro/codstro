// ===========================
// StudyPlanMainService 타입 파일
// ===========================

import { PlanStatsResult, StudyPlan } from "../../common/StudyPlan";

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

/**
 * [generateStudyPlan]
 * 공부계획 ai생성
 */
export interface GenerateStudyPlanParams {
  userId: string;
  name: string;
  description: string;
  goal: string;
  currentLevel?: string;
  maxHours?: number;
  learningStyle: string;
  expectedOutput: string;
  startDate: string;
  endDate: string;
  techStacks: string[];
}
