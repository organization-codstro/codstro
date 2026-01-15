export interface RecommendedConceptProps {
  id: string;
  type: string;
  title: string;
  category: string[];
  onClick: (type: string, id: string) => void;
}
