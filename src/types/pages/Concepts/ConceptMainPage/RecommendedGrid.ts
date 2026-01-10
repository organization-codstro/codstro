interface RecommendedItem {
  id: string;
  type: string;
  title: string;
  category: string;
  tags: string[];
}

export interface RecommendedGridProps {
  title?: string;
  items: RecommendedItem[];
  onItemClick: (type: string, id: string) => void;
}
