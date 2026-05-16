import { StudyPlanNode } from "../../../common/StudyPlan";

export type NodeCardProps = {
  node: StudyPlanNode;
  index: number;

  draggedItem: number | null;
  editingNode: StudyPlanNode | null;
  deletePendingNodeId: string | null;

  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;

  onClick: (node: StudyPlanNode) => void;
  onDeleteClick: (e: React.MouseEvent, nodeId: string) => void;
};
