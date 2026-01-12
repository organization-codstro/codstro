/**
 * [회사 매칭 상세 조회] Params
 */
export interface GetCompanyMatchDetailParams {
  userId: number;
  companyId: number;
}

/**
 * [회사 매칭 상세 조회] Response
 */
export interface GetCompanyMatchDetailResponse {
  company_user_matche_id?: number;
  user_id: number;
  company_id: number;
  match_rate: number;
  company_user_matche_reason: string;
  company_user_matche_suggestions: string;
  company_user_matche_created_date: string;
  companys?: {
    company_name: string;
  };
}

/**
 * [유저 전체 매칭 이력 조회] Params
 */
export interface GetAllUserMatchesParams {
  userId: number;
}

/**
 * [유저 전체 매칭 이력 아이템]
 */
export interface UserMatchItem {
  company_user_matche_id: number;
  match_rate: number;
  company_user_matche_created_date: string;
  company_id: number;
  companys: {
    company_name: string;
    company_industry: string;
  }[];
}

/**
 * [유저 전체 매칭 이력 조회] Response
 */
export type GetAllUserMatchesResponse = UserMatchItem[] | null;

/**
 * [매칭 결과 생성] Params
 */
export interface CreateMatchResultParams {
  userId: number;
  companyId: number;
  companyName: string;
  matchRate: number;
  reason: string;
  suggestions: string;
}

/**
 * [매칭 결과 생성] Response
 */
export type CreateMatchResultResponse = UserMatchItem;

/**
 * [AI 매칭 리포트 생성] Params
 */
export interface GenerateAiMatchReportParams {
  companyName: string;
  companyValues: string;
  userMajor: string;
}

/**
 * [AI 매칭 리포트 생성] Response
 */
export type GenerateAiMatchReportResponse = string;
