import { EmptyNotesStateProps } from "../../../types/pages/Concept/NotesListPage/EmptyNotesState";

export default function EmptyNotesState({
  onCreateClick,
}: EmptyNotesStateProps) {
  return (
    <div className="py-12 text-center">
      <p className="mb-4 text-gray-500">No notes yet</p>
      <button
        onClick={onCreateClick}
        className="font-medium text-blue-600 hover:text-blue-700"
      >
        Create your first note
      </button>
    </div>
  );
}
