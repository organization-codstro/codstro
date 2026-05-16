import { supabase } from "../../db/supabase/supabase";
import {
  UserCloneCodingResponse,
  GetProjectDetailParams,
  GetUserProjectStatusParams,
  ToggleBookmarkParams,
  UpdateProjectStatusParams,
  UpdateProjectStatusData,
} from "../../types/api/CloneCodingProject/CloneCodingProjectDetailPage";
import { CloneCodingProject } from "../../types/common/CloneCodingProject";

export const CloneCodingService = {
  async getProjectDetail(
    params: GetProjectDetailParams,
  ): Promise<CloneCodingProject | null> {
    const { data, error } = await supabase
      .from("clone_codings")
      .select("*")
      .eq("clone_coding_id", params.projectId)
      .single();

    if (error) {
      console.error("[getProjectDetail Error]:", error.message);
      throw error;
    }

    const mapped: CloneCodingProject = {
      id: data.clone_coding_id,
      title: data.clone_coding_title,
      description: data.clone_coding_description,
      tech_stack: data.clone_coding_tech_stack,
      difficulty: data.clone_coding_difficulty,
      estimated_hours: data.clone_coding_estimated_hours,
      thumbnail_url: data.clone_coding_thumbnail_url ?? undefined,
      github_url: data.clone_coding_github_url ?? undefined,
      demo_url: data.clone_coding_demo_url ?? undefined,
      tags: data.clone_coding_tags,
      clone_coding_steps: data.clone_coding_steps,
      clone_coding_project_structure: data.clone_coding_project_structure ?? "",
      created_at: data.created_at ?? undefined,
    };

    return mapped;
  },

  async getUserProjectStatus(
    params: GetUserProjectStatusParams,
  ): Promise<UserCloneCodingResponse | null> {
    const { data, error } = await supabase
      .from("user_clone_codings")
      .select("*")
      .eq("user_id", params.userId)
      .eq("clone_coding_id", params.projectId)
      .maybeSingle();

    if (error) {
      console.error("[getUserProjectStatus Error]:", error.message);
      throw error;
    }
    return data;
  },

  /**
   * 사용자의 특정 클론코딩 프로젝트 북마크 상태를 토글한다.
   *
   * 이미 북마크가 되어 있으면 해제하고,
   * 북마크가 되어 있지 않으면 새로 추가한다.
   *
   * 해당 사용자-프로젝트 관계가 존재하지 않으면 새로 생성하며,
   * 존재하면 북마크 상태만 갱신한다.
   */
  async toggleBookmark(params: ToggleBookmarkParams): Promise<void> {
    const { error } = await supabase
      .from("user_clone_codings")
      .update({
        user_clone_coding_is_bookmarked: !params.currentStatus,
      })
      .eq("user_id", params.userId)
      .eq("clone_coding_id", params.projectId);

    if (error) throw error;
  },

  /**
   * 사용자의 클론코딩 프로젝트 진행 상태를 변경한다.
   *
   * 상태 값에 따라 시작 시간(started_at) 또는
   * 완료 시간(completed_at)을 자동으로 기록한다.
   *
   * 해당 사용자-프로젝트 관계가 존재하지 않으면 새로 생성하며,
   * 존재하면 진행 상태 및 관련 시간을 갱신한다.
   */
  async updateProjectStatus(params: UpdateProjectStatusParams): Promise<void> {
    const updateData: UpdateProjectStatusData = {
      user_clone_coding_status: params.status,
    };

    if (params.status === "in progress")
      updateData.user_clone_coding_started_at = new Date().toISOString();
    if (params.status === "completed")
      updateData.user_clone_coding_completed_at = new Date().toISOString();

    const { error } = await supabase.from("user_clone_codings").upsert(
      {
        user_id: params.userId,
        clone_coding_id: params.projectId,
        ...updateData,
      },
      { onConflict: "user_id, clone_coding_id" },
    );

    if (error) throw error;
  },

  //해당하는 클론코딩의 정보를 가지고 오는 함수
  // async getProjectTodos(
  //   params: GetProjectTodosParams,
  // ): Promise<ProjectTodoResponse[]> {
  //   const { data, error } = await supabase
  //     .from("project_pages")
  //     .select("*")
  //     .eq("clone_coding_id", params.projectId);

  //   if (error) throw error;
  //   return data || [];
  // },
};
