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
  date?: Date;
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
