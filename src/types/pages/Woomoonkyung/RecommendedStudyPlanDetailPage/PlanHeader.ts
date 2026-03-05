import { STUDY_PLAN_STATE_TYPE } from "../../../../constants/Woomoonkyung/woomoonkyung";
import { StudyPlan } from "../../../common/Woomoonkyung";

export interface PlanHeaderProps {
  plan: StudyPlan;
  nodeCount: number;
  state: STUDY_PLAN_STATE_TYPE;
  onAddToMyPlans: (plan: StudyPlan) => void;
  //isBookmarked: boolean;
}
