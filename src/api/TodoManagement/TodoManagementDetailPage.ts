import { supabase } from "../../db/supabase/supabase";
import {
  GetTodoDetailParams,
  UpdateTodoStatusParams,
  UpdateTodoParams,
  DeleteTodoParams,
} from "../../types/api/TodoManagement/TodoManagementDetailPage";

/**
 * [할일 관리 서비스]
 * 개인 할일 및 프로젝트 할일을 통합 관리합니다.
 * 참조 테이블: todos
 */
export const TodoManagementDetailService = {
  /**
   * [할일 상세 정보 조회]
   * todoId를 기반으로 특정 할일의 상세 내용을 가져옵니다.
   * 참조 테이블: todos
   */
  async getTodoDetail(params: GetTodoDetailParams) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("todo_id", params.todoId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoService - getTodoDetail]:", error);
      throw error;
    }
  },

  /**
   * [할일 상태 업데이트]
   * 상세 페이지나 목록에서 할일의 진행 상태를 변경합니다.
   * (waiting / in progress / done)
   * 참조 테이블: todos
   */
  async updateTodoStatus(params: UpdateTodoStatusParams) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ todo_status: params.status })
        .eq("todo_id", params.todoId)
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
  async updateTodo(params: UpdateTodoParams) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update(params.payload)
        .eq("todo_id", params.todoId)
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
  async deleteTodo(params: DeleteTodoParams) {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("todo_id", params.todoId);

      if (error) throw error;
    } catch (error) {
      console.error("[TodoService - deleteTodo]:", error);
      throw error;
    }
  },
};
