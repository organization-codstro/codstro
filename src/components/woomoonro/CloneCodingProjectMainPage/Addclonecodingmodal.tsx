import { useState, useRef, KeyboardEvent } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { AddCloneCodingModalProps } from "../../../types/pages/Woomoonro/CloneCodingProjectMainPage/AddCloneCodingModal";
import { CloneCodingProjectMainPageService } from "../../../api/Woomoonro/CloneCodingProjectMainPage";
import { DIFFICULTY_LEVELS } from "../../../constants/Woomoonro/Woomoonro";

export default function AddCloneCodingModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
}: AddCloneCodingModalProps) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [features, setFeatures] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [gitUrl, setGitUrl] = useState("");
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [libraries, setLibraries] = useState<string[]>([]);
  const [fwInput, setFwInput] = useState("");
  const [libInput, setLibInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fwInputRef = useRef<HTMLInputElement>(null);
  const libInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setTopic("");
    setFeatures("");
    setSelectedLevel(null);
    setGitUrl("");
    setFrameworks([]);
    setLibraries([]);
    setFwInput("");
    setLibInput("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTagKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: "fw" | "lib",
  ) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== "Enter") return;

    e.preventDefault();

    const val = (type === "fw" ? fwInput : libInput).trim();

    if (!val) return;

    if (type === "fw") {
      if (!frameworks.includes(val)) {
        setFrameworks((prev) => [...prev, val]);
      }
      setFwInput("");
    } else {
      if (!libraries.includes(val)) {
        setLibraries((prev) => [...prev, val]);
      }
      setLibInput("");
    }
  };

  const removeTag = (type: "fw" | "lib", value: string) => {
    if (type === "fw") {
      setFrameworks((prev) => prev.filter((t) => t !== value));
    } else {
      setLibraries((prev) => prev.filter((t) => t !== value));
    }
  };

  const handleSubmit = async () => {
    if (!name || !topic || !features || !selectedLevel) return;

    setIsLoading(true);
    try {
      await CloneCodingProjectMainPageService.generateCloneCoding({
        userId,
        name,
        topic,
        features,
        level: selectedLevel as 1 | 2 | 3 | 4 | 5,
        ...(frameworks.length > 0 && { frameworks }),
        ...(libraries.length > 0 && { libraries }),
      });

      toast.success("클론코딩 프로젝트가 생성되었습니다!");
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "생성에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = !!name && !!topic && !!features && !!selectedLevel;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              새 클론코딩 추가
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              AI가 프로젝트 정보를 자동으로 생성합니다
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          {/* 이름 + 주제 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex) Netflix 홈 클론"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">주제</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ex) 스트리밍 플랫폼 UI"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* 클론 기능 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">
              클론하고 싶은 기능
            </label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="ex) Netflix 홈 화면, 콘텐츠 슬라이더, 모달 재생 미리보기"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent resize-none transition-all"
            />
          </div>

          {/* 난이도 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500">난이도</label>
            <div className="grid grid-cols-5 gap-2">
              {DIFFICULTY_LEVELS.map(({ level, label, icon: Icon }) => {
                const isSelected = selectedLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border transition-all text-center ${
                      isSelected
                        ? "border-[#587CF0] bg-[#EEF2FF] text-[#587CF0]"
                        : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-medium leading-tight">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Git URL — 레벨 5 선택 시만 */}
          {selectedLevel === 5 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                Git URL{" "}
                <span className="font-normal text-gray-400">
                  (참고할 레포지토리)
                </span>
              </label>
              <input
                type="text"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* 프레임워크 + 라이브러리 태그 입력 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 프레임워크 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                프레임워크
              </label>
              <div
                onClick={() => fwInputRef.current?.focus()}
                className="min-h-[42px] flex flex-col gap-2 px-3 py-2 border border-gray-200 rounded-xl cursor-text focus-within:ring-2 focus-within:ring-[#587CF0] focus-within:border-transparent transition-all"
              >
                <input
                  ref={fwInputRef}
                  type="text"
                  value={fwInput}
                  onChange={(e) => setFwInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, "fw")}
                  placeholder={frameworks.length === 0 ? "선택사항" : ""}
                  className="w-full text-sm text-gray-700 placeholder-gray-300 bg-transparent border-none outline-none"
                />
              </div>

              {frameworks.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {frameworks.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#3B5BDB] text-xs font-medium px-2 py-0.5 rounded-md"
                    >
                      {tag}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag("fw", tag);
                        }}
                        className="text-[#3B5BDB] hover:text-[#1E3A8A] transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 라이브러리 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                라이브러리
              </label>
              <div
                onClick={() => libInputRef.current?.focus()}
                className="min-h-[42px] flex flex-col gap-2 px-3 py-2 border border-gray-200 rounded-xl cursor-text focus-within:ring-2 focus-within:ring-[#587CF0] focus-within:border-transparent transition-all"
              >
                <input
                  ref={libInputRef}
                  type="text"
                  value={libInput}
                  onChange={(e) => setLibInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, "lib")}
                  placeholder={libraries.length === 0 ? "선택사항" : ""}
                  className="w-full text-sm text-gray-700 placeholder-gray-300 bg-transparent border-none outline-none"
                />
              </div>

              {libraries.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {libraries.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#3B5BDB] text-xs font-medium px-2 py-0.5 rounded-md"
                    >
                      {tag}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag("lib", tag);
                        }}
                        className="text-[#3B5BDB] hover:text-[#1E3A8A] transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="flex items-center justify-center w-full gap-2 py-3 text-sm font-medium text-white transition-all rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#587CF0" }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                AI가 생성 중입니다...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                AI로 클론코딩 생성하기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
