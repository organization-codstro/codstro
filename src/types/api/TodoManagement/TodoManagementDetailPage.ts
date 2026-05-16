import { TODO_STATUS_TYPE } from "../../../constants/TodoManagement/TodoManagement";

/**
 * [할일 상세 조회 파라미터]
 */
export interface GetTodoDetailParams {
  todoId: string;
}

/**
 * [할일 상태 업데이트 파라미터]
 */
export interface UpdateTodoStatusParams {
  todoId: string;
  status: TODO_STATUS_TYPE;
}

/**
 * [할일 수정 파라미터]
 */
export interface UpdateTodoParams {
  todoId: string;
  payload: {
    todo_name?: string;
    todo_content?: string;
    group_id?: string;
    todo_description?: string;
    todo_start_date?: string;
    todo_end_date?: string;
    todo_status?: string;
  };
}

/**
 * [할일 삭제 파라미터]
 */
export interface DeleteTodoParams {
  todoId: string;
}
