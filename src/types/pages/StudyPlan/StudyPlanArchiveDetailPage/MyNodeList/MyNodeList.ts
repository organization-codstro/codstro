import { StudyPlanNode } from "../../../../common/StudyPlan";

export interface MyNodeListProps {
  nodes: StudyPlanNode[];
  onToggleNode: (
    nodeId: string,
    currentStatus: boolean,
  ) => Promise<void> | void;
  planId: string;
}
