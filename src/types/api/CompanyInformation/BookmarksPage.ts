/**
 * [북마크된 회사 목록 조회] Params
 */
export interface GetBookmarkedCompaniesParams {
  userId: string;
}

/**
 * [회사 정보]
 */
export interface Company {
  company_id: string;
  company_name: string;
  company_industry: string;
  company_description: string;
  company_website: string | null;
  company_values: string | null;
  company_created_at: string;
  company_update_at: string;
}

/**
 * [북마크된 회사 목록 조회] Response
 */
export type GetBookmarkedCompaniesResponse = Company[];

/**
 * [북마크 삭제] Params
 */
export interface RemoveBookmarkParams {
  userId: string;
  companyId: string;
}

/**
 * [북마크 삭제] Response
 */
export type RemoveBookmarkResponse = boolean;
