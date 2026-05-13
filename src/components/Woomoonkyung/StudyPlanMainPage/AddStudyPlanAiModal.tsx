import { useState, useRef, KeyboardEvent } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { AddStudyPlanAiModalProps } from "../../../types/pages/Woomoonkyung/StudyPlanMainPage/AddStudyPlanAiModal";
import {
  EXPECTED_OUTPUTS,
  LEARNING_STYLES,
} from "../../../constants/Woomoonkyung/Woomoonkyung";

export default function AddStudyPlanAiModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  onSubmit,
}: AddStudyPlanAiModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const techInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setDescription("");
    setGoal("");
    setCurrentLevel("");
    setMaxHours("");
    setLearningStyle("");
    setExpectedOutput("");
    setStartDate("");
    setEndDate("");
    setTechStacks([]);
    setTechInput("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = techInput.trim();
    if (!val || techStacks.includes(val)) return;
    setTechStacks((prev) => [...prev, val]);
    setTechInput("");
  };

  const removeTech = (val: string) =>
    setTechStacks((prev) => prev.filter((t) => t !== val));

  const handleSubmit = async () => {
    if (
      !name ||
      !description ||
      !goal ||
      !learningStyle ||
      !expectedOutput ||
      !startDate ||
      !endDate
    )
      return;

    setIsLoading(true);

    try {
      await onSubmit({
        userId,
        name,
        description,
        goal,
        currentLevel: currentLevel || undefined,
        maxHours: maxHours ? Number(maxHours) : undefined,
        learningStyle,
        expectedOutput,
        startDate,
        endDate,
        techStacks,
      });

      toast.success("학습 계획이 생성되었습니다!");

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

  const isValid =
    !!name &&
    !!description &&
    !!goal &&
    !!learningStyle &&
    !!expectedOutput &&
    !!startDate &&
    !!endDate;

  const inputCls =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all";
  const labelCls = "text-xs font-medium text-gray-500";
  const requiredMark = <span className="text-red-400 ml-0.5">*</span>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              AI 학습 계획 생성
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              정보를 입력하면 AI가 맞춤 학습 계획을 만들어드려요
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
              <label className={labelCls}>이름{requiredMark}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex) React 마스터 플랜"
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>계획 설명 (주제){requiredMark}</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ex) React 기초부터 심화까지"
                className={inputCls}
              />
            </div>
          </div>

          {/* 학습 목표 */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>학습 목표{requiredMark}</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="ex) React로 풀스택 웹앱을 혼자 만들 수 있는 수준이 되고 싶다"
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* 현재 수준 + 최대 학습 시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                현재 수준{" "}
                <span className="font-normal text-gray-400">
                  (알고 있는 것)
                </span>
              </label>
              <textarea
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                placeholder="ex) HTML/CSS 기초, JavaScript 변수/함수 정도"
                rows={2}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                최대 학습 시간{" "}
                <span className="font-normal text-gray-400">(총 시간)</span>
              </label>
              <input
                type="number"
                value={maxHours}
                onChange={(e) => setMaxHours(e.target.value)}
                placeholder="ex) 100"
                min={1}
                className={inputCls}
              />
              <p className="text-xs text-gray-400">
                계획 전체에 투자할 수 있는 시간
              </p>
            </div>
          </div>

          {/* 학습 스타일 */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>학습 스타일{requiredMark}</label>
            <div className="grid grid-cols-5 gap-2">
              {LEARNING_STYLES.map(({ value, icon: Icon, desc }) => {
                const isSelected = learningStyle === value;
                return (
                  <button
                    key={value}
                    onClick={() => setLearningStyle(value)}
                    title={desc}
                    className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border transition-all text-center ${
                      isSelected
                        ? "border-[#587CF0] bg-[#EEF2FF] text-[#587CF0]"
                        : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-medium leading-tight">
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 최종 산출물 */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>최종 산출물{requiredMark}</label>
            <div className="flex flex-wrap gap-2">
              {EXPECTED_OUTPUTS.map(({ value, icon: Icon }) => {
                const isSelected = expectedOutput === value;
                return (
                  <button
                    key={value}
                    onClick={() => setExpectedOutput(value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-all ${
                      isSelected
                        ? "border-[#587CF0] bg-[#EEF2FF] text-[#587CF0]"
                        : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                    }`}
                  >
                    <Icon size={14} />
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 시작일 + 종료일 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>시작일{requiredMark}</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>종료일{requiredMark}</label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* 기술 스택 태그 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>
              기술 스택{" "}
              <span className="font-normal text-gray-400">(입력 후 Enter)</span>
            </label>
            <div
              onClick={() => techInputRef.current?.focus()}
              className="min-h-[42px] flex flex-col gap-2 px-3 py-2 border border-gray-200 rounded-xl cursor-text focus-within:ring-2 focus-within:ring-[#587CF0] focus-within:border-transparent transition-all"
            >
              <input
                ref={techInputRef}
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder={
                  techStacks.length === 0
                    ? "ex) React, TypeScript, Node.js"
                    : ""
                }
                className="w-full text-sm text-gray-700 placeholder-gray-300 bg-transparent border-none outline-none"
              />
            </div>

            {techStacks.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {techStacks.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#3B5BDB] text-xs font-medium px-2 py-0.5 rounded-md"
                  >
                    {tag}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTech(tag);
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
                AI가 계획을 생성 중입니다...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                AI로 학습 계획 생성하기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
