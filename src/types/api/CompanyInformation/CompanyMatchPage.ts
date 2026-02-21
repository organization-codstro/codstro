import { CompanyMatch } from "../../common/companyInformation";

/**
 * [회사 매칭 상세 조회] Params
 */
export interface GetCompanyMatchDetailParams {
  userId: string;
  companyId: string;
}

/**
 * [회사 매칭 상세 조회] Response
 */
export interface GetCompanyMatchDetailResponse {
  company_user_match_id?: string;
  user_id: string;
  company_id: string;
  match_rate: number;
  company_user_match_reason: string;
  company_user_match_suggestions: string;
  company_user_match_created_date: string;
  companys?: {
    company_name: string;
  };
  created_at: Date;
}

/**
 * [유저 전체 매칭 이력 조회] Params
 */
export interface GetAllUserMatchParams {
  userId: string;
}

/**
 * [유저 전체 매칭 이력 조회] Response
 */
export type GetAllUserMatchResponse = CompanyMatch[] | null;

/**
 * [매칭 결과 생성] Params
 */
export interface CreateMatchResultParams {
  userId: string;
  companyId: string;
  companyName: string;
  matchRate: number;
  reason: string;
  suggestions: string;
}

/**
 * [매칭 결과 생성] Response
 */
export type CreateMatchResultResponse = CompanyMatch;

/**
 * [AI 매칭 리포트 생성] Params
 */
export interface GenerateAiMatchReportParams {
  companyName: string;
  companyValues: string | null;
}

/**
 * [AI 매칭 리포트 생성] Response
 */
export type GenerateAiMatchReportResponse = string;
