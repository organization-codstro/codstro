import { StudyPlan, StudyPlanNode } from "./Woomoonkyung";

export interface SortableNodeItemProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: (Omit<StudyPlanNode, "study_plan_node_id" | "created_date"> & {
      study_plan_node_id?: number;
    })[]
  ) => void;
  onBack: () => void;
}
