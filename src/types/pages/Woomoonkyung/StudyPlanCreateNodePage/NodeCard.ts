import { StudyPlanNode } from "../../../../types/pages/Woomoonkyung/Woomoonkyung";

export type NodeCardProps = {
  node: StudyPlanNode;
  index: number;

  draggedItem: number | null;
  editingNode: StudyPlanNode | null;
  deletePendingNodeId: number | null;

  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;

  onClick: (node: StudyPlanNode) => void;
  onDeleteClick: (e: React.MouseEvent, nodeId: number) => void;
};
