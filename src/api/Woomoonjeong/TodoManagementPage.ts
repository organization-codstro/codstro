import { supabase } from "../../db/supabase/supabase";
import {
  GetTodosByDateParams,
  GetMonthlyTodoCountParams,
  SearchTodosParams,
  ToggleTodoStatusParams,
  DeleteTodoParams,
} from "../../types/api/Woomoonjeong/TodoManagementPage";

/**
 * [할일 관리 메인 서비스]
 * 할일 목록 조회, 날짜별 필터링, 상태 변경 및 삭제를 담당합니다.
 * 참조 테이블: todos
 */
export const TodoManagementService = {
  /**
   * [로그인 되어있는 유저 id의 그룹 id 전부 반환]
   * 현재 세션의 유저 정보를 가져와 해당 유저가 생성/소속된 그룹 ID 목록을 배열로 반환합니다.
   * 참조 테이블: groups
   */
  /**
   * [로그인 되어있는 유저의 그룹 정보(ID, 이름) 전부 반환]
   * 참조 테이블: groups
   */
  async getUserGroups(
    user_id: string,
  ): Promise<{ group_id: string; group_name: string }[]> {
    try {
      // 1. 현재 로그인된 유저 정보 가져오기

      // 2. 해당 user_id와 일치하는 그룹들의 group_id와 group_name 선택
      const { data, error } = await supabase
        .from("groups")
        .select("group_id, group_name") // 두 필드 모두 가져옴
        .eq("user_id", user_id);

      if (error) throw error;

      // 3. 더 이상 .map()으로 id만 뽑지 않고, 객체 배열 그대로 반환
      return data || [];
    } catch (error) {
      console.error("[TodoManagementUpdateService - getUserGroups]:", error);
      throw error;
    }
  },

  /**
   * [날짜 범위 내 할일 조회]
   * 특정 날짜가 포함된(start_date <= date <= end_date) 할일 목록을 가져옵니다.
   * 캘린더 점 표시나 일일 목록 조회 시 사용됩니다.
   * 참조 테이블: todos
   */
  async getTodosByDate(params: GetTodosByDateParams) {
    try {
      const dateStr = params.date.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .lte("todo_start_date", dateStr)
        .gte("todo_end_date", dateStr)
        .order("todo_created_date", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementService - getTodosByDate]:", error);
      throw error;
    }
  },

  /**
   * [월별 할일 개수 조회]
   * 캘린더의 한 달 치 데이터를 로드하여 날짜별 할일 유무(카운트)를 파악합니다.
   * 참조 테이블: todos
   */
  async getMonthlyTodoCount(params: GetMonthlyTodoCountParams) {
    try {
      const startDate = new Date(params.year, params.month, 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(params.year, params.month + 1, 0)
        .toISOString()
        .split("T")[0];

      const { data, error } = await supabase
        .from("todos")
        .select("todo_start_date, todo_end_date")
        .or(`todo_start_date.lte.${endDate}, todo_end_date.gte.${startDate}`);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementService - getMonthlyTodoCount]:", error);
      throw error;
    }
  },

  /**
   * [필터링된 할일 검색]
   * 상태값 필터링 및 텍스트 검색을 Supabase 쿼리 레벨에서 처리합니다.
   * 참조 테이블: todos
   */
  async searchTodos(params: SearchTodosParams) {
    try {
      let request = supabase.from("todos").select("*");

      if (params.date) {
        const dateStr = params.date.toISOString().split("T")[0];
        request = request
          .lte("todo_start_date", dateStr)
          .gte("todo_end_date", dateStr);
      }

      if (params.status && params.status !== "all") {
        const statusMap: Record<string, string> = {
          pending: "waiting",
          "in-progress": "in progress",
          done: "done",
        };
        request = request.eq(
          "todo_status",
          statusMap[params.status] || params.status,
        );
      }

      if (params.query) {
        request = request.ilike("todo_name", `%${params.query}%`);
      }

      const { data, error } = await request.order("todo_start_date", {
        ascending: true,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementService - searchTodos]:", error);
      throw error;
    }
  },

  /**
   * [할일 상태 토글]
   * 현재 상태를 확인하여 다음 순차적 상태로 변경합니다.
   * 참조 테이블: todos
   */
  async toggleTodoStatus(params: ToggleTodoStatusParams) {
    try {
      let nextStatus = "waiting";
      if (params.currentStatus === "waiting") nextStatus = "in progress";
      else if (params.currentStatus === "in progress") nextStatus = "done";
      else if (params.currentStatus === "done") nextStatus = "waiting";

      const { data, error } = await supabase
        .from("todos")
        .update({ todo_status: nextStatus })
        .eq("todo_id", params.todoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[TodoManagementService - toggleTodoStatus]:", error);
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
      console.error("[TodoManagementService - deleteTodo]:", error);
      throw error;
    }
  },
};
