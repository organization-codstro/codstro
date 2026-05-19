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
  GenerateStudyPlanRequest,
  GenerateStudyPlanResponse,
} from "../../types/api/CompanyInformation/CompanyListPage";

/**
 * [CompanyListService]
 * 회사 목록 페이지 관련 API 처리를 담당하는 서비스
 */
export const CompanyListService = {
  /**
   * [함수 역할]: 전체 회사 리스트를 조회합니다.
   * [참조 테이블]: companys
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
   * [참조 테이블]: user_favorite_companys
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
      return data.map((item) => item.company_id);
    } catch (error) {
      console.error("Error fetching user bookmark IDs:", error);
      return [];
    }
  },

  /**
   * [함수 역할]: 특정 회사를 관심 목록에 추가(북마크 등록)합니다.
   * [참조 테이블]: user_favorite_companys
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
   * [참조 테이블]: user_favorite_companys
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

  /**
   * [함수 역할]: 회사 및 연관 데이터를 순서대로 삭제합니다.
   * [삭제 순서]
   * 1. user_favorite_companys (북마크)
   * 2. company_user_matches (매칭 정보)
   * 3. company_qnas (Q&A)
   * 4. companys (본체)
   */
  async deleteCompany(params: { companyId: string }): Promise<void> {
    const { companyId } = params;

    // 1. user_favorite_companys 삭제
    const { error: favoriteError } = await supabase
      .from("user_favorite_companys")
      .delete()
      .eq("company_id", companyId);
    if (favoriteError) throw favoriteError;

    // 2. company_user_matches 삭제
    const { error: matchError } = await supabase
      .from("company_user_matches")
      .delete()
      .eq("company_id", companyId);
    if (matchError) throw matchError;

    // 3. company_qnas 삭제
    const { error: qnaError } = await supabase
      .from("company_qnas")
      .delete()
      .eq("company_id", companyId);
    if (qnaError) throw qnaError;

    // 4. companys 본체 삭제
    const { error: companyError } = await supabase
      .from("companys")
      .delete()
      .eq("company_id", companyId);
    if (companyError) throw companyError;
  },

  async generateStudyPlan(
    request: GenerateStudyPlanRequest,
  ): Promise<GenerateStudyPlanResponse> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "company_information-generate_company_information",
        {
          body: request,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error ?? "스터디 플랜 생성에 실패했습니다.");
      }

      return data;
    } catch (error) {
      console.error("스터디 플랜 생성 실패:", error);
      throw error;
    }
  },
};
