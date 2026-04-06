import { Edit, ExternalLink, Info, Loader2, Trash2 } from "lucide-react";
import { ConceptActionButtonsProps } from "../../../types/pages/Concept/ConceptDetailPage/ConceptActionButtons";

export default function ConceptActionButtons({
  onEdit,
  onEditMeta,
  onDelete,
  isDeleting = false,
  deleteConfirmMode,
  officialSite,
}: ConceptActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 mt-1.5">
      {/* 버튼 그룹 */}
      <div className="flex gap-2">
        {/* 마크다운 편집 */}
        <button
          onClick={onEdit}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>

        {/* 기본 정보 편집 (이름 / 설명 / 라벨) */}
        <button
          onClick={onEditMeta}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Info className="w-4 h-4" />
          Info
        </button>

        {/* 삭제 */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className={`
            flex items-center justify-center w-11 h-11 rounded-lg border transition-all duration-300
            ${
              deleteConfirmMode
                ? "bg-red-500 border-red-500 text-white"
                : "bg-white border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-400"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Official Documentation 링크 */}
      <div className="flex justify-end mt-1">
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
    </div>
  );
}
