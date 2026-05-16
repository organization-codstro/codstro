import { supabase } from "../../db/supabase/supabase";
import {
  GetBookmarkedProjectsParams,
  GetArchiveStatsParams,
  GetFilteredArchiveParams,
  RemoveBookmarkParams,
} from "../../types/api/CloneCodingProject/CloneCodingProjectArchivePage";
import { CloneCodingProject } from "../../types/common/CloneCodingProject";

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
        `,
        )
        .eq("user_id", params.userId)
        .eq("user_clone_coding_is_bookmarked", true);

      if (error) throw error;

      return data.map((item) => {
        const raw = item.clone_codings;

        const mappedProject: CloneCodingProject = {
          id: raw.clone_coding_id,
          title: raw.clone_coding_title,
          description: raw.clone_coding_description,
          tech_stack: raw.clone_coding_tech_stack ?? [],
          difficulty: raw.clone_coding_difficulty,
          estimated_hours: raw.clone_coding_estimated_hours,
          thumbnail_url: raw.clone_coding_thumbnail_url ?? undefined,
          github_url: raw.clone_coding_github_url ?? undefined,
          demo_url: raw.clone_coding_demo_url ?? undefined,
          tags: raw.clone_coding_tags ?? [],
          clone_coding_steps: raw.clone_coding_steps ?? [],
          clone_coding_project_structure:
            raw.clone_coding_project_structure ?? "",
          created_at: raw.created_at ?? undefined,
        };

        return {
          userProject: {
            id: item.user_clone_coding_id,
            user_id: item.user_id,
            project_id: item.clone_coding_id,
            status: item.user_clone_coding_status,
            is_bookmarked: item.user_clone_coding_is_bookmarked,
            started_at: item.user_clone_coding_started_at,
            completed_at: item.user_clone_coding_completed_at,
          },
          project: mappedProject,
        };
      });
    } catch (error) {
      console.error("[getBookmarkedProjects Error]:", error);
      throw error;
    }
  },

  async getArchiveStats(params: GetArchiveStatsParams) {
    try {
      const { data, error } = await supabase
        .from("user_clone_codings")
        .select("user_clone_coding_status")
        .eq("user_id", params.userId)
        .eq("user_clone_coding_is_bookmarked", true);

      if (error) throw error;

      const stats = {
        total: data.length,
        done: data.filter((d) => d.user_clone_coding_status === "done").length,
        "in progress": data.filter(
          (d) => d.user_clone_coding_status === "in progress",
        ).length,
        waiting: data.filter((d) => d.user_clone_coding_status === "waiting")
          .length,
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
        `,
        )
        .eq("user_id", params.userId)
        .eq("user_clone_coding_is_bookmarked", true);

      if (params.filters.status && params.filters.status !== "all") {
        query = query.eq("user_clone_coding_status", params.filters.status);
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
        .update({ user_clone_coding_is_bookmarked: false })
        .eq("user_id", params.userId)
        .eq("clone_coding_id", params.projectId);

      if (error) throw error;
    } catch (error) {
      console.error("[removeBookmark Error]:", error);
      throw error;
    }
  },
};
