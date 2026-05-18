import { supabase } from "../../db/supabase/supabase";
import {
  CloneCodingWithUserStatus,
  GenerateCloneCodingParams,
  GetAllProjectsWithUserStatusParams,
  GetFilteredProjectsParams,
  ToggleBookmarkParams,
} from "../../types/api/CloneCodingProject/CloneCodingProjectMainPage";

/**
 * [메인 프로젝트 서비스]
 * 메인 페이지에 표시될 전체 프로젝트 목록과 유저별 상태 정보를 관리합니다.
 */
export const CloneCodingProjectMainPageService = {
  /**
   * [전체 프로젝트 및 유저 진행 데이터 로드]
   * 모든 클론코딩 프로젝트를 가져오고, 로그인한 유저의 해당 프로젝트 진행 상태를 함께 가져옵니다.
   * 테이블 구조에 맞춰 'clone_codings'를 기준으로 'user_clone_codings'를 Left Join 합니다.
   * 참조 테이블: clone_codings, user_clone_codings
   */
  async getAllProjectsWithUserStatus(
    params: GetAllProjectsWithUserStatusParams,
  ) {
    try {
      // Supabase에서 관계를 활용하여 한 번의 호출로 조인된 데이터를 가져옵니다.
      const { data, error } = await supabase
        .from("clone_codings")
        .select(
          `
          *,
          user_status:user_clone_codings (
            user_clone_coding_id,
            user_clone_coding_status,
            user_clone_coding_is_bookmarked,
            user_id
          )
        `,
        )
        // 특정 유저의 데이터만 조인 필터링
        .eq("user_status.user_id", params.userId);

      if (error) throw error;

      // 클라이언트에서 사용하기 편하도록 데이터 정제
      return (data as CloneCodingWithUserStatus[]).map((project) => {
        const userProject =
          project.user_status && project.user_status.length > 0
            ? project.user_status[0]
            : null;

        return {
          ...project,
          user_project: userProject,
        };
      });
    } catch (error) {
      console.error("[getAllProjectsWithUserStatus Error]:", error);
      throw error;
    }
  },

  /**
   * [필터링된 프로젝트 목록 조회 (Server-side)]
   * 검색어, 난이도, 진행 상태에 따라 서버에서 필터링된 결과를 가져옵니다.
   * 참조 테이블: clone_codings, user_clone_codings
   */
  async getFilteredProjects(params: GetFilteredProjectsParams) {
    try {
      let query = supabase
        .from("clone_codings")
        .select(
          `
          *,
          user_status:user_clone_codings!inner (
            user_clone_coding_id,
            user_clone_coding_status,
            user_clone_coding_is_bookmarked,
            user_id
          )
        `,
        )
        .eq("user_status.user_id", params.userId);

      // 1. 진행 상태 필터 (bookmarked, in progress, completed)
      if (params.params.selectedFilter === "bookmarked") {
        query = query.eq("user_status.user_clone_coding_is_bookmarked", true);
      } else if (params.params.selectedFilter !== "all") {
        query = query.eq(
          "user_status.user_clone_codings_status",
          params.params.selectedFilter,
        );
      }

      // 2. 난이도 필터
      if (params.params.selectedDifficulty !== "all") {
        query = query.eq(
          "clone_codings_difficulty",
          params.params.selectedDifficulty,
        );
      }

      // 3. 제목 검색
      if (params.params.searchQuery) {
        query = query.ilike(
          "clone_coding_title",
          `%${params.params.searchQuery}%`,
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getFilteredProjects Error]:", error);
      throw error;
    }
  },

  /**
   * [메인 페이지 북마크 토글]
   * 유저 프로젝트 기록이 없으면 생성, 있으면 북마크 상태만 업데이트합니다.
   * 참조 테이블: user_clone_codings
   */
  async toggleBookmark(params: ToggleBookmarkParams): Promise<void> {
    try {
      const { error } = await supabase
        .from("user_clone_codings")
        .update({
          user_clone_coding_is_bookmarked: !params.isBookmarked,
        })
        .eq("user_id", params.userId)
        .eq("clone_coding_id", params.projectId);

      if (error) throw error;
    } catch (error) {
      console.error("[Main toggleBookmark Error]:", error);
      throw error;
    }
  },

  /**
   * clone_coding-generate Edge Function 호출
   * GPT가 클론코딩 프로젝트를 생성하고 DB에 저장합니다.
   */
  async generateCloneCoding(params: GenerateCloneCodingParams) {
    const { data, error } = await supabase.functions.invoke(
      "clone_coding-generate",
      { body: params },
    );

    if (error) throw new Error(error.message);
    if (!data.success) throw new Error(data.error ?? "생성에 실패했습니다.");

    return data.data;
  },
};
