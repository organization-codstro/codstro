import { supabase } from "../../db/supabase/supabase";

/**
 * [할일 관리 서비스]
 * 개인 할일 및 프로젝트 할일을 통합 관리합니다.
 * 참조 테이블: todos
 */
export const TodoService = {
  /**
   * [할일 상세 정보 조회]
   * todoId를 기반으로 특정 할일의 상세 내용을 가져옵니다.
   * 참조 테이블: todos
   */
  async getTodoDetail(todoId: number) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("todo_id", todoId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - getTodoDetail]:", error);
      throw error;
    }
  },

  /**
   * [전체 할일 목록 조회]
   * 메인 화면에서 프로젝트 할일과 일반 할일을 모두 조회합니다.
   * 참조 테이블: todos
   */
  async getAllTodos() {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("todo_start_date", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - getAllTodos]:", error);
      throw error;
    }
  },

  /**
   * [할일 상태 업데이트]
   * 상세 페이지나 목록에서 할일의 진행 상태를 변경합니다.
   * (waiting / in progress / done)
   * 참조 테이블: todos
   */
  async updateTodoStatus(
    todoId: number,
    status: "waiting" | "in progress" | "done"
  ) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ todo_status: status })
        .eq("todo_id", todoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - updateTodoStatus]:", error);
      throw error;
    }
  },

  /**
   * [할일 수정]
   * 이름, 내용, 기간 등 할일 정보를 업데이트합니다.
   * 참조 테이블: todos
   */
  async updateTodo(
    todoId: number,
    payload: {
      todo_name?: string;
      todo_content?: string;
      todo_description?: string;
      todo_start_date?: string;
      todo_end_date?: string;
      todo_status?: string;
    }
  ) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update(payload)
        .eq("todo_id", todoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - updateTodo]:", error);
      throw error;
    }
  },

  /**
   * [할일 삭제]
   * 참조 테이블: todos
   */
  async deleteTodo(todoId: number) {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("todo_id", todoId);

      if (error) throw error;
    } catch (error) {
      console.error("[TodoService - deleteTodo]:", error);
      throw error;
    }
  },

  /**
   * [할일 생성]
   * 참조 테이블: todos
   */
  async createTodo(payload: {
    todo_name: string;
    todo_content: string;
    todo_description: string;
    todo_start_date: string;
    todo_end_date: string;
    group_id?: number;
    project_id?: number;
  }) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            ...payload,
            todo_status: "waiting",
            todo_created_date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - createTodo]:", error);
      throw error;
    }
  },
};
