import { StudyPlan, StudyPlanNode } from "../Woomoonkyung";

export interface StudyPlanCardProps {
  plan: StudyPlan;
  completedNodes: number;
  totalNodes: number;
  progress: number;
  stateColors: Record<string, string>;
  onPlanClick: (id: number) => void;
  onDeleteClick: (e: React.MouseEvent, id: number) => void;
}
