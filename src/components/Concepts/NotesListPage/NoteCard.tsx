import { Calendar } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  concepts: string[];
  lastUpdated: string;
  onClick: (id: string) => void;
}

export default function NoteCard({
  id,
  title,
  preview,
  concepts,
  lastUpdated,
  onClick,
}: NoteCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-1">{title}</h3>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{preview}</p>
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
        <Calendar className="w-4 h-4" />
        Updated {lastUpdated}
      </div>
    </div>
  );
}