import { TrendingUp } from "lucide-react";
import RecommendedConceptCard from "./RecommendedConceptCard";
import { RecommendedGridProps } from "../../../types/pages/Concepts/ConceptMainPage/RecommendedGrid";

export default function RecommendedGrid({
  title,
  items,
  onItemClick,
}: RecommendedGridProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6" style={{ color: "#587CF0" }} />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <RecommendedConceptCard
            key={item.id}
            id={item.id}
            type={item.type}
            title={item.title}
            category={item.category}
            onClick={onItemClick}
          />
        ))}
      </div>
    </section>
  );
}
