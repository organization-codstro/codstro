import { StudyPlanInfo } from "../../api/Woomoonkyung/StudyPlanEditPage";
import { StudyPlan } from "./Woomoonkyung";

// StudyPlanForm 폼 내부에서 사용할 데이터 타입 정의 (StudyPlan 인터페이스 기반)
export interface StudyPlanFormFormData
  extends Omit<StudyPlan, "study_plan_id" | "created_at"> {}

export interface StudyPlanFormProps {
  mode: "create" | "edit";
  existingPlan?: StudyPlanInfo;
  onSave: (planData: Omit<StudyPlan, "study_plan_id" | "created_at">) => void;
  onCancel?: () => void;
  userId?: string;
}
