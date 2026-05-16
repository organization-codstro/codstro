import { StudyPlan } from "../../../common/StudyPlan";

export interface StudyPlanCardProps {
  plan: StudyPlan;
  completedNodes: number;
  totalNodes: number;
  progress: number;
  stateColors: Record<string, string>;
  onPlanClick: (id: string) => void;
  onDeleteClick: (e: React.MouseEvent, id: string) => void;
  isDeleting?: boolean;
}
