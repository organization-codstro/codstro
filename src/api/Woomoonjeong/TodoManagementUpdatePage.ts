import { supabase } from "../../db/supabase/supabase";
import {
  GetTodoForEditParams,
  UpdateTodoParams,
} from "../../types/api/Woomoonjeong/TodoManagementUpdatePage";

/**
 * [할일 수정 및 폼 관리 서비스]
 * 특정 할일의 데이터를 불러오고, 사용자가 수정한 내용을 DB에 반영합니다.
 * 참조 테이블: todos, fields
 */
export const TodoManagementUpdateService = {
  /**
   * [수정용 초기 데이터 로드]
   * 수정 페이지 진입 시 해당 todoId의 현재 데이터를 가져옵니다.
   * 참조 테이블: todos
   */
  async getTodoForEdit(params: GetTodoForEditParams) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("todo_id", params.todoId)
        .single();

      if (error) throw error;

      // DB 상태값을 컴포넌트용 상태값으로 역매핑 (필요 시)
      const statusMap: Record<string, string> = {
        waiting: "pending",
        "in progress": "in-progress",
        done: "completed",
      };

      return {
        ...data,
        display_status: statusMap[data.todo_status] || data.todo_status,
      };
    } catch (error) {
      console.error("[TodoManagementUpdateService - getTodoForEdit]:", error);
      throw error;
    }
  },

  /**
   * [할일 데이터 업데이트]
   * 폼에서 입력된 데이터를 DB 규칙에 맞게 변환하여 저장합니다.
   * 참조 테이블: todos
   */
  async updateTodo(params: UpdateTodoParams) {
    try {
      // 컴포넌트의 상태값을 DB enum/text 규칙으로 매핑
      const statusMap: Record<string, string> = {
        pending: "waiting",
        "in-progress": "in progress",
        completed: "done",
      };

      const { data, error } = await supabase
        .from("todos")
        .update({
          todo_name: params.formData.name,
          todo_description: params.formData.description,
          todo_content: params.formData.description, // content와 description이 공존하므로 동일하게 처리
          field_id: params.formData.field_id,
          todo_start_date: params.formData.start_date,
          todo_end_date: params.formData.end_date,
          todo_status:
            statusMap[params.formData.status] || params.formData.status,
        })
        .eq("todo_id", params.todoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementUpdateService - updateTodo]:", error);
      throw error;
    }
  },

  /**
   * [필드 목록 조회]
   * FieldSelector에서 사용할 필드(분야) 목록을 가져옵니다.
   * 참조 테이블: fields
   */
  async getAvailableFields() {
    try {
      const { data, error } = await supabase
        .from("fields")
        .select("field_id, field_name");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementUpdateService - getAvailableFields]:", error);
      throw error;
    }
  },
};
