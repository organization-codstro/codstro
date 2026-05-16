//SortableNodeItem 에서 사용하는 폼 데이터 인터페이스
export interface SortableNodeItemNodeFormData {
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  tech_stack_id: string;
}
