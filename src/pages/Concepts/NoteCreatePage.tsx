import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { note } from "../../data/Concepts/notes";
import { availableConcepts } from "../../data/Concepts/NoteCreatePage/NoteCreatePage";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import BackButton from "../../components/Concepts/BackButton";
import NoteTitleInput from "../../components/Concepts/NoteCreatePage/NoteTitleInput";
import ConceptSelector from "../../components/Concepts/NoteCreatePage/ConceptSelector";
import NoteEditor from "../../components/Concepts/NoteCreatePage/NoteEditor";

export default function NoteCreate() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  // 기존 노트 수정 모드 여부
  const existingNote = note;

  // 상태 관리
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>(
    existingNote?.concepts || []
  );
  const [showConceptSelector, setShowConceptSelector] = useState(true);

  // 핸들러 로직
  const handleConceptToggle = (conceptName: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(conceptName)
        ? prev.filter((c) => c !== conceptName)
        : [...prev, conceptName]
    );
  };

  const handleGenerateWithAI = () => {
    toast.info(
      "AI generation feature: 선택한 개념을 기반으로 초기 콘텐츠를 생성합니다."
    );
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("제목과 내용을 모두 입력해주세요.");
      return;
    }
    toast.success("노트가 성공적으로 저장되었습니다!");
    navigate("/notes");
  };

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <BackButton to="/notes" label="Back to Notes" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          {existingNote ? "Edit Note" : "Create New Note"}
        </h1>

        <NoteTitleInput value={title} onChange={setTitle} />

        {showConceptSelector ? (
          <ConceptSelector
            availableConcepts={availableConcepts}
            selectedConcepts={selectedConcepts}
            onToggle={handleConceptToggle}
            onHide={() => setShowConceptSelector(false)}
            onGenerateAI={handleGenerateWithAI}
          />
        ) : (
          <button
            onClick={() => setShowConceptSelector(true)}
            className="mb-4 text-sm text-blue-600 hover:text-blue-700"
          >
            + Add more concepts
          </button>
        )}

        <NoteEditor value={content} onChange={setContent} />

        {/* 저장/취소 버튼 그룹 */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Note
          </button>
          <button
            onClick={() => navigate("/notes")}
            className="px-6 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
