//편집과 삭제 기능을 모아둔 버튼 컴포넌트

import { Edit, Trash2 } from "lucide-react";
import { NoteActionButtonsProps } from "../../../types/pages/Concepts/NoteDetailPage/NoteActionButtons";

export default function NoteActionButtons({
  onEdit,
  onDelete,
}: NoteActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2 text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
