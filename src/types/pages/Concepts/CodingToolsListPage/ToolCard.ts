export interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string[];
  onClick: (id: string) => void;
}
