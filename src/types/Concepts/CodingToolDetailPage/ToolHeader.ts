export interface ToolHeaderProps {
  name: string;
  category: string;
  description: string;
  tags: string[];
  isUnderstood: boolean;
  onToggleUnderstood?: () => void;
}
