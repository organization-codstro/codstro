import {
  GetBookmarkedCompaniesParams,
  GetBookmarkedCompaniesResponse,
  RemoveBookmarkParams,
  RemoveBookmarkResponse,
} from "../../types/api/CompanyInformation/BookmarksPage";
import { supabase } from "../../db/supabase/supabase";

/**
 * [BookmarksService]
 * 북마크(관심 회사) 관련 API 처리를 담당하는 서비스
 */
export const BookmarksService = {
  /**
   * [함수 역할]: 특정 유저가 북마크(관심 등록)한 회사들의 상세 목록을 가져옵니다.
   * [참조 테이블]: user_favorite_companies, companys
   * [비고]: JOIN 쿼리를 사용하여 회사 정보를 한 번에 가져옵니다.
   */
  async getBookmarkedCompanies(
    params: GetBookmarkedCompaniesParams,
  ): Promise<GetBookmarkedCompaniesResponse> {
    try {
      const { data, error } = await supabase
        .from("user_favorite_companies")
        .select(
          `
          company_id,
          companies:company_id (
            company_id,
            company_name,
            company_industry,
            company_description,
            company_website,
            company_values,
            created_at,
            updated_at
          )
        `,
        )
        .eq("user_id", params.userId);

      if (error) throw error;

      // 중첩된 객체 구조를 평탄화하여 반환
      return data.map((item: any) => item.companys);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 유저의 북마크를 해제합니다. (관계 삭제)
   * [참조 테이블]: user_favorite_companies
   */
  async removeBookmark(
    params: RemoveBookmarkParams,
  ): Promise<RemoveBookmarkResponse> {
    try {
      const { error } = await supabase
        .from("user_favorite_companies")
        .delete()
        .eq("user_id", params.userId)
        .eq("company_id", params.companyId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error removing bookmark:", error);
      throw error;
    }
  },
};
