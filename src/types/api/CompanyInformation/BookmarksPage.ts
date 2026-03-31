import { Company } from "../../common/CompanyInformation";

/**
 * [북마크된 회사 목록 조회] Params
 */
export interface GetBookmarkedCompaniesParams {
  userId: string;
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
