import { supabase } from "../../db/supabase/supabase";
import { ProjectPageResponse, ProjectResponse, TodoResponse } from "../../types/api/ProjectPlanning/ProjectDetailPage";

/**
 * [ProjectFinalizeService]
 * 기획 마지막 단계에서 최종 정보를 저장하고 프로젝트를 확정(Active)으로 전환합니다.
 */
export const ProjectFinalizeService = {
  /**
   * [중간 저장]
   * 사용자가 수정한 모든 기획 정보(기본정보, 페이지, 할 일)를 기획 테이블에 임시 저장합니다.
   * @table project_plannings, project_planning_pages, project_todos
   */
  async savePlanningDraft(params: {
    projectId: number;
    basicInfo: Partial<ProjectResponse>;
    pages: Array<ProjectPageResponse & { todos: TodoResponse[] }>;
    projectTodos: TodoResponse[];
  }) {
    try {
      // 1. 기본 정보 업데이트
      const { error: infoError } = await supabase
        .from("project_plannings")
        .update({
          project_name: params.basicInfo.project_name,
          project_topic: params.basicInfo.project_topic,
          project_description: params.basicInfo.project_description,
          project_start_date: params.basicInfo.project_start_date,
          project_end_date: params.basicInfo.project_end_date,
          project_main_color: params.basicInfo.project_main_color,
          project_style: params.basicInfo.project_style,
          project_effect: params.basicInfo.project_effect,
        })
        .eq("project_id", params.projectId);

      if (infoError) throw infoError;

      // 2. 페이지 및 페이지 할 일 저장 (Upsert)
      for (const page of params.pages) {
        const { data: savedPage, error: pageError } = await supabase
          .from("project_planning_pages")
          .upsert({
            project_page_id: page.project_page_id,
            project_id: params.projectId,
            project_page_name: page.project_page_name,
            project_page_role: page.project_page_role,
            project_page_function: page.project_page_function,
            project_page_is_complete: page.project_page_is_complete,
          })
          .select()
          .single();

        if (pageError) throw pageError;

        if (page.todos.length > 0) {
          await supabase.from("project_todos").upsert(
            page.todos.map((t) => ({
              ...t,
              project_page_id: savedPage.project_page_id,
            }))
          );
        }
      }

      // 3. 프로젝트 전체 할 일(Project Todos) 저장
      if (params.projectTodos.length > 0) {
        await supabase.from("project_todos").upsert(
          params.projectTodos.map((t) => ({
            ...t,
            project_id: params.projectId,
          }))
        );
      }

      return { success: true };
    } catch (error) {
      console.error("[savePlanningDraft Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 확정 (Active 전환)]
   * 기획 완료된 프로젝트를 'projects' 테이블로 복사하고 기획 테이블에서 정리합니다.
   * @table project_plannings -> projects
   */
  async finalizeProject(projectId: number) {
    try {
      // 1. 기획 데이터 가져오기
      const { data: planningData, error: fetchError } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("project_id", projectId)
        .single();

      if (fetchError) throw fetchError;

      // 2. 'projects' 테이블로 데이터 이전
      const { data: newProject, error: insertError } = await supabase
        .from("projects")
        .insert([
          {
            project_name: planningData.project_name,
            project_description: planningData.project_description,
            project_topic: planningData.project_topic,
            project_stacks: planningData.project_stacks,
            project_start_date: planningData.project_start_date,
            project_end_date: planningData.project_end_date,
            project_main_color: planningData.project_main_color,
            project_style: planningData.project_style,
            project_effect: planningData.project_effect,
            project_created_date: new Date().toISOString().split("T")[0],
            user_id: planningData.user_id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // 3. 페이지 및 할 일들의 연관 ID를 새 프로젝트 ID로 업데이트
      await supabase
        .from("project_planning_pages")
        .update({ project_id: newProject.project_id })
        .eq("project_id", projectId);

      await supabase
        .from("project_todos")
        .update({ project_id: newProject.project_id })
        .eq("project_id", projectId);

      // 4. 기존 기획 레코드 삭제 (Cascade 설정 권장)
      await supabase
        .from("project_plannings")
        .delete()
        .eq("project_id", projectId);

      return newProject;
    } catch (error) {
      console.error("[finalizeProject Error]:", error);
      throw error;
    }
  },
};
