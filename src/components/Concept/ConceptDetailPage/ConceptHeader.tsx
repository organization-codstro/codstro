import { ExternalLink } from "lucide-react";
import { LibraryHeaderProps } from "../../../types/pages/Concept/ConceptDetailPage/ConceptHeader";

export default function ConceptHeader({
  name,
  field,
  description,
  category,
  officialSite,
}: LibraryHeaderProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 pr-40 mb-2">
        {" "}
        {/* 버튼과 겹치지 않게 패딩 추가 */}
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
          {field}
        </span>
      </div>

      <p className="max-w-2xl mb-4 text-gray-600">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {category.map((categoryItem, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
          >
            {categoryItem}
          </span>
        ))}
      </div>

      <a
        href={officialSite || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
      >
        <ExternalLink className="w-4 h-4" />
        Official Documentation
      </a>
    </div>
  );
}
