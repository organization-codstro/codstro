//편집과 삭제 기능을 모아둔 버튼 컴포넌트

import { Edit, Loader2, Trash2 } from "lucide-react";
import { NoteActionButtonsProps } from "../../../types/pages/Concepts/NoteDetailPage/NoteActionButtons";

export default function NoteActionButtons({
  onEdit,
  onDelete,
  isDeleting = false, // 기본값 설정
}: NoteActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        disabled={isDeleting}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleting}
        className={`flex items-center gap-2 px-4 py-2 transition-colors border rounded-lg ${
          isDeleting
            ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
            : "text-red-600 border-red-300 hover:bg-red-50"
        }`}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
