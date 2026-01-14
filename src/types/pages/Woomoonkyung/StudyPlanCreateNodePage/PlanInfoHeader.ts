/** PlanInfo 타입 */
type PlanInfo = {
  study_plan_id: number;
  study_plan_name: string;
  study_plan_description: string;
};

/** PlanInfoHeader Props */
export type PlanInfoHeaderProps = {
  planInfo: PlanInfo;
};
