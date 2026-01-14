import { MaterialCardProps } from "../../../types/pages/Concepts/PackageDetailPage/MaterialCard";

export default function MaterialCard({
  id,
  name,
  description,
  category,
  onClick,
}: MaterialCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="p-6 text-left transition-all duration-300 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 bg-white"
    >
      {/* 제목 */}
      <h3 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2">
        {name}
      </h3>

      {/* 설명 */}
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{description}</p>

      {/* 카테고리 태그 */}
      <div className="flex flex-wrap gap-2">
        {category.map((cat) => (
          <span
            key={cat}
            className="px-2.5 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
    </button>
  );
}
