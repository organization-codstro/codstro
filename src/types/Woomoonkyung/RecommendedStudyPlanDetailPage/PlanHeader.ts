export interface PlanHeaderProps {
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  nodeCount: number;
  state: "waiting" | "in progress" | "done";
  isBookmarked: boolean;
}