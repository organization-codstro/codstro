import { ConceptCardProps } from "../../../types/pages/Concepts/BasicConceptsListPage/ConceptCard";

export default function ConceptCard({
  id,
  name,
  description,
  category,
  onClick,
}: ConceptCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-6 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {category.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-green-600 rounded-full bg-green-50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
