import { Edit, Info, Loader2, Trash2 } from "lucide-react";
import { NoteActionButtonsProps } from "../../../types/pages/Concept/NoteDetailPage/NoteActionButtons";

export const NoteActionButtons = ({
  onEdit,
  onEditMeta,
  onDelete,
  isDeleting = false,
  deleteConfirmMode,
}: NoteActionButtonsProps) => {
  return (
    <div className="flex gap-2 mt-1.5">
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
  );
}
