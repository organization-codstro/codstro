import { Company } from "../../common/CompanyInformation";

/**
 * [회사 상세 조회] Params
 */
export interface GetCompanyDetailParams {
  companyId: string;
}

/**
 * [회사 상세 조회] Response
 */
export type GetCompanyDetailResponse = Company;

/**
 * [북마크 여부 확인] Params
 */
export interface CheckIsBookmarkedParams {
  userId: string;
  companyId: string;
}

/**
 * [북마크 여부 확인] Response
 */
export type CheckIsBookmarkedResponse = boolean;

/**
 * [북마크 추가] Params
 */
export interface AddBookmarkParams {
  userId: string;
  companyId: string;
}

/**
 * [북마크 추가] Response
 */
export type AddBookmarkResponse = boolean;

/**
 * [북마크 삭제] Params
 */
export interface DeleteBookmarkParams {
  userId: string;
  companyId: string;
}

/**
 * [북마크 삭제] Response
 */
export type DeleteBookmarkResponse = boolean;

/**
 * [북마크 토글] Params
 */
export interface ToggleBookmarkStatusParams {
  userId: string;
  companyId: string;
  currentlyBookmarked: boolean;
}

/**
 * [북마크 토글] Response
 */
export type ToggleBookmarkStatusResponse = boolean;

export interface MatchResult {
  matchRate: number;
  matchSummary: string;
  matchReason: string;
  matchSuggestions: string;
}

export interface InterviewQuestion {
  company_qna_id: string;
  company_qna_question: string;
  company_qna_question_reason: string;
}

/**
 * [AI 매칭 분석] Params
 */
export interface AnalyzeCompanyMatchParams {
  userId: string;
  companyId: string;
  companyName: string;
  companyValues: string;
  companyDescription: string;
  companyIndustry: string;
  userSummary: string;
}

/**
 * [기존 매칭 결과 조회] Params
 */
export interface GetExistingMatchResultParams {
  userId: string;
  companyId: string;
}

/**
 * [기존 매칭 결과 조회] Response
 */
export interface GetExistingMatchResultResponse {
  company_user_match_rate: number;
  company_user_match_reason: string;
  company_user_match_suggestions: string;
  created_at: string;
}

/**
 * [AI 면접 질문 생성] Params
 */
export interface GenerateInterviewQuestionsParams {
  userId: string;
  companyId: string;
  companyName: string;
  companyValues: string;
  companyDescription: string;
  companyIndustry: string;
  userSummary: string;
}

/**
 * 답변 평가 + DB 저장
 */
export interface EvaluateInterviewAnswerParams {
  userId: string;
  companyQnaId: string;
  question: string;
  answer: string;
  companyName: string;
  userSummary: string;
}
