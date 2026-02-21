import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Save, Loader2 } from "lucide-react";

// 서비스 및 타입
import { availableConcepts as mockConcepts } from "../../data/Concepts/NoteCreatePage/NoteCreatePage";

// 공통 컴포넌트
import BackButton from "../../components/Concepts/BackButton";
import NoteTitleInput from "../../components/Concepts/NoteCreatePage/NoteTitleInput";
import ConceptSelector from "../../components/Concepts/NoteCreatePage/ConceptSelector";
import NoteEditor from "../../components/Concepts/NoteCreatePage/NoteEditor";
import { LoginService } from "../../api/Auth/LoginPage";
import { NoteCreateService } from "../../api/Concepts/NoteCreatePage";

export default function NoteCreatePage() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  //todo 404 페이지 넣기
  if (!noteId) {
    return <div>404 페이지</div>;
  }

  // 1. 상태 관리
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]); // 여기서는 ID 배열로 관리

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showConceptSelector, setShowConceptSelector] = useState(true);

  // 2. 초기 데이터 로드 (유저 세션 및 기존 노트)
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (noteId) {
          const noteData = await NoteCreateService.getNoteById({ noteId });
          setTitle(noteData.note_title);
          setContent(noteData.note_content || "");
          // 연관 개념 로드 로직은 서비스에서 추가 구현 필요 (현재는 본문 위주)
        }
      } catch (error) {
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, [noteId]);

  // 3. 핸들러 로직

  // 개념 선택 토글 (ID 기반)
  const handleConceptToggle = (conceptId: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(conceptId)
        ? prev.filter((id) => id !== conceptId)
        : [...prev, conceptId],
    );
  };

  // [AI 서비스] 선택된 개념 기반 초안 생성
  const handleGenerateWithAI = async () => {
    if (selectedConcepts.length === 0) {
      toast.warning("최소 하나 이상의 개념을 선택해주세요.");
      return;
    }

    try {
      setIsGeneratingAI(true);
      // ID를 이름으로 변환하여 AI에게 전달 (mockConcepts 활용)
      const selectedNames = mockConcepts
        .filter((c) => selectedConcepts.includes(c.id))
        .map((c) => c.name);

      const aiContent = await NoteCreateService.generateNoteContent({
        concepts: selectedNames,
      });

      setContent(aiContent);
      toast.success("AI가 노트 초안을 생성했습니다!");
    } catch (error) {
      toast.error("AI 콘텐츠 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // [저장] 노트 저장 및 수정
  const handleSave = async () => {
    if (!userId) return;
    if (!title.trim() || !content.trim()) {
      toast.warning("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      await NoteCreateService.saveNote({
        id: noteId,
        userId,
        title,
        content,
        labels: ["personal", "study"],
        conceptIds: selectedConcepts.map((id) => id),
      });

      toast.success(
        noteId ? "노트가 수정되었습니다!" : "새 노트가 저장되었습니다!",
      );
      navigate("/notes");
    } catch (error) {
      console.error(error);
      toast.error("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return <div className="p-20 text-center">노트 정보를 불러오는 중...</div>;

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <BackButton to="/notes" label="Back to Notes" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          {noteId ? "Edit Note" : "Create New Note"}
        </h1>

        <NoteTitleInput value={title} onChange={setTitle} />

        {showConceptSelector ? (
          <ConceptSelector
            availableConcepts={mockConcepts}
            selectedConcepts={selectedConcepts}
            onToggle={handleConceptToggle}
            onHide={() => setShowConceptSelector(false)}
            onGenerateAI={handleGenerateWithAI}
            isGenerating={isGeneratingAI} // AI 생성 로딩 상태 전달
          />
        ) : (
          <div className="mb-6">
            <button
              onClick={() => setShowConceptSelector(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              + Add more concepts
            </button>
          </div>
        )}

        <NoteEditor value={content} onChange={setContent} />

        {/* 하단 액션 버튼 그룹 */}
        <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {noteId ? "Update Note" : "Save Note"}
          </button>

          <button
            onClick={() => navigate("/notes")}
            disabled={isSaving}
            className="px-6 py-2.5 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
