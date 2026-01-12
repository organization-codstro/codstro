/**
 * [수정용 할일 조회 파라미터]
 */
export interface GetTodoForEditParams {
  todoId: number;
}

/**
 * [할일 업데이트 파라미터]
 */
export interface UpdateTodoParams {
  todoId: number;
  formData: {
    name: string;
    description: string;
    field_id: number;
    start_date: string;
    end_date: string;
    status: string;
  };
}
