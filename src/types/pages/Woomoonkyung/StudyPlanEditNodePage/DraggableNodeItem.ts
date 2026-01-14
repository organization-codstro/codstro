import { StudyPlanNode } from "../Woomoonkyung";

export interface DraggableNodeItemProps {
  node: StudyPlanNode;
  index: number;
  isDragging: boolean;
  isEditing: boolean;
  deletePending: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onClick: () => void;
  onDeleteClick: (e: React.MouseEvent, nodeId: string) => void;
}
