import { supabase } from "../../db/supabase/supabase";

/**
 * [할일 수정 및 폼 관리 서비스]
 * 특정 할일의 데이터를 불러오고, 사용자가 수정한 내용을 DB에 반영합니다.
 * 참조 테이블: todos, fields
 */
export const TodoUpdateService = {
  /**
   * [수정용 초기 데이터 로드]
   * 수정 페이지 진입 시 해당 todoId의 현재 데이터를 가져옵니다.
   * 참조 테이블: todos
   */
  async getTodoForEdit(todoId: number) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("todo_id", todoId)
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
      console.error("[TodoUpdateService - getTodoForEdit]:", error);
      throw error;
    }
  },

  /**
   * [할일 데이터 업데이트]
   * 폼에서 입력된 데이터를 DB 규칙에 맞게 변환하여 저장합니다.
   * 참조 테이블: todos
   */
  async updateTodo(
    todoId: number,
    formData: {
      name: string;
      description: string;
      field_id: number;
      start_date: string;
      end_date: string;
      status: string;
    }
  ) {
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
          todo_name: formData.name,
          todo_description: formData.description,
          todo_content: formData.description, // content와 description이 공존하므로 동일하게 처리
          field_id: formData.field_id,
          todo_start_date: formData.start_date,
          todo_end_date: formData.end_date,
          todo_status: statusMap[formData.status] || formData.status,
        })
        .eq("todo_id", todoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoUpdateService - updateTodo]:", error);
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
      console.error("[TodoUpdateService - getAvailableFields]:", error);
      throw error;
    }
  },
};
