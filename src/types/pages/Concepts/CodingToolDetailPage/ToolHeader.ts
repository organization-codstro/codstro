export interface ToolHeaderProps {
  name: string;
  category: string[];
  description: string;
  isUnderstood: boolean;
  onToggleUnderstood?: () => void;
}
