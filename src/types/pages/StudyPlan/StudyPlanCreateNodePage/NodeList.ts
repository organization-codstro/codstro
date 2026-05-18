import { StudyPlanNode } from "../../../common/StudyPlan";

export type NodeListProps = {
  /** 전체 노드 목록 */
  nodes: StudyPlanNode[];

  /** 현재 드래그 중인 노드 index */
  draggedItem: number | null;

  /** 현재 편집 중인 노드 */
  editingNode: StudyPlanNode | null;

  /** 삭제 대기 중인 노드 id */
  deletePendingNodeId: string | null;

  /** 드래그 시작 */
  onDragStart: (e: React.DragEvent, index: number) => void;

  /** 드래그 오버 */
  onDragOver: (e: React.DragEvent, index: number) => void;

  /** 드래그 종료 */
  onDragEnd: () => void;

  /** 노드 클릭 */
  onNodeClick: (node: StudyPlanNode) => void;

  /** 노드 삭제 클릭 */
  onDeleteClick: (e: React.MouseEvent, nodeId: string) => void;
};
