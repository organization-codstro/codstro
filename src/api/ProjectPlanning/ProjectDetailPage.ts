import { supabase } from "../../db/supabase/supabase";
import {
  Project,
  ProjectPage,
  Todo,
} from "../../types/ProjectPlanning/project";

/**
 * [ProjectDetailService]
 * 프로젝트 상세 정보, 기획 페이지, 할 일(Todo)의 조회 및 수정을 담당합니다.
 */
export const ProjectDetailService = {
  /**
   * [프로젝트 상세 정보 조회]
   * 프로젝트 상태에 따라 다른 테이블(projects 또는 project_plannings)에서 정보를 가져옵니다.
   */
  async getProjectDetail(projectId: number, isPlanning: boolean) {
    const table = isPlanning ? "project_plannings" : "projects";
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("project_id", projectId)
        .single();

      if (error) throw error;
      return { ...data, project_status: isPlanning ? "planning" : "active" };
    } catch (error) {
      console.error("[getProjectDetail Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 페이지 및 할 일 목록 조회]
   * 프로젝트에 종속된 기획 페이지들과 각 페이지별 할 일(Todo)을 조인하여 가져옵니다.
   * @table project_planning_pages (기존 project_page_... 컬럼 기준)
   */
  async getProjectPagesWithTodos(projectId: number) {
    try {
      // 페이지 정보와 해당 페이지의 할 일들을 가져옴
      const { data, error } = await supabase
        .from("project_planning_pages")
        .select(
          `
          *,
          todos:project_todos(*)
        `
        )
        .eq("project_id", projectId);

      if (error) throw error;
      return data as Array<ProjectPage & { todos: Todo[] }>;
    } catch (error) {
      console.error("[getProjectPagesWithTodos Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 기본 정보 업데이트]
   * 확정된 프로젝트나 기획 중인 프로젝트의 메타데이터를 수정합니다.
   */
  async updateProjectInfo(
    projectId: number,
    isPlanning: boolean,
    updates: Partial<Project>
  ) {
    const table = isPlanning ? "project_plannings" : "projects";
    try {
      const { data, error } = await supabase
        .from(table)
        .update({
          project_name: updates.project_name,
          project_topic: updates.project_topic,
          project_description: updates.project_description,
          project_start_date: updates.project_start_date,
          project_end_date: updates.project_end_date,
          project_main_color: updates.project_main_color,
          project_style: updates.project_style,
          project_effect: updates.project_effect,
          project_stacks: updates.project_stacks,
        })
        .eq("project_id", projectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updateProjectInfo Error]:", error);
      throw error;
    }
  },

  /**
   * [페이지 및 할 일 일괄 저장]
   * 편집 모드에서 수정된 페이지 정보와 할 일들을 저장합니다.
   */
  async saveProjectStructure(pages: Array<ProjectPage & { todos: Todo[] }>) {
    try {
      for (const page of pages) {
        // 1. 페이지 정보 업데이트
        const { error: pageError } = await supabase
          .from("project_planning_pages")
          .upsert({
            project_page_id: page.project_page_id,
            project_page_name: page.project_page_name,
            project_page_role: page.project_page_role,
            project_page_function: page.project_page_function,
            project_page_is_complete: page.project_page_is_complete,
            project_id: page.project_id,
          });

        if (pageError) throw pageError;

        // 2. 할 일(Todo) 목록 업데이트 (Upsert)
        if (page.todos && page.todos.length > 0) {
          const { error: todoError } = await supabase
            .from("project_todos")
            .upsert(
              page.todos.map((todo) => ({
                ...todo,
                project_page_id: page.project_page_id, // 외래키 연결
              }))
            );
          if (todoError) throw todoError;
        }
      }
      return { success: true };
    } catch (error) {
      console.error("[saveProjectStructure Error]:", error);
      throw error;
    }
  },

  /**
   * [할 일 삭제]
   */
  async deleteTodo(todoId: number) {
    const { error } = await supabase
      .from("project_todos")
      .delete()
      .eq("id", todoId);

    if (error) throw error;
  },
};
