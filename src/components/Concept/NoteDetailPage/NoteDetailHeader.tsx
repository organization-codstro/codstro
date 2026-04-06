//노트의 메타데이터 표시

import { NoteDetailHeaderProps } from "../../../types/pages/Concept/NoteDetailPage/NoteDetailHeader";

export default function NoteDetailHeader({
  title,
  concepts,
  lastUpdated,
}: NoteDetailHeaderProps) {
  return (
    <div className="flex-1 mt-2">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
      {/* <div className="flex flex-wrap gap-2 mb-4"></div> */}
      <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
    </div>
  );
}
