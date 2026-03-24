import { supabase } from "../../db/supabase/supabase";
import {
  SavePlanningDraftParams,
  FinalizeProjectParams,
} from "../../types/api/ProjectPlanning/ProjectInfoGeneratePage";
import {
  ProjectPage,
  ProjectTodo,
  ProjectPlanningDetail,
} from "../../types/common/projectPlanning";

/**
 * [ProjectInfoGenerateService]
 * 기획 마지막 단계에서 최종 정보를 저장하고 프로젝트를 확정(Active)으로 전환합니다.
 */
export const ProjectInfoGenerateService = {
  async getPlanningDetail(projectId: string): Promise<ProjectPlanningDetail> {
    // 1) 기본 정보
    const { data: planning, error: planningError } = await supabase
      .from("project_plannings")
      .select("*")
      .eq("project_id", projectId)
      .single();

    if (planningError || !planning) {
      throw new Error("기획 정보를 불러오는데 실패했습니다.");
    }

    // 2) 페이지 목록
    const { data: pagesData, error: pagesError } = await supabase
      .from("project_planning_pages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (pagesError) {
      throw new Error("페이지 정보를 불러오는데 실패했습니다.");
    }

    const pages = pagesData ?? [];

    // 3) 페이지별 todos
    // const pageIds = pages.map((p: any) => p.project_page_id);
    //let todosData: any[] = [];

    // if (pageIds.length > 0) {
    //   const { data: todos, error: todosError } = await supabase
    //     .from("todos")
    //     .select("*")
    //     .in("project_page_id", pageIds)
    //     .order("created_at", { ascending: true });

    //   if (todosError) {
    //     throw new Error("할 일 정보를 불러오는데 실패했습니다.");
    //   }
    //   todosData = todos ?? [];
    // }

    // 4) pages에 todos 붙이기
    const pagesWithTodos: Array<ProjectPage & { todos: ProjectTodo[] }> =
      pages.map((page: any) => ({
        project_page_id: page.project_page_id,
        project_page_name: page.project_page_name,
        project_page_role: page.project_page_role,
        project_page_function: page.project_page_function,
        project_page_is_complete: page.project_page_is_complete,
        project_id: page.project_id,
        todos: [],
      }));

    return {
      project_id: planning.project_id,
      project_name: planning.project_name ?? "",
      project_topic: planning.project_topic ?? "",
      project_description: planning.project_description ?? "",
      project_main_color: planning.project_main_color ?? "#587CF0",
      project_style: planning.project_style ?? "",
      project_effect: planning.project_effect ?? "",
      project_start_date: planning.project_start_date ?? "",
      project_end_date: planning.project_end_date ?? "",
      project_stacks: planning.project_stacks ?? "",
      pages: pagesWithTodos,
    };
  },

  /**
   * [중간 저장]
   * 사용자가 수정한 모든 기획 정보(기본정보, 페이지, 할 일)를 기획 테이블에 임시 저장합니다.
   * @table project_plannings, project_planning_pages, todos
   */
  async savePlanningDraft(params: SavePlanningDraftParams) {
    console.log("projectId:", params.projectId);
    const { data, error } = await supabase
      .from("projects")
      .select("project_id, user_id")
      .eq("project_id", params.projectId);

    console.log("조회 결과:", data);
    console.log("조회 에러:", error);

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
          project_planning_stage: "info",
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

        // if (page.todos.length > 0) {
        //   await supabase.from("todos").upsert(
        //     page.todos.map((t) => ({
        //       todo_id: t.todo_id,
        //       project_id: params.projectId,
        //       todo_name: t.todo_name,
        //       todo_content: t.todo_content,
        //       todo_description: t.todo_description ?? "",
        //       todo_start_date: t.todo_start_date,
        //       todo_end_date: t.todo_end_date,
        //       todo_status: t.todo_status,
        //     })),
        //   );
        // }
      }

      // 3. 프로젝트 전체 할 일 저장
      // if (params.projectTodos.length > 0) {
      //   await supabase.from("todos").upsert(
      //     params.projectTodos.map((t) => ({
      //       todo_id: t.todo_id, // id → todo_id
      //       project_id: params.projectId,
      //       todo_name: t.todo_name, // name → todo_name
      //       todo_content: t.todo_content, // content → todo_content
      //       todo_description: t.todo_description ?? "", // description → todo_description
      //       todo_start_date: t.todo_start_date, // start_date → todo_start_date
      //       todo_end_date: t.todo_end_date, // end_date → todo_end_date
      //       todo_status: t.todo_status, // status → todo_status
      //     })),
      //   );
      // }
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
  async finalizeProject(params: FinalizeProjectParams) {
    try {
      // 1. 기획 데이터 가져오기
      const { data: planningData, error: fetchError } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("project_id", params.projectId)
        .single();

      if (fetchError) throw fetchError;

      // 2. projects 생성
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
            project_status: "waiting",
            user_id: planningData.user_id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // 3. pages + todos 생성
      for (const page of params.pages) {
        // 3-1. project_pages 생성
        const { data: newPage, error: pageInsertError } = await supabase
          .from("project_pages")
          .insert({
            project_id: newProject.project_id,
            project_page_name: page.project_page_name,
            project_page_role: page.project_page_role,
            project_page_function: page.project_page_function,
            project_page_is_complete: page.project_page_is_complete,
          })
          .select()
          .single();

        if (pageInsertError) throw pageInsertError;

        // 3-2. 해당 페이지 todos 생성
        if (page.todos && page.todos.length > 0) {
          const todosToInsert = page.todos.map((t) => ({
            project_id: newProject.project_id,
            project_page_id: newPage.project_page_id,
            todo_name: t.todo_name,
            todo_content: t.todo_content,
            todo_description: t.todo_description ?? "",
            todo_start_date: t.todo_start_date,
            todo_end_date: t.todo_end_date,
            todo_status: t.todo_status,
          }));

          const { error: todoInsertError } = await supabase
            .from("todos")
            .insert(todosToInsert);

          if (todoInsertError) throw todoInsertError;
        }
      }

      // 4. project 전체 todos (페이지 없는 것)
      if (params.projectTodos && params.projectTodos.length > 0) {
        const projectTodosToInsert = params.projectTodos.map((t) => ({
          project_id: newProject.project_id,
          todo_name: t.todo_name,
          todo_content: t.todo_content,
          todo_description: t.todo_description ?? "",
          todo_start_date: t.todo_start_date,
          todo_end_date: t.todo_end_date,
          todo_status: t.todo_status,
        }));

        const { error: projectTodoError } = await supabase
          .from("todos")
          .insert(projectTodosToInsert);

        if (projectTodoError) throw projectTodoError;
      }

      // 5. planning 데이터 삭제 (초기화)
      await supabase
        .from("project_planning_pages")
        .delete()
        .eq("project_id", params.projectId);

      await supabase
        .from("project_plannings")
        .delete()
        .eq("project_id", params.projectId);

      return newProject;
    } catch (error) {
      console.error("[finalizeProject Error]:", error);
      throw error;
    }
  },
};
