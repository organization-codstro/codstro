import { StudyPlan } from "../Woomoonkyung";

export interface StudyPlanCardProps {
  plan: StudyPlan;
  totalNodes: number;
  isBookmarked: boolean;
  onCardClick: (plan: StudyPlan) => void;
  onToggleBookmark: (planId: string) => void;
  onAddToMyPlans: (plan: StudyPlan) => void;
}
