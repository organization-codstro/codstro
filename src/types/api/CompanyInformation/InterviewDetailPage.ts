import { CompanyQna } from "../../common/CompanyInformation";

// ─── 회사 면접 질문 조회 ──────────────────────────────────────

export interface GetCompanyQuestionsParams {
  companyId: string;
}

export type GetCompanyQuestionsResponse = CompanyQna[];

// ─── 회사 기본 정보 조회 ──────────────────────────────────────

export interface GetCompanyInfoParams {
  companyId: string;
}

export interface GetCompanyInfoResponse {
  company_name: string;
}

// ─── 유저 면접 답변 저장 ──────────────────────────────────────

export interface SaveUserInterviewResponseParams {
  userId: string;
  questionId: string;
  questionText: string;
  userAnswer: string;
  evaluation: string;
}

export interface SaveUserInterviewResponseResponse {
  id: string;
  user_id: string;
  company_qna_id: string;
  company_qna_question: string;
  company_user_qna_answer: string;
  company_user_qna_evaluation: string;
  created_at: string;
}

// ─── 유저 면접 이력 조회 ──────────────────────────────────────

export interface GetUserInterviewHistoryParams {
  userId: string;
  companyId: string;
}

export type GetUserInterviewHistoryResponse =
  SaveUserInterviewResponseResponse[];

// ─── AI 답변 평가 ─────────────────────────────────────────────

/**
 * Edge Function evaluate-interview-answer 요청 파라미터
 * evaluateAndSave() 에서 사용
 */
export interface EvaluateInterviewAnswerParams {
  userId: string;
  question: string;
  answer: string;
  companyName: string;
  userSummary: string;
}

/** GPT가 반환하는 구조화된 평가 데이터 */
export interface EvaluationResult {
  score: number; // 1~10
  strengths: string; // 잘한 점
  improvements: string; // 개선할 점
  betterAnswer: string; // 더 나은 답변 예시
}

/** evaluateAndSave() 반환값 */
export interface EvaluationResponse {
  evaluation: EvaluationResult; // 구조화 데이터 (UI 렌더링용)
  evaluationText: string; // 포맷된 텍스트 (DB 저장된 값)
}
