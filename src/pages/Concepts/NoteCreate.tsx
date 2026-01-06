import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { note } from "../../data/Concepts/notes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoteCreate() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  const existingNote = note;

  const [title, setTitle] = useState(existingNote?.title || "");
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>(
    existingNote?.concepts || []
  );
  const [content, setContent] = useState(existingNote?.content || "");
  const [showConceptSelector, setShowConceptSelector] = useState(true);

  const availableConcepts = [
    { id: "1", name: "React", type: "library" },
    { id: "2", name: "REST API", type: "concept" },
    { id: "3", name: "JavaScript", type: "concept" },
    { id: "4", name: "TypeScript", type: "library" },
    { id: "5", name: "Node.js", type: "library" },
    { id: "6", name: "Git", type: "tool" },
    { id: "7", name: "Docker", type: "tool" },
    { id: "8", name: "AWS", type: "service" },
  ];

  const handleConceptToggle = (conceptName: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(conceptName)
        ? prev.filter((c) => c !== conceptName)
        : [...prev, conceptName]
    );
  };

  const handleGenerateWithAI = () => {
    toast.info(
      "AI generation feature: 선택한 개념을 기반으로 초기 콘텐츠를 생성합니다.",
      {
        position: "top-right",
      }
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.warning("노트 제목을 입력해주세요.", {
        position: "top-right",
      });
      return;
    }

    if (!content.trim()) {
      toast.warning("노트 내용을 입력해주세요.", {
        position: "top-right",
      });
      return;
    }

    toast.success("노트가 성공적으로 저장되었습니다!", {
      position: "top-right",
    });

    navigate("/notes");
  };

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <button
        onClick={() => navigate("/notes")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Notes
      </button>

      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          {existingNote ? "Edit Note" : "Create New Note"}
        </h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Note Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {showConceptSelector && (
          <div className="p-4 mb-6 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Concepts to Include
              </label>
              <button
                onClick={() => setShowConceptSelector(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-4">
              {availableConcepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => handleConceptToggle(concept.name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedConcepts.includes(concept.name)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-semibold">{concept.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {concept.type}
                  </div>
                </button>
              ))}
            </div>

            {selectedConcepts.length > 0 && (
              <button
                onClick={handleGenerateWithAI}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Sparkles className="w-4 h-4" />
                Generate Initial Content with AI
              </button>
            )}
          </div>
        )}

        {!showConceptSelector && (
          <button
            onClick={() => setShowConceptSelector(true)}
            className="mb-4 text-sm text-blue-600 hover:text-blue-700"
          >
            + Add more concepts
          </button>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <span className="text-xs text-gray-500">Markdown supported</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes in markdown format..."
            className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg h-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Note
          </button>
          <button
            onClick={() => navigate("/notes")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
