import { CheckCircle, ExternalLink } from "lucide-react";
import { ThirdPartyHeaderProps } from "../../../types/pages/Concepts/ThirdPartyDetailPage/ThirdPartyHeader";

export default function ThirdPartyHeader({
  name,
  category,
  description,
  officialSite,
  isUnderstood,
  onToggleUnderstood,
}: ThirdPartyHeaderProps) {
  return (
    <div className="relative">
      {/* 1. 학습 완료 토글 버튼 (우측 상단 고정) */}
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

      {/* 2. 서비스 제목 */}
      <div className="flex items-center gap-3 mb-2 pr-40">
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      </div>

      {/* 3. 서비스 설명 */}
      <p className="mb-4 text-gray-600 max-w-2xl">{description}</p>

      {/* 4. 카테고리 태그 리스트 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {category.map((categoryTerm, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm text-orange-600 rounded-full bg-orange-50"
          >
            {categoryTerm}
          </span>
        ))}
      </div>

      {/* 5. 공식 웹사이트 링크 */}
      <a
        href={officialSite || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ExternalLink className="w-4 h-4" />
        Official Website
      </a>
    </div>
  );
}
