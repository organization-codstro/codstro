import { StudyPlan, StudyPlanNode } from "./Woomoonkyung";

export interface StudyPlanNodeEditorProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: (Omit<StudyPlanNode, "study_plan_node_id" | "created_at"> & {
      study_plan_node_id?: string;
    })[]
  ) => void;
  onBack: () => void;
}
