/**
 * [할일 데이터 매핑 인터페이스]
 */
export interface DBTodo {
  todo_id: string;
  field_id: string;
  todo_name: string;
  todo_description: string;
  todo_status: "waiting" | "in progress" | "done";
  todo_start_date: string;
  todo_end_date: string;
  todo_created_date: string;
}
