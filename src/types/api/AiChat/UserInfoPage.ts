// types/api/AiChat/UserRecordService.ts

import { UserRecord } from "../../common/AiChat";

/**
 * [유저 기록 조회]
 * 특정 유저 기록 조회 파라미터
 */
export interface GetUserRecordParams {
  userId: string;
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
  recordId: string;
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
  userId: string;
  recentMessages: string[];
}

/**
 * [유저 요약 자동 생성] 응답 타입
 */
export type GenerateUserSummaryResponse = string;
