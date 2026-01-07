export interface ConceptHeaderProps {
  name: string;
  category: string;
  description: string;
  tags: string[];
  isUnderstood: boolean;
  onToggleUnderstood?: () => void;
}
