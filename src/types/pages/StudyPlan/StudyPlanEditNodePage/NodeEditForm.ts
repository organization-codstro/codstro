import { StudyPlanNode } from "../../../common/StudyPlan";

export interface NodeEditFormProps {
  node: StudyPlanNode;
  errors: { name: boolean; startDate: boolean; endDate: boolean };
  onChange: (updatedNode: StudyPlanNode) => void;
  onSave: () => void;
  onCancel: () => void;
}
