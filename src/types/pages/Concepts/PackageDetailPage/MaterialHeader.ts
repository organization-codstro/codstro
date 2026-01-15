export interface MaterialHeaderProps {
  name: string;
  category: string;
  description: string;
  tags: string[];
  documentUrl?: string | null;
  isUnderstood: boolean;
  onToggleUnderstood: () => void;
}
