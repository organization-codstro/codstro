export interface ConceptCardProps {
  id: string;
  name: string;
  language: string;
  description: string;
  category: string[];
  onClick: (id: string) => void;
}
