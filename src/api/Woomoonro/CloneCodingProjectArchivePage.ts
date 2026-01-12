import { supabase } from "../../db/supabase/supabase";
import {
  CloneCodingsResponse,
  GetBookmarkedProjectsParams,
  GetArchiveStatsParams,
  GetFilteredArchiveParams,
  RemoveBookmarkParams,
} from "../../types/api/Woomoonro/CloneCodingProjectArchivePage";

/**
 * [아카이브 서비스]
 * 유저의 북마크 목록, 진행 상태 통계 및 필터링된 프로젝트 리스트를 관리합니다.
 */
export const ArchiveService = {
  async getBookmarkedProjects(params: GetBookmarkedProjectsParams) {
    try {
      const { data, error } = await supabase
        .from("user_clone_codings")
        .select(
          `
          *,
          clone_codings:clone_coding_id (*)
        `
        )
        .eq("user_id", params.userId)
        .eq("user_clone_codings_is_bookmarked", true);

      if (error) throw error;

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

  async getArchiveStats(params: GetArchiveStatsParams) {
    try {
      const { data, error } = await supabase
        .from("user_clone_codings")
        .select("user_clone_codings_status")
        .eq("user_id", params.userId)
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

  async getFilteredArchive(params: GetFilteredArchiveParams) {
    try {
      let query = supabase
        .from("user_clone_codings")
        .select(
          `
          *,
          clone_codings:clone_coding_id (*)
        `
        )
        .eq("user_id", params.userId)
        .eq("user_clone_codings_is_bookmarked", true);

      if (params.filters.status && params.filters.status !== "all") {
        query = query.eq("user_clone_codings_status", params.filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getFilteredArchive Error]:", error);
      throw error;
    }
  },

  async removeBookmark(params: RemoveBookmarkParams): Promise<void> {
    try {
      const { error } = await supabase
        .from("user_clone_codings")
        .update({ user_clone_codings_is_bookmarked: false })
        .eq("user_id", params.userId)
        .eq("clone_coding_id", params.projectId);

      if (error) throw error;
    } catch (error) {
      console.error("[removeBookmark Error]:", error);
      throw error;
    }
  },
};
