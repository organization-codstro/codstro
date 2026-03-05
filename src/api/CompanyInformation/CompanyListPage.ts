import { supabase } from "../../db/supabase/supabase";
import {
  GetCompanyListResponse,
  GetUserBookmarkedIdsParams,
  GetUserBookmarkedIdsResponse,
  AddBookmarkParams,
  AddBookmarkResponse,
  RemoveBookmarkParams,
  RemoveBookmarkResponse,
  ToggleBookmarkInDBParams,
  ToggleBookmarkInDBResponse,
} from "../../types/api/CompanyInformation/CompanyListPage";

/**
 * [CompanyListService]
 * 회사 목록 페이지 관련 API 처리를 담당하는 서비스
 */
export const CompanyListService = {
  /**
   * [함수 역할]: 전체 회사 리스트를 조회합니다.
   * [참조 테이블]: companies
   * [설명]: 목록 화면에 필요한 기본 정보들을 최신 업데이트 순으로 가져옵니다.
   */
  async getCompanyList(): Promise<GetCompanyListResponse> {
    try {
      const { data, error } = await supabase
        .from("companys")
        .select(
          "company_id, company_name, company_industry, company_description, company_values, company_website, created_at",
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching company list:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 로그인한 유저의 전체 북마크(관심 회사) ID 목록을 조회합니다.
   * [참조 테이블]: user_favorite_companies
   * [설명]: 리스트에서 각 카드의 북마크 활성화 여부(isBookmarked)를 판단하기 위해 사용합니다.
   */
  async getUserBookmarkedIds(
    params: GetUserBookmarkedIdsParams,
  ): Promise<GetUserBookmarkedIdsResponse> {
    try {
      const { data, error } = await supabase
        .from("user_favorite_companys")
        .select("company_id")
        .eq("user_id", params.userId);

      if (error) throw error;
      // id 배열 형태로 변환하여 반환
      return data.map((item) => item.company_id);
    } catch (error) {
      console.error("Error fetching user bookmark IDs:", error);
      return [];
    }
  },

  /**
   * [함수 역할]: 특정 회사를 관심 목록에 추가(북마크 등록)합니다.
   * [참조 테이블]: user_favorite_companies
   */
  async addBookmark(params: AddBookmarkParams): Promise<AddBookmarkResponse> {
    try {
      const { error } = await supabase.from("user_favorite_companys").insert([
        {
          user_id: params.userId,
          company_id: params.companyId,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error adding bookmark:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 특정 회사를 관심 목록에서 제거(북마크 해제)합니다.
   * [참조 테이블]: user_favorite_companies
   */
  async removeBookmark(
    params: RemoveBookmarkParams,
  ): Promise<RemoveBookmarkResponse> {
    try {
      const { error } = await supabase
        .from("user_favorite_companys")
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

  /**
   * [함수 역할]: 현재 상태에 따라 북마크를 추가하거나 삭제합니다. (Toggle 기능)
   * [비고]: UI의 toggleBookmark 핸들러 내에서 호출하여 DB와 상태를 동기화합니다.
   */
  async toggleBookmarkInDB(
    params: ToggleBookmarkInDBParams,
  ): Promise<ToggleBookmarkInDBResponse> {
    if (params.isCurrentlyBookmarked) {
      return await this.removeBookmark({
        userId: params.userId,
        companyId: params.companyId,
      });
    } else {
      return await this.addBookmark({
        userId: params.userId,
        companyId: params.companyId,
      });
    }
  },
};
