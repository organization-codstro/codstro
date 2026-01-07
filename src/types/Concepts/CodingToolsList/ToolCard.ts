export interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  onClick: (id: string) => void;
}
