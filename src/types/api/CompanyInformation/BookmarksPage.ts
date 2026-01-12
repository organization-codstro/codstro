/**
 * [북마크된 회사 목록 조회] Params
 */
export interface GetBookmarkedCompaniesParams {
  userId: number;
}

/**
 * [회사 정보]
 */
export interface Company {
  company_id: number;
  company_name: string;
  company_industry: string;
  companie_description: string;
  company_website: string | null;
  company_values: string | null;
}

/**
 * [북마크된 회사 목록 조회] Response
 */
export type GetBookmarkedCompaniesResponse = Company[];

/**
 * [북마크 삭제] Params
 */
export interface RemoveBookmarkParams {
  userId: number;
  companyId: number;
}

/**
 * [북마크 삭제] Response
 */
export type RemoveBookmarkResponse = boolean;
