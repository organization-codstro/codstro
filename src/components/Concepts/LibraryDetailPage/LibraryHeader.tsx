import { ExternalLink, CheckCircle } from "lucide-react";
import { LibraryHeaderProps } from "../../../types/pages/Concepts/LibraryDetailPage/LibraryHeader";

// 만약 LibraryHeaderProps에 아래 두 속성이 없다면 추가가 필요합니다.
interface ExtendedLibraryHeaderProps extends LibraryHeaderProps {
  isUnderstood: boolean;
  onToggleUnderstood: () => void;
}

export default function LibraryHeader({
  name,
  language,
  description,
  category,
  officialSite,
  isUnderstood,
  onToggleUnderstood,
}: ExtendedLibraryHeaderProps) {
  return (
    <div className="relative">
      {/* 우측 상단 학습 완료 버튼 */}
      <div className="absolute top-0 right-0">
        <button
          onClick={onToggleUnderstood}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            isUnderstood
              ? "bg-green-50 border-green-200 text-green-600 shadow-sm"
              : "bg-white border-gray-200 text-gray-400 hover:border-green-200 hover:text-green-500"
          }`}
        >
          <CheckCircle
            className={`w-5 h-5 ${
              isUnderstood ? "fill-green-600 text-white" : ""
            }`}
          />
          <span className="text-sm font-medium">
            {isUnderstood ? "Completed" : "Mark as Learned"}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3 mb-2 pr-40">
        {" "}
        {/* 버튼과 겹치지 않게 패딩 추가 */}
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
          {language}
        </span>
      </div>

      <p className="mb-4 text-gray-600 max-w-2xl">{description}</p>

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
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ExternalLink className="w-4 h-4" />
        Official Documentation
      </a>
    </div>
  );
}
