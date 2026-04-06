import { LibraryHeaderProps } from "../../../types/pages/Concept/ConceptDetailPage/ConceptHeader";

export default function ConceptHeader({
  name,
  field,
  description,
}: LibraryHeaderProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 pr-40 mt-2">
        {" "}
        {/* 버튼과 겹치지 않게 패딩 추가 */}
        <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
        <span className="px-3 py-1 mt-2 ml-2 text-sm text-gray-600 bg-gray-100 rounded">
          {field}
        </span>
      </div>

      <p className="max-w-2xl mt-4 mb-5 text-gray-600">{description}</p>
    </div>
  );
}
