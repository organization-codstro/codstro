//회사 기본정보
export interface Company {
  company_id: string;
  company_name: string;
  company_industry: string;
  company_description: string;
  company_website: string | null;
  company_values: string | null;
  created_at: string;
}

export type FavoriteCompanyRow = {
  user_favorite_company_id: string;
  companies: Company[];
};

//회사 매칭정보
export interface CompanyMatch {
  company_user_match_id: string;
  company_user_match_name: string;
  company_user_match_rate: number;
  company_user_match_suggestions: string;
  company_user_match_reason: string;
  company_id: string;
  user_id: string;
  created_at: string | null;
}

//회사 질문
export interface CompanyQna {
  company_qna_id: string;
  company_qna_question: string;
  company_qna_answer: string | null;
  company_qna_question_reason: string | null;
  company_qna_created_date: string;
  company_id: string;
}

//회사 질문의 사용자의 답변
export interface CompanyUserQna {
  id: string;
  user_id: string;
  company_user_qna_answer: string;
  company_qna_question: string;
  company_user_qna_evaluation: string;
  company_user_qna_create_date: string;
  company_qna_id: string;
}

//회사 인터뷰 타입
export interface CompanyInterview {
  id: string;
  company_qna_question: string | null;
  company_user_qna_answer: string | null;
  company_user_qna_evaluation: string | null;
  created_at: string;
}

//회사 매칭정보의 사용자의 답변
export interface CompanyUserMatchRecord {
  company_user_match_id: string;
  company_user_match_name: string;
  company_user_match_rate: number;
  company_user_match_suggestions: string;
  company_user_match_reason: string;
  company_user_match_created_date: string;
  company_id: string;
  user_id: string;
}

//회사 AI 채팅
export interface CompanyInformationAIChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}
