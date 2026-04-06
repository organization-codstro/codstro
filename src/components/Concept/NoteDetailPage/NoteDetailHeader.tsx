//노트의 메타데이터 표시

import { NoteDetailHeaderProps } from "../../../types/pages/Concept/NoteDetailPage/NoteDetailHeader";

export default function NoteDetailHeader({
  title,
  lastUpdated,
}: NoteDetailHeaderProps) {
  const formattedDate = new Date(lastUpdated)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, " ");

  return (
    <div className="flex-1 mt-2">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>

      <p className="text-sm text-gray-500">Last updated: {formattedDate}</p>
    </div>
  );
}
