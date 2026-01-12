/**
 * [회사 상세 조회] Params
 */
export interface GetCompanyDetailParams {
  companyId: number;
}

/**
 * [회사 정보]
 */
export interface CompanyDetail {
  company_id: number;
  company_name: string;
  company_industry: string;
  companie_description: string;
  company_website: string | null;
  company_values: string | null;
  [key: string]: any;
}

/**
 * [회사 상세 조회] Response
 */
export type GetCompanyDetailResponse = CompanyDetail;

/**
 * [북마크 여부 확인] Params
 */
export interface CheckIsBookmarkedParams {
  userId: number;
  companyId: number;
}

/**
 * [북마크 여부 확인] Response
 */
export type CheckIsBookmarkedResponse = boolean;

/**
 * [북마크 추가] Params
 */
export interface AddBookmarkParams {
  userId: number;
  companyId: number;
}

/**
 * [북마크 추가] Response
 */
export type AddBookmarkResponse = boolean;

/**
 * [북마크 삭제] Params
 */
export interface DeleteBookmarkParams {
  userId: number;
  companyId: number;
}

/**
 * [북마크 삭제] Response
 */
export type DeleteBookmarkResponse = boolean;

/**
 * [북마크 토글] Params
 */
export interface ToggleBookmarkStatusParams {
  userId: number;
  companyId: number;
  currentlyBookmarked: boolean;
}

/**
 * [북마크 토글] Response
 */
export type ToggleBookmarkStatusResponse = boolean;
