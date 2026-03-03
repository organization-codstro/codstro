import { TODO_STATUS_TYPE } from "../../../constants/Woomoonjeong/woomoonjeong";

/**
 * [날짜별 할일 조회 파라미터]
 */
export interface GetTodosByDateParams {
  date: Date;
}

/**
 * [월별 할일 개수 조회 파라미터]
 */
export interface GetMonthlyTodoCountParams {
  year: number;
  month: number;
}

/**
 * [할일 검색 파라미터]
 */
export interface SearchTodosParams {
  status?: string;
  query?: string;
  date?: string;
}

/**
 * [할일 상태 토글 파라미터]
 */
export interface ToggleTodoStatusParams {
  todoId: string;
  currentStatus: string;
}

/**
 * [할일 삭제 파라미터]
 */
export interface DeleteTodoParams {
  todoId: string;
}

/**
 * [할일 생성 파라미터]
 */
export interface CreateTodoParams {
  todo_name: string;
  todo_content: string;
  todo_description: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: TODO_STATUS_TYPE;
  group_id?: string;
  project_id?: string;
}
