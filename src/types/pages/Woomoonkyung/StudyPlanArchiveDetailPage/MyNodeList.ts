import { StudyPlanNode } from "../Woomoonkyung";

export interface MyNodeListProps {
  nodes: StudyPlanNode[];
  onToggleNode: (
    nodeId: string,
    currentStatus: boolean
  ) => Promise<void> | void;
}
