/**
 * [회사 면접 질문 조회] Params
 */
export interface GetCompanyQuestionsParams {
  companyId: string;
}

/**
 * [회사 면접 질문 아이템]
 */
export interface CompanyQuestion {
  company_qna_id: string;
  company_id: string;
  company_qna_question: string;
  company_qna_created_date: string;
  [key: string]: any;
}

/**
 * [회사 면접 질문 조회] Response
 */
export type GetCompanyQuestionsResponse = CompanyQuestion[];

/**
 * [회사 기본 정보 조회] Params
 */
export interface GetCompanyInfoParams {
  companyId: string;
}

/**
 * [회사 기본 정보 조회] Response
 */
export interface GetCompanyInfoResponse {
  company_name: string;
}

/**
 * [유저 면접 답변 저장] Params
 */
export interface SaveUserInterviewResponseParams {
  userId: string;
  questionId: string;
  questionText: string;
  userAnswer: string;
  evaluation: string;
}

/**
 * [유저 면접 답변 저장] Response
 */
export interface SaveUserInterviewResponseResponse {
  company_user_qna_id: string;
  user_id: string;
  company_qna_id: string;
  company_qna_question: string;
  company_user_qna_answer: string;
  company_user_qna_evaluation: string;
  company_user_qna_create_date: string;
}

/**
 * [유저 면접 이력 조회] Params
 */
export interface GetUserInterviewHistoryParams {
  userId: string;
  companyId: string;
}

/**
 * [유저 면접 이력 조회] Response
 */
export type GetUserInterviewHistoryResponse =
  SaveUserInterviewResponseResponse[];

/**
 * [AI 면접 피드백 생성] Params
 */
export interface GenerateAiInterviewFeedbackParams {
  question: string;
  answer: string;
}

/**
 * [AI 면접 피드백 생성] Response
 */
export type GenerateAiInterviewFeedbackResponse = string;
