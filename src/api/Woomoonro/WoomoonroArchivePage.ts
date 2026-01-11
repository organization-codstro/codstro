import { supabase } from "../../db/supabase/supabase";
import { CloneCodingsResponse } from "../../types/api/Woomoonro/WoomoonroArchivePage";

/**
 * [아카이브 서비스]
 * 유저의 북마크 목록, 진행 상태 통계 및 필터링된 프로젝트 리스트를 관리합니다.
 */
export const ArchiveService = {
  /**
   * [북마크된 프로젝트 리스트 조회]
   * 특정 유저가 북마크(is_bookmarked: true)한 프로젝트들만 가져옵니다.
   * 이때, 'clone_codings' 테이블과 JOIN하여 프로젝트의 상세 정보를 함께 가져옵니다.
   * 참조 테이블: user_clone_codings, clone_codings
   */
  async getBookmarkedProjects(userId: number) {
    try {
      const { data, error } = await supabase
        .from("user_clone_codings")
        .select(
          `
          *,
          clone_codings:clone_coding_id (*)
        `
        )
        .eq("user_id", userId)
        .eq("user_clone_codings_is_bookmarked", true);

      if (error) throw error;

      // 조인된 데이터를 클라이언트에서 쓰기 편한 형태로 매핑
      return data.map((item) => ({
        userProject: {
          id: item.user_clone_codings_id,
          user_id: item.user_id,
          project_id: item.clone_coding_id,
          status: item.user_clone_codings_status,
          is_bookmarked: item.user_clone_codings_is_bookmarked,
          started_at: item.user_clone_codings_started_at,
          completed_at: item.user_clone_codings_completed_at,
        },
        project: item.clone_codings as unknown as CloneCodingsResponse,
      }));
    } catch (error) {
      console.error("[getBookmarkedProjects Error]:", error);
      throw error;
    }
  },

  /**
   * [아카이브 통계 데이터 조회]
   * 유저의 북마크된 프로젝트들을 상태별(전체, 완료, 진행중, 시작전)로 카운트합니다.
   * StatCard 컴포넌트에 뿌려줄 데이터를 생성합니다.
   * 참조 테이블: user_clone_codings
   */
  async getArchiveStats(userId: number) {
    try {
      const { data, error } = await supabase
        .from("user_clone_codings")
        .select("user_clone_codings_status")
        .eq("user_id", userId)
        .eq("user_clone_codings_is_bookmarked", true);

      if (error) throw error;

      const stats = {
        total: data.length,
        completed: data.filter(
          (d) => d.user_clone_codings_status === "completed"
        ).length,
        in_progress: data.filter(
          (d) => d.user_clone_codings_status === "in_progress"
        ).length,
        not_started: data.filter(
          (d) => d.user_clone_codings_status === "not_started"
        ).length,
      };

      return stats;
    } catch (error) {
      console.error("[getArchiveStats Error]:", error);
      throw error;
    }
  },

  /**
   * [아카이브 내 검색 및 필터링]
   * 사용자가 입력한 검색어, 난이도, 상태 필터를 적용하여 서버 사이드에서 데이터를 가져옵니다.
   * (참고: 데이터 양이 적을 경우 getBookmarkedProjects 결과로 클라이언트 사이드 필터링을 권장하지만,
   * 확장성을 위해 Supabase 쿼리 예시를 작성합니다.)
   */
  async getFilteredArchive(
    userId: number,
    filters: {
      status?: string;
      difficulty?: string;
      searchQuery?: string;
    }
  ) {
    try {
      let query = supabase
        .from("user_clone_codings")
        .select(
          `
          *,
          clone_codings:clone_coding_id (*)
        `
        )
        .eq("user_id", userId)
        .eq("user_clone_codings_is_bookmarked", true);

      // 상태 필터 (all이 아닐 경우)
      if (filters.status && filters.status !== "all") {
        query = query.eq("user_clone_codings_status", filters.status);
      }

      // 난이도 및 제목 검색은 JOIN된 테이블 기반이므로
      // 데이터가 많지 않다면 getBookmarkedProjects 호출 후 클라이언트에서 filter하는 것이 성능상 유리할 수 있습니다.
      // 만약 DB 레벨에서 처리하려면 .innerJoin 등을 고려해야 합니다.

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getFilteredArchive Error]:", error);
      throw error;
    }
  },

  /**
   * [북마크 취소]
   * 아카이브 리스트에서 북마크 버튼 클릭 시 호출됩니다.
   * 참조 테이블: user_clone_codings
   */
  async removeBookmark(userId: number, projectId: number): Promise<void> {
    try {
      const { error } = await supabase
        .from("user_clone_codings")
        .update({ user_clone_codings_is_bookmarked: false })
        .eq("user_id", userId)
        .eq("clone_coding_id", projectId);

      if (error) throw error;
    } catch (error) {
      console.error("[removeBookmark Error]:", error);
      throw error;
    }
  },
};
