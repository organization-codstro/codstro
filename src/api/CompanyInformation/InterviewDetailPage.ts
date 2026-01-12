import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";
import {
  GetCompanyQuestionsParams,
  GetCompanyQuestionsResponse,
  GetCompanyInfoParams,
  GetCompanyInfoResponse,
  SaveUserInterviewResponseParams,
  SaveUserInterviewResponseResponse,
  GetUserInterviewHistoryParams,
  GetUserInterviewHistoryResponse,
  GenerateAiInterviewFeedbackParams,
  GenerateAiInterviewFeedbackResponse,
} from "../../types/api/CompanyInformation/InterviewDetailPage";

/**
 * [함수 역할]: 특정 회사의 면접 질문(QnA) 리스트를 가져옵니다.
 * [참조 테이블]: company_qnas
 */
export const getCompanyQuestions = async (
  params: GetCompanyQuestionsParams
): Promise<GetCompanyQuestionsResponse> => {
  try {
    const { data, error } = await supabase
      .from("company_qnas")
      .select("*")
      .eq("company_id", params.companyId)
      .order("company_qna_created_date", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 특정 회사의 기본 정보를 조회합니다. (헤더 표시용)
 * [참조 테이블]: companys
 */
export const getCompanyInfo = async (
  params: GetCompanyInfoParams
): Promise<GetCompanyInfoResponse> => {
  try {
    const { data, error } = await supabase
      .from("companys")
      .select("company_name")
      .eq("company_id", params.companyId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching company info:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저의 면접 답변과 그에 대한 AI 평가(피드백) 결과를 저장합니다.
 * [참조 테이블]: company_user_qnas
 * [설명]: 스키마 정의에 따라 질문 텍스트와 답변, 평가 내용을 함께 기록합니다.
 */
export const saveUserInterviewResponse = async (
  params: SaveUserInterviewResponseParams
): Promise<SaveUserInterviewResponseResponse> => {
  try {
    const { data, error } = await supabase
      .from("company_user_qnas")
      .insert([
        {
          user_id: params.userId,
          company_qna_id: params.questionId,
          company_qna_question: params.questionText,
          company_user_qna_answer: params.userAnswer,
          company_user_qna_evaluation: params.evaluation,
          company_user_qna_create_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving interview response:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 해당 회사의 모든 질문에 대한 유저의 이전 답변 이력을 확인합니다.
 * [참조 테이블]: company_user_qnas
 */
export const getUserInterviewHistory = async (
  params: GetUserInterviewHistoryParams
): Promise<GetUserInterviewHistoryResponse> => {
  try {
    const { data, error } = await supabase
      .from("company_user_qnas")
      .select(
        `
        *,
        company_qnas!inner(company_id)
      `
      )
      .eq("user_id", params.userId)
      .eq("company_qnas.company_id", params.companyId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching interview history:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저의 면접 답변에 대해 구체적인 피드백을 생성합니다.
 * [활용 페이지]: InterviewDetail
 */
export const generateAiInterviewFeedback = async (
  params: GenerateAiInterviewFeedbackParams
): Promise<GenerateAiInterviewFeedbackResponse> => {
  const prompt = `
    당신은 면접관입니다. 다음 질문에 대한 지원자의 답변을 평가해주세요.
    질문: ${params.question}
    답변: ${params.answer}
    
    답변의 강점과 보완점을 마크다운 형식으로 상세히 적어주세요. 
    전문적이고 격려하는 말투를 사용하세요.
  `;
  return await generateAiContent(prompt);
};
