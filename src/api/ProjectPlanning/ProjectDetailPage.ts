import { PROJECT_STATUS_TYPE } from "../../constants/ProjectPlanning/ProjectPlanning";
import { supabase } from "../../db/supabase/supabase";

export const ProjectDetailService = {
  /**
   * [프로젝트 상세 정보 조회]
   */
  async getProjectDetail(projectId: string, isPlanning: boolean) {
    const table = isPlanning ? "project_plannings" : "projects";

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("project_id", projectId)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Project not found");

    const today = new Date();
    const endDate = new Date(data.project_end_date);
    let project_status: PROJECT_STATUS_TYPE;
    if (isPlanning) {
      project_status = "waiting";
    } else if (endDate < today) {
      project_status = "done";
    } else {
      project_status = "in progress";
    }

    return { ...data, project_status };
  },

  /**
   * [프로젝트 페이지 + 페이지별 todos 조회]
   * isPlanning: true  → project_planning_pages (todos 없음)
   * isPlanning: false → project_pages + todos(project_page_id 있는 것)
   */
  async getProjectPagesWithTodos(projectId: string, isPlanning: boolean) {
    if (isPlanning) {
      const { data, error } = await supabase
        .from("project_planning_pages")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data ?? []).map((page) => ({ ...page, todos: [] }));
    }

    // active: project_pages 조회
    const { data: pages, error: pagesError } = await supabase
      .from("project_pages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (pagesError) throw pagesError;
    if (!pages || pages.length === 0) return [];

    const pageIds = pages.map((p) => p.project_page_id);

    // 페이지에 속한 todos (project_page_id 있는 것)
    const { data: todos, error: todosError } = await supabase
      .from("todos")
      .select("*")
      .in("project_page_id", pageIds);

    if (todosError) throw todosError;

    return pages.map((page) => ({
      ...page,
      todos: (todos ?? [])
        .filter((t) => t.project_page_id === page.project_page_id)
        .map((t) => ({
          id: t.todo_id,
          name: t.todo_name,
          content: t.todo_content,
          description: t.todo_description,
          start_date: t.todo_start_date,
          end_date: t.todo_end_date,
          status: t.todo_status,
          created_at: t.created_at,
          project_page_id: t.project_page_id,
        })),
    }));
  },

  /**
   * [프로젝트 전체 todos 조회]
   * project_page_id = null 인 것만 (프로젝트 레벨)
   */
  async getProjectTodos(projectId: string) {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("project_id", projectId)
      .is("project_page_id", null)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return (data ?? []).map((t) => ({
      id: t.todo_id,
      client_id: t.todo_id,
      name: t.todo_name,
      content: t.todo_content,
      description: t.todo_description,
      start_date: t.todo_start_date,
      end_date: t.todo_end_date,
      status: t.todo_status,
      created_at: t.created_at,
    }));
  },

  /**
   * [프로젝트 기본 정보 업데이트]
   */
  async updateProjectInfo(projectId: string, isPlanning: boolean, data: any) {
    const table = isPlanning ? "project_plannings" : "projects";
    const { error } = await supabase
      .from(table)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("project_id", projectId);

    if (error) throw error;
  },

  /**
   * [페이지 구조 저장]
   */
  async saveProjectStructure(pages: any[]) {
    for (const page of pages) {
      const { error } = await supabase.from("project_pages").upsert({
        project_page_id: page.project_page_id,
        project_id: page.project_id,
        project_page_name: page.project_page_name,
        project_page_role: page.project_page_role,
        project_page_function: page.project_page_function,
        project_page_is_complete: page.project_page_is_complete,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    }
  },

  /**
   * 업데이트
   */
  async updateTodo(
    todoId: string,
    updates: {
      todo_name: string;
      todo_content: string;
      todo_description: string;
      todo_start_date: string;
      todo_end_date: string;
      todo_status: string;
    },
  ) {
    const { error } = await supabase
      .from("todos")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("todo_id", todoId);

    if (error) throw error;
  },

  /**
   * 삭제
   */
  async deleteTodo(todoId: string) {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("todo_id", todoId);

    if (error) throw error;
  },

  /**
   * 추가
   */
  async addProjectTodo(
    projectId: string,
    todo: {
      name: string;
      content: string;
      description: string;
      start_date: string;
      end_date: string;
      status: string;
    },
  ) {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        todo_name: todo.name,
        todo_content: todo.content,
        todo_description: todo.description,
        todo_start_date: todo.start_date,
        todo_end_date: todo.end_date,
        todo_status: todo.status,
        project_id: projectId,
        project_page_id: null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [기획 단계 조회]
   */
  async getProjectPlanningStage(projectId: string) {
    const { data, error } = await supabase
      .from("project_plannings")
      .select("project_planning_stage")
      .eq("project_id", projectId)
      .maybeSingle();

    if (error) throw error;
    return data?.project_planning_stage ?? "chat";
  },
};
