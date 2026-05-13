import { Company } from "../../common/CompanyInformation";

/**
 * [회사 리스트 조회] Response
 */
export type GetCompanyListResponse = Company[];

/**
 * [유저 북마크 ID 조회] Params
 */
export interface GetUserBookmarkedIdsParams {
  userId: string;
}

/**
 * [유저 북마크 ID 조회] Response
 */
export type GetUserBookmarkedIdsResponse = string[];

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
 * [북마크 제거] Params
 */
export interface RemoveBookmarkParams {
  userId: string;
  companyId: string;
}

/**
 * [북마크 제거] Response
 */
export type RemoveBookmarkResponse = boolean;

/**
 * [북마크 토글] Params
 */
export interface ToggleBookmarkInDBParams {
  userId: string;
  companyId: string;
  isCurrentlyBookmarked: boolean;
}

/**
 * [북마크 토글] Response
 */
export type ToggleBookmarkInDBResponse = boolean;

/**
 *  최사정보 생성 함수 - 타입 정의
 */
export interface GenerateStudyPlanRequest {
  userId: string;
  companyName: string;
  jobField: string;
  recruitmentType: "신입" | "인턴" | "경력";
  officialLink?: string;
}

export interface CompanyData {
  company_id?: string;
  user_id: string;
  company_name: string;
  company_industry: string;
  company_description: string;
  company_website?: string;
  company_values: string;
  created_at?: string;
  updated_at?: string;
}

export interface GenerateStudyPlanResponse {
  success: boolean;
  data?: CompanyData;
  error?: string;
  message?: string;
}
