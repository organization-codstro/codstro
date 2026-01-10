import { LucideIcon } from "lucide-react";

export interface EmptyProjectStateProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  colorClass: string;
  bgColorClass: string;
}
