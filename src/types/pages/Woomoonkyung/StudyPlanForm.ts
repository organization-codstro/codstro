import { StudyPlan } from "./Woomoonkyung";

// StudyPlanForm 폼 내부에서 사용할 데이터 타입 정의 (StudyPlan 인터페이스 기반)
export interface StudyPlanFormFormData
  extends Omit<StudyPlan, "study_plan_id" | "study_plans_created_date"> {}
