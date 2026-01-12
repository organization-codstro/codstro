/**
 * [회사 목록 아이템]
 */
export interface CompanyListItem {
  company_id: number;
  company_name: string;
  company_industry: string;
  companie_description: string;
  company_values: string | null;
  company_website: string | null;
  company_update_date: string;
}

/**
 * [회사 리스트 조회] Response
 */
export type GetCompanyListResponse = CompanyListItem[];

/**
 * [유저 북마크 ID 조회] Params
 */
export interface GetUserBookmarkedIdsParams {
  userId: number;
}

/**
 * [유저 북마크 ID 조회] Response
 */
export type GetUserBookmarkedIdsResponse = number[];

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
 * [북마크 제거] Params
 */
export interface RemoveBookmarkParams {
  userId: number;
  companyId: number;
}

/**
 * [북마크 제거] Response
 */
export type RemoveBookmarkResponse = boolean;

/**
 * [북마크 토글] Params
 */
export interface ToggleBookmarkInDBParams {
  userId: number;
  companyId: number;
  isCurrentlyBookmarked: boolean;
}

/**
 * [북마크 토글] Response
 */
export type ToggleBookmarkInDBResponse = boolean;
