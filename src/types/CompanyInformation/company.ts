export interface Company {
  company_id: number;
  company_name: string;
  company_industry: string;
  companie_description: string;
  company_website: string;
  company_values: string;
  company_created_date: string;
  company_update_date: string;
}

export interface CompanyMatch {
  company_user_matche_id: number;
  match_rate: number;
  company_user_matche_suggestions: string;
  company_user_matche_reason: string;
  company_user_matche_created_date: string;
  company_id: number;
  user_id: number;
}

export interface CompanyQna {
  company_qna_id: string;
  company_qna_question: string;
  company_qna_answer: string | null;
  company_qna_question_reason: string | null;
  company_qna_created_date: string;
  company_id: number;
}

export interface CompanyUserQna {
  id: number;
  user_id: number;
  company_user_qna_answer: string;
  company_qna_question: string;
  company_user_qna_evaluation: string;
  company_user_qna_create_date: string;
  company_qna_id: number;
}

export interface CompanyUserMatchRecord {
  company_user_matche_id: number;
  company_user_matche_name: string;
  match_rate: number;
  company_user_matche_suggestions: string;
  company_user_matche_reason: string;
  company_user_matche_created_date: string;
  company_id: number;
  user_id: number;
}
