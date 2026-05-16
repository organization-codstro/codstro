import { StudyPlanNode } from "../../../common/StudyPlan";

export type NodeListProps = {
  nodes: StudyPlanNode[];
  draggedItem?: number | null;
  editingNode?: StudyPlanNode | null;
  deletePendingNodeId?: string | null;

  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: () => void;

  onNodeClick?: (node: StudyPlanNode) => void;
  onDeleteClick?: (e: React.MouseEvent, nodeId: string) => void;
};
