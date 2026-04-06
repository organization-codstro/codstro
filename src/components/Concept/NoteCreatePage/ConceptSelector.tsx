import { ChevronLeft, ChevronRight } from "lucide-react";
import { ConceptSelectorProps } from "../../../types/pages/Concept/NoteCreatePage/ConceptSelector";
import { ConceptItem } from "../../../types/common/Concepts";

export default function ConceptSelector({
  availableConcepts,
  selectedConcepts,
  onToggle,
  currentPage,
  totalPages,
  onPageChange,
  isLoadingConcepts = false,
}: ConceptSelectorProps) {
  const isSelected = (concept: ConceptItem) =>
    selectedConcepts.some((c) => c.id === concept.id);

  return (
    <div className="p-4 mb-6 rounded-lg bg-gray-50">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Concepts to Include
        </label>
      </div>

      {/* 카드 그리드 + 좌우 화살표 */}
      <div className="relative flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isLoadingConcepts}
          className="p-1 text-gray-500 transition-colors rounded-full shrink-0 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 gap-3 flex-1 md:grid-cols-4 min-h-[120px]">
          {isLoadingConcepts ? (
            <div className="flex items-center justify-center col-span-4 py-8 text-sm text-gray-400">
              Loading...
            </div>
          ) : availableConcepts.length === 0 ? (
            <div className="flex items-center justify-center col-span-4 py-8 text-sm text-gray-400">
              No concepts found
            </div>
          ) : (
            availableConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => onToggle(concept)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  isSelected(concept)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-semibold">{concept.name}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {concept.category?.join(", ")}
                </div>
              </button>
            ))
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || isLoadingConcepts}
          className="p-1 text-gray-500 transition-colors rounded-full shrink-0 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              disabled={isLoadingConcepts}
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
