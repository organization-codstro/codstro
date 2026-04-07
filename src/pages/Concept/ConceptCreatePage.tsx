import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Save, Loader2, X } from "lucide-react";
import BackButton from "../../components/Concept/BackButton";
import ConceptTitleInput from "../../components/Concept/ConceptCreatePage/ConceptInput";
import ConceptEditor from "../../components/Concept/ConceptCreatePage/ConceptEditor";
import { LoginService } from "../../api/Auth/LoginPage";
import { ConceptCreateService } from "../../api/Concept/ConceptCreatePage";
import { ConceptItem } from "../../types/common/Concepts";

export default function ConceptCreatePage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(""); // → concept_name
  const [description, setDescription] = useState(""); // → concept_description
  const [prompt, setPrompt] = useState<string>(""); // → Edge Function 전달용
  const [selectedConcepts, setSelectedConcepts] = useState<ConceptItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]); // → concept_category
  const [categoryInput, setCategoryInput] = useState("");

  // 초기 유저 정보
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);
      } catch (error) {
        toast.error("유저 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  // 개념 선택 토글
  const handleConceptToggle = (concept: ConceptItem) => {
    setSelectedConcepts((prev) =>
      prev.some((c) => c.id === concept.id)
        ? prev.filter((c) => c.id !== concept.id)
        : [...prev, concept],
    );
  };

  // 카테고리 추가 (엔터)
  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (e.nativeEvent.isComposing) return;
    e.preventDefault();
    const trimmed = categoryInput.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      toast.warning("이미 추가된 카테고리입니다.");
      return;
    }
    setCategories((prev) => [...prev, trimmed]);
    setCategoryInput("");
  };

  // 카테고리 제거
  const handleCategoryRemove = (value: string) => {
    setCategories((prev) => prev.filter((c) => c !== value));
  };

  // 컨셉 생성
  const handleCreate = async () => {
    if (!userId || !title.trim() || !prompt.trim()) {
      toast.warning("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      setIsSaving(true);

      const conceptPayload = selectedConcepts.map((c) => ({ id: c.id }));

      const savingToast = toast.loading("개념을 저장하는 중...");
      await ConceptCreateService.createConcept({
        userId,
        title, // → concept_name
        prompt, // → Edge Function 전달용
        description, // → concept_description
        categories, // → concept_category
        concepts: conceptPayload,
      });

      toast.update(savingToast, {
        render: "AI가 개념을 작성하는 중...",
        type: "info",
        isLoading: true,
      });

      toast.update(savingToast, {
        render: "컨셉이 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/concepts");
    } catch (error) {
      console.error(error);
      toast.error("컨셉 생성에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return <div className="p-20 text-center">컨셉 정보를 불러오는 중...</div>;

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <BackButton to="/concepts" label="Back to Concepts" />
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Create New Concept
        </h1>

        <ConceptTitleInput title={"title"} value={title} onChange={setTitle} />
        <ConceptTitleInput
          title={"description"}
          value={description}
          onChange={setDescription}
        />

        {/* Categories (→ concept_category ARRAY) */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Categories
          </label>
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleCategoryKeyDown}
            placeholder="카테고리 입력 후 Enter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleCategoryRemove(cat)}
                    className="ml-1 text-blue-400 hover:text-blue-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <ConceptEditor value={prompt} onChange={setPrompt} />

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
            Create Concept
          </button>
          <button
            onClick={() => navigate("/concepts")}
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
