export interface CloneCodingProjectStatusCardProps {
  currentStatus: string;
  onStatusChange: (status: any) => void;
  completedTodos: number;
  totalTodos: number;
  progressPercentage: number;
}
