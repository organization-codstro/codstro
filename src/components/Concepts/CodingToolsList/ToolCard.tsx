import { ToolCardProps } from "../../../types/pages/Concepts/CodingToolsListPage/ToolCard";

export default function ToolCard({
  id,
  name,
  description,
  category,
  onClick,
}: ToolCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-6 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-purple-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
        {category}
      </div>
      <div className="flex flex-wrap gap-2">
        {category.map((categoryItem, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-purple-600 rounded-full bg-purple-50"
          >
            {categoryItem}
          </span>
        ))}
      </div>
    </div>
  );
}
