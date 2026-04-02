//노트의 메타데이터 표시

import { NoteDetailHeaderProps } from "../../../types/pages/Concept/NoteDetailPage/NoteDetailHeader";

export default function NoteDetailHeader({
  title,
  concepts,
  lastUpdated,
}: NoteDetailHeaderProps) {
  return (
    <div className="flex-1">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {concepts.map((concept, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
          >
            {concept}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
    </div>
  );
}
