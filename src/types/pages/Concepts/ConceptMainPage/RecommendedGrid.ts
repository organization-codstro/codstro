export type MaterialType = "concept" | "tool" | "library" | "service";

interface RecommendedItem {
  id: string;
  title: string;
  type: MaterialType;
  category: string[];
}

export interface RecommendedGridProps {
  title: string;
  items: RecommendedItem[];
  onItemClick: (type: string, id: string) => void;
}
