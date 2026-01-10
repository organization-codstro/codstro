import { Plus } from "lucide-react";
import { NotesListHeaderProps } from "../../../types/pages/Concepts/NotesListPage/NotesListHeader";

export default function NotesListHeader({
  title,
  description,
  onCreateClick,
}: NotesListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        Create Note
      </button>
    </div>
  );
}
