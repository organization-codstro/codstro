import { StudyPlanNode } from "../../../common/Woomoonkyung";

export interface NodeEditFormProps {
  node: StudyPlanNode;
  errors: { name: boolean; startDate: boolean; endDate: boolean };
  onChange: (updatedNode: StudyPlanNode) => void;
  onSave: () => void;
  onCancel: () => void;
}
