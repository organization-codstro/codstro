import { StudyPlan } from "../Woomoonkyung";

export interface StudyPlanCardProps {
  plan: StudyPlan;
  totalNodes: number;
  isBookmarked: boolean;
  onCardClick: (plan: StudyPlan) => void;
  onToggleBookmark: (planId: number) => void;
  onAddToMyPlans: (plan: StudyPlan) => void;
}
