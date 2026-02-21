import { STUDY_PLAN_STATE_TYPE } from "../../../../constants/Woomoonkyung/woomoonkyung";

export interface PlanHeaderProps {
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  nodeCount: number;
  state: STUDY_PLAN_STATE_TYPE;
  isBookmarked: boolean;
}
