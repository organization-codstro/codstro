// types/api/AiChat/UserRecordService.ts

/**
 * [유저 기록 조회]
 * 특정 유저 기록 조회 파라미터
 */
export interface GetUserRecordParams {
  userId: number;
}

/**
 * ai_user_records 테이블 엔티티
 */
export interface UserRecord {
  ai_user_record_id: number;
  user_id: number;
  ai_user_record_summary: string;
  ai_user_record_created_date: string;
}

/**
 * [유저 기록 조회] 응답 타입
 */
export type GetUserRecordResponse = UserRecord;

/**
 * [유저 기록 업데이트]
 * 유저 기록 업데이트 파라미터
 */
export interface UpdateUserRecordParams {
  recordId: number;
  summary: string;
}

/**
 * [유저 기록 업데이트] 응답 타입
 */
export type UpdateUserRecordResponse = UserRecord;

/**
 * [유저 요약 자동 생성]
 * AI 요약 생성 파라미터
 */
export interface GenerateUserSummaryParams {
  userId: number;
  recentMessages: string[];
}

/**
 * [유저 요약 자동 생성] 응답 타입
 */
export type GenerateUserSummaryResponse = string;
