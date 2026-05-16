import { STUDY_PLAN_STATE_TYPE } from "../../../../constants/StudyPlan/StudyPlan";
import { StudyPlan } from "../../../common/StudyPlan";

export interface PlanHeaderProps {
  plan: StudyPlan;
  nodeCount: number;
  state: STUDY_PLAN_STATE_TYPE;
  onAddToMyPlans: (plan: StudyPlan) => void;
  //isBookmarked: boolean;
}
