/**
 * [수정용 할일 조회 파라미터]
 */
export interface GetTodoForEditParams {
  todoId: string;
}

/**
 * [할일 업데이트 파라미터]
 */
export interface UpdateTodoParams {
  todoId: string;
  formData: {
    name: string;
    description: string;
    field_id: string;
    start_date: string;
    end_date: string;
    status: string;
  };
}
