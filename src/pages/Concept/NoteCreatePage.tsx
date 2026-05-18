import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Save, Loader2 } from "lucide-react";

import { BackButton } from "../../components/Concept/BackButton";
import { NoteInput } from "../../components/Concept/NoteCreatePage/NoteInput";
import { ConceptSelector } from "../../components/Concept/NoteCreatePage/ConceptSelector";
import { NoteEditor } from "../../components/Concept/NoteCreatePage/NoteEditor";
import { LoginService } from "../../api/Auth/LoginPage";
import { NoteCreateService } from "../../api/Concept/NoteCreatePage";
import { LABEL_OPTIONS } from "../../constants/Concepts/Concepts";
import { ConceptItem } from "../../types/common/Concepts";

export default function NoteCreatePage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState<string>("");
  const [selectedConcepts, setSelectedConcepts] = useState<ConceptItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConceptSelector, setShowConceptSelector] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [availableConcepts, setAvailableConcepts] = useState<ConceptItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingConcepts, setIsLoadingConcepts] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([
    "personal",
    "study",
  ]);

  // 초기 유저 정보
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);
      } catch (error) {
        toast.error("유저 정보를 불러오는데 실패했습니다.");
        console.log("유저 정보 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  // 필터/페이지 변경 시 concepts 조회
  useEffect(() => {
    if (!showConceptSelector) return;
    const fetchConcepts = async () => {
      try {
        setIsLoadingConcepts(true);
        const { data, hasMore } = await NoteCreateService.getConceptsByType({
          type: activeFilter,
          page: currentPage + 1,
        });
        setAvailableConcepts(data);
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

  // 개념 선택 토글
  const handleConceptToggle = (concept: ConceptItem) => {
    setSelectedConcepts((prev) =>
      prev.some((c) => c.id === concept.id)
        ? prev.filter((c) => c.id !== concept.id)
        : [...prev, concept],
    );
  };

  // 라벨 선택 토글
  const handleLabelToggle = (value: string) => {
    setSelectedLabels((prev) =>
      prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value],
    );
  };

  // 노트 생성
  const handleCreate = async () => {
    if (!userId || !title.trim() || !prompt.trim()) {
      toast.warning("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      setIsSaving(true);

      const conceptPayload = selectedConcepts.map((c) => ({
        id: c.id,
      }));

      const savingToast = toast.loading("노트를 저장하는 중...");
      await NoteCreateService.createNote({
        userId,
        title,
        prompt,
        description,
        labels: selectedLabels,
        concepts: conceptPayload,
      });

      toast.update(savingToast, {
        render: "AI가 노트를 작성하는 중...",
        type: "info",
        isLoading: true,
      });

      toast.update(savingToast, {
        render: "노트가 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/notes");
    } catch (error) {
      console.error(error);
      toast.error("노트 생성에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFilterChange = (type: string) => {
    setActiveFilter(type);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return <div className="p-20 text-center">노트 정보를 불러오는 중...</div>;

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <BackButton to="/notes" label="Back to Notes" />
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Create New Note
        </h1>
        <NoteInput title={"title"} value={title} onChange={setTitle} />
        <NoteInput
          title={"description"}
          value={description}
          onChange={setDescription}
        />
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Labels
          </label>
          <div className="flex flex-wrap gap-2">
            {LABEL_OPTIONS.map((option) => {
              const isSelected = selectedLabels.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleLabelToggle(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {showConceptSelector ? (
          <ConceptSelector
            availableConcepts={availableConcepts}
            selectedConcepts={selectedConcepts}
            onToggle={handleConceptToggle}
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

        <NoteEditor value={prompt} onChange={setPrompt} />

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={handleCreate}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Create Note
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
