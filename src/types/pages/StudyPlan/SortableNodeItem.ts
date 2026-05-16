import { StudyPlan, StudyPlanNode } from "../../../types/common/StudyPlan";

export interface SortableNodeItemProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: (Omit<StudyPlanNode, "study_plan_node_id" | "created_date"> & {
      study_plan_node_id?: string;
    })[]
  ) => void;
  onBack: () => void;
}
