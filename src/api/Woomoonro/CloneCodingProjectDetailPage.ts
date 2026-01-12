import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";
import {
  CloneCodingsResponse,
  ProjectTodoResponse,
  UserCloneCodingsResponse,
  GetProjectDetailParams,
  GetUserProjectStatusParams,
  ToggleBookmarkParams,
  UpdateProjectStatusParams,
  GetProjectTodosParams,
  GenerateProjectGuideParams,
} from "../../types/api/Woomoonro/CloneCodingProjectDetailPage";

export const CloneCodingService = {
  async getProjectDetail(
    params: GetProjectDetailParams
  ): Promise<CloneCodingsResponse | null> {
    const { data, error } = await supabase
      .from("clone_codings")
      .select("*")
      .eq("clone_coding_id", params.projectId)
      .single();

    if (error) {
      console.error("[getProjectDetail Error]:", error.message);
      throw error;
    }
    return data;
  },

  async getUserProjectStatus(
    params: GetUserProjectStatusParams
  ): Promise<UserCloneCodingsResponse | null> {
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

  async toggleBookmark(params: ToggleBookmarkParams): Promise<void> {
    const { error } = await supabase.from("user_clone_codings").upsert(
      {
        user_id: params.userId,
        clone_coding_id: params.projectId,
        user_clone_codings_is_bookmarked: !params.currentStatus,
      },
      { onConflict: "user_id, clone_coding_id" }
    );

    if (error) throw error;
  },

  async updateProjectStatus(params: UpdateProjectStatusParams): Promise<void> {
    const updateData: any = {
      user_clone_codings_status: params.status,
    };

    if (params.status === "in_progress")
      updateData.user_clone_codings_started_at = new Date().toISOString();
    if (params.status === "completed")
      updateData.user_clone_codings_completed_at = new Date().toISOString();

    const { error } = await supabase.from("user_clone_codings").upsert(
      {
        user_id: params.userId,
        clone_coding_id: params.projectId,
        ...updateData,
      },
      { onConflict: "user_id, clone_coding_id" }
    );

    if (error) throw error;
  },

  async getProjectTodos(
    params: GetProjectTodosParams
  ): Promise<ProjectTodoResponse[]> {
    const { data, error } = await supabase
      .from("project_todos")
      .select("*")
      .eq("user_id", params.userId)
      .eq("clone_coding_id", params.projectId);

    if (error) throw error;
    return data || [];
  },

  async generateProjectGuide(
    params: GenerateProjectGuideParams
  ): Promise<string> {
    const prompt = `프로젝트 "${
      params.projectTitle
    }"을(를) ${params.techStack.join(", ")}로 구현하려고 합니다. 
    이 프로젝트에서 가장 중요하게 배워야 할 핵심 포인트 3가지를 요약해줘.`;

    return await generateAiContent(prompt);
  },
};
