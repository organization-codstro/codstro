import { RecommendedConceptProps } from "../../../types/Concepts/ConceptMainPage/RecommendedConceptCard";

//추천 카드 개별 요소
export default function RecommendedConceptCard({
  id,
  type,
  title,
  category,
  tags,
  onClick,
}: RecommendedConceptProps) {
  return (
    <div
      onClick={() => onClick(type, id)}
      className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <div className="mb-2 text-xs text-gray-500">{category}</div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-blue-600 rounded-full bg-blue-50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
