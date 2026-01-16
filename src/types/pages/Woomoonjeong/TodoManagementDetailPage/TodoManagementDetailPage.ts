/**
 * [Todo 상세 데이터 인터페이스]
 * Supabase DB 컬럼명과 UI를 매칭
 */
export interface TodoDetail {
  todo_id: string;
  todo_name: string;
  todo_description: string;
  todo_status: "waiting" | "in progress" | "done";
  todo_start_date: string;
  todo_end_date: string;
  todo_created_date: string;
}
