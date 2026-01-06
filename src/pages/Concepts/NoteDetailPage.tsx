import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { note } from "../../data/Concepts/notes";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";

export default function NoteDetail() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  if (!note) return <p className="p-8">Note not found.</p>;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <button
        onClick={() => navigate("/notes")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Notes
      </button>

      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {note.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
                >
                  {concept}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Last updated: {note.lastUpdated}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/notes/${note.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          <MarkdownRenderer content={note.content} />
        </div>
      </div>
    </div>
  );
}
