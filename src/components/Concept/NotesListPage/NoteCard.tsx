import { Calendar } from "lucide-react";
import { NoteCardProps } from "../../../types/pages/Concept/NotesListPage/NoteCard";

export default function NoteCard({
  id,
  title,
  description,
  concepts,
  lastUpdated,
  onClick,
}: NoteCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-1">
        {title}
      </h3>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {concepts.map((concept, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-blue-600 rounded-full bg-blue-50"
          >
            {concept}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {lastUpdated && (
          <>
            <Calendar className="w-4 h-4" />
            Updated{" "}
            {`${new Date(lastUpdated).getFullYear()} ${String(new Date(lastUpdated).getMonth() + 1).padStart(2, "0")} ${String(new Date(lastUpdated).getDate()).padStart(2, "0")}`}
          </>
        )}
      </div>
    </div>
  );
}
