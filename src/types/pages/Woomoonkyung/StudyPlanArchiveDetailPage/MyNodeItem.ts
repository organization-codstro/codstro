import { StudyPlanNode } from "../Woomoonkyung";

export interface MyNodeItemProps {
  node: StudyPlanNode;
  // nodeId와 현재 완료 상태를 인자로 받는 함수
  onToggleNode: (nodeId: string, currentStatus: boolean) => void;
}
