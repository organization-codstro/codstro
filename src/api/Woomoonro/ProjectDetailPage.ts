import { supabase } from "../../db/supabase/supabase";
import { CloneCodings, UserCloneCodings } from "../../types/db/supabase/table";
import { ProjectTodo } from "../../types/pages/Woomoonro/woomoonro";
import { generateAiContent } from "../Gemini/Gemini";

export const CloneCodingService = {
  /**
   * [프로젝트 상세 정보 조회]
   * clone_coding_id를 기준으로 프로젝트의 모든 메타데이터를 가져옵니다.
   * 참조 테이블: clone_codings
   */
  async getProjectDetail(projectId: number): Promise<CloneCodings | null> {
    const { data, error } = await supabase
      .from("clone_codings")
      .select("*")
      .eq("clone_coding_id", projectId)
      .single();

    if (error) {
      console.error("[getProjectDetail Error]:", error.message);
      throw error;
    }
    return data;
  },

  /**
   * [유저별 프로젝트 상태 및 북마크 정보 조회]
   * 특정 유저가 해당 프로젝트를 진행 중인지, 북마크 했는지 정보를 가져옵니다.
   * 참조 테이블: user_clone_codings
   */
  async getUserProjectStatus(userId: number, projectId: number): Promise<UserCloneCodings | null> {
    const { data, error } = await supabase
      .from("user_clone_codings")
      .select("*")
      .eq("user_id", userId)
      .eq("clone_coding_id", projectId)
      .maybeSingle(); // 데이터가 없을 수 있으므로 maybeSingle 사용

    if (error) {
      console.error("[getUserProjectStatus Error]:", error.message);
      throw error;
    }
    return data;
  },

  /**
   * [북마크 상태 토글]
   * 북마크 여부를 반전시킵니다. 데이터가 없으면 새로 생성(upsert)합니다.
   * 참조 테이블: user_clone_codings
   */
  async toggleBookmark(userId: number, projectId: number, currentStatus: boolean): Promise<void> {
    const { error } = await supabase
      .from("user_clone_codings")
      .upsert({
        user_id: userId,
        clone_coding_id: projectId,
        user_clone_codings_is_bookmarked: !currentStatus,
      }, { onConflict: 'user_id, clone_coding_id' });

    if (error) throw error;
  },

  /**
   * [프로젝트 진행 상태 업데이트]
   * 프로젝트의 상태(시작전, 진행중, 완료)를 변경합니다.
   * 참조 테이블: user_clone_codings
   */
  async updateProjectStatus(
    userId: number, 
    projectId: number, 
    status: 'not_started' | 'in_progress' | 'completed'
  ): Promise<void> {
    const updateData: any = {
      user_clone_codings_status: status,
    };

    // 상태에 따른 날짜 자동 기록
    if (status === 'in_progress') updateData.user_clone_codings_started_at = new Date().toISOString();
    if (status === 'completed') updateData.user_clone_codings_completed_at = new Date().toISOString();

    const { error } = await supabase
      .from("user_clone_codings")
      .upsert({
        user_id: userId,
        clone_coding_id: projectId,
        ...updateData
      }, { onConflict: 'user_id, clone_coding_id' });

    if (error) throw error;
  },

  /**
   * [프로젝트 투두 리스트 조회]
   * 특정 프로젝트에 할당된 유저의 투두 리스트와 진행률 계산을 위한 데이터를 가져옵니다.
   * 참조 테이블: project_todos
   */
  async getProjectTodos(userId: number, projectId: number): Promise<ProjectTodo[]> {
    const { data, error } = await supabase
      .from("project_todos")
      .select("*")
      .eq("user_id", userId)
      .eq("clone_coding_id", projectId);

    if (error) throw error;
    return data || [];
  },

  /**
   * [AI 프로젝트 요약 가이드 생성]
   * Gemini API를 사용하여 해당 프로젝트의 핵심 학습 포인트를 생성합니다.
   */
  async generateProjectGuide(projectTitle: string, techStack: string[]): Promise<string> {
    const prompt = `프로젝트 "${projectTitle}"을(를) ${techStack.join(", ")}로 구현하려고 합니다. 
    이 프로젝트에서 가장 중요하게 배워야 할 핵심 포인트 3가지를 요약해줘.`;
    
    // 이전에 정의한 공통 AI 호출 함수 사용
    // import { generateAiContent } from './AiService';
    return await generateAiContent(prompt);
  }
};