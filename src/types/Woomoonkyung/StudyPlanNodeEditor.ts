import { StudyPlan, StudyPlanNode } from "./Woomoonkyung";

export interface StudyPlanNodeEditorProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: (Omit<StudyPlanNode, "study_plan_node_id" | "created_date"> & {
      study_plan_node_id?: number;
    })[]
  ) => void;
  onBack: () => void;
}
