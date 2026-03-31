import { ChevronLeft, ChevronRight } from "lucide-react";
import { ConceptSelectorProps } from "../../types/pages/Concepts/NoteCreatePage/ConceptSelector";
import { FILTER_TYPES } from "../../constants/Concepts/concepts";
import { ConceptItem } from "../../types/common/Concepts";

export default function ConceptSelector({
  availableConcepts,
  selectedConcepts,
  onToggle,
  isGenerating = false,
  activeFilter,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  isLoadingConcepts = false,
}: ConceptSelectorProps) {
  const isSelected = (concept: ConceptItem) =>
    selectedConcepts.some((c) => c.id === concept.id);

  console.log(availableConcepts);

  return (
    <div className="p-4 mb-6 rounded-lg bg-gray-50">
      {/* 헤더: 제목 + 필터 버튼 + Hide */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <label className="block text-sm font-medium text-gray-700 shrink-0">
          Select Concepts to Include
        </label>

        {/* 필터 버튼 그룹 */}
        <div className="flex items-center gap-1.5 flex-wrap flex-1 justify-end">
          {FILTER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              disabled={isGenerating || isLoadingConcepts}
              className={`px-3 py-1 text-xs rounded-md border transition-all ${
                activeFilter === type
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              } ${isGenerating || isLoadingConcepts ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {type === "all" ? "All" : type}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 + 좌우 화살표 */}
      <div className="relative flex items-center gap-2">
        {/* 이전 버튼 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isGenerating || isLoadingConcepts}
          className="p-1 text-gray-500 transition-colors rounded-full shrink-0 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 gap-3 flex-1 md:grid-cols-4 min-h-[120px]">
          {availableConcepts.length === 0 ? (
            <div className="flex items-center justify-center col-span-4 py-8 text-sm text-gray-400">
              No concepts found
            </div>
          ) : (
            availableConcepts.map((concept) => (
              <button
                key={`${concept.type}-${concept.id}`}
                onClick={() => onToggle(concept)}
                disabled={isGenerating}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  isSelected(concept)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-semibold">{concept.name}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {concept.type}
                </div>
              </button>
            ))
          )}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={
            currentPage >= totalPages - 1 || isGenerating || isLoadingConcepts
          }
          className="p-1 text-gray-500 transition-colors rounded-full shrink-0 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 페이지 닷 인디케이터 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              disabled={isGenerating || isLoadingConcepts}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage
                  ? "bg-gray-600 w-3"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
