import { MATERIAL_TYPE } from "../../../../constants/Concepts/concepts";

interface RecommendedItem {
  id: string;
  title: string;
  type: MATERIAL_TYPE;
  category: string[];
}

export interface RecommendedGridProps {
  title: string;
  items: RecommendedItem[];
  onItemClick: (type: string, id: string) => void;
}
