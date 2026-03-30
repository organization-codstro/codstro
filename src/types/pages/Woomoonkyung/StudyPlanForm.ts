// StudyPlanForm.ts (또는 타입 정의부)

import { StudyPlan } from "../../common/Woomoonkyung";

export interface StudyPlanFormFormData extends Omit<
  StudyPlan,
  "study_plan_id" | "study_plans_created_date" | "created_at"
> {}
