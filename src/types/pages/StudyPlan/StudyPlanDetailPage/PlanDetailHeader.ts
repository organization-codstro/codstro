export interface PlanDetailHeaderProps {
  planId: string;
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  state: "done" | "in progress" | "waiting";
  completedNodes: number;
  totalNodes: number;
  progressPercentage: number;
}
