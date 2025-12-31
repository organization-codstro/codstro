import { Plus, Search, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notes } from "../../data/Concepts/notes";

export default function NotesList() {
  const navigate = useNavigate();

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Notes</h1>
          <p className="text-gray-600">
            Personal concept notes organized by you
          </p>
        </div>
        <button
          onClick={() => navigate("/notes/create")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Create Note
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate(`/notes/${note.id}`)}
            className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
          >
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              {note.title}
            </h3>
            <p className="mb-4 text-sm text-gray-600 line-clamp-2">
              {note.preview}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.concepts.map((concept, idx) => (
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
              Updated {note.lastUpdated}
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">No notes yet</p>
          <button
            onClick={() => navigate("/notes/create")}
            className="text-blue-600 hover:text-blue-700"
          >
            Create your first note
          </button>
        </div>
      )}
    </div>
  );
}
