import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Save, Loader2 } from "lucide-react";

// 공통 컴포넌트
import BackButton from "../../components/Concepts/BackButton";
import ConceptSelector from "../../components/Concepts/ConceptSelector";
import NoteEditor from "../../components/Concepts/NoteCreatePage/NoteEditor";
import { LoginService } from "../../api/Auth/LoginPage";
import { NoteUpdateService } from "../../api/Concepts/NoteUpdatePage";
import { MATERIAL_TYPE, typeMap } from "../../constants/Concepts/concepts";
import { ConceptItem } from "../../types/common/concepts";
import { ConceptsService } from "../../api/Concepts/Concepts";
import NoteInput from "../../components/Concepts/NoteCreatePage/NoteInput";

export default function NoteUpdatePage() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  // 1. 상태 관리
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedConcepts, setSelectedConcepts] = useState<ConceptItem[]>([]); // 여기서는 ID 배열로 관리

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showConceptSelector, setShowConceptSelector] = useState(true);

  const [activeFilter, setActiveFilter] = useState<MATERIAL_TYPE | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(0); // 0-based (UI용)
  const [availableConcepts, setAvailableConcepts] = useState<ConceptItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingConcepts, setIsLoadingConcepts] = useState(false);

  // 2. 초기 데이터 로드 (유저 세션 및 기존 노트)
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (noteId) {
          const noteData = await NoteUpdateService.getNoteById({ noteId });
          setTitle(noteData.note_title);
          setDescription(noteData.note_description);
          setContent(noteData.note_content || "");

          const { noteConceptIds } = await NoteUpdateService.getNoteConcepts({
            NoteId: noteId,
          });
          setSelectedConcepts(noteConceptIds);
        }
      } catch (error) {
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, [noteId]);

  // 필터/페이지 변경 시 API 호출
  useEffect(() => {
    if (!showConceptSelector) return;

    const fetchConcepts = async () => {
      try {
        setIsLoadingConcepts(true);

        // API 호출 (변경된 반환 타입 사용)
        const { data, hasMore } = await ConceptsService.getConceptsByType({
          type: activeFilter,
          page: currentPage + 1, // 1-based
        });

        //availableConcepts 세팅
        setAvailableConcepts(
          data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: typeMap[item.type] ?? item.type,
          })),
        );

        // totalPages 계산 (hasMore 사용)
        setTotalPages(currentPage + 1 + (hasMore ? 1 : 0));
      } catch (error) {
        console.error(error);
        toast.error("개념 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoadingConcepts(false);
      }
    };

    fetchConcepts();
  }, [activeFilter, currentPage, showConceptSelector]);

  // 3. 핸들러 로직

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 개념 선택 토글 (ID 기반)
  const handleConceptToggle = (concept: ConceptItem) => {
    setSelectedConcepts(
      (prev) =>
        prev.some((c) => c.id === concept.id)
          ? prev.filter((c) => c.id !== concept.id) // 이미 선택된 경우 제거
          : [...prev, concept], // 새로 선택된 경우 추가
    );
  };
  // [AI 서비스] 선택된 개념 기반 초안 생성
  const handleGenerateWithAI = async () => {
    if (selectedConcepts.length === 0) {
      toast.warning("최소 하나 이상의 개념을 선택해주세요.");
      return;
    }

    try {
      // setIsGeneratingAI(true);
      // const selectedNames = availableConcepts
      //   .filter((c) => selectedConcepts.some((s) => s.id === c.id))
      //   .map((c) => c.name);

      // const aiContent = await NoteUpdateService.generateNoteContent({
      //   concepts: selectedNames,
      // });

      // setContent(aiContent);
      toast.success("AI가 노트 초안을 생성했습니다!");
    } catch (error) {
      toast.error("AI 콘텐츠 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // [저장] 노트 저장 및 수정
  const handleSave = async () => {
    if (!userId || !noteId) return;
    if (!title.trim() || !content.trim()) {
      toast.warning("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      await NoteUpdateService.updateNote({
        id: noteId,
        userId,
        title,
        content,
        labels: ["personal", "study"],
        concept: selectedConcepts,
        description,
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

  const handleFilterChange = (type: MATERIAL_TYPE | "all") => {
    setActiveFilter(type);
    setCurrentPage(0); // 필터 변경 시 첫 페이지로
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

        <NoteInput title={"name"} value={title} onChange={setTitle} />

        <NoteInput
          title={"description"}
          value={description}
          onChange={setDescription}
        />

        {showConceptSelector ? (
          <ConceptSelector
            availableConcepts={availableConcepts}
            selectedConcepts={selectedConcepts}
            onToggle={handleConceptToggle}
            onHide={() => setShowConceptSelector(false)}
            onGenerateAI={handleGenerateWithAI}
            isGenerating={isGeneratingAI}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoadingConcepts={isLoadingConcepts}
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
