import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { TestQuestionProps } from "../../types/pages/Mbit/TestQuestion";
import { LABELS } from "../../constants/Mbit/Mbit";

export const MajorTestQuestion: React.FC<TestQuestionProps> = ({
  content,
  scale,
  onAnswer,
  currentIndex,
  total,
  answeredCount,
  selectedValue,
  allAnswered,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const sorted = [...scale].sort((a, b) => b - a);
  const isLast = currentIndex === total - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        if (isLast && allAnswered) {
          onSubmit();
        } else if (!isLast) {
          onNext();
        }
        return;
      }
      const index = Number.parseInt(e.key) - 1;
      if (index >= 0 && index < sorted.length) {
        onAnswer(sorted[index]);
      }
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [
    sorted,
    onAnswer,
    onPrev,
    onNext,
    onSubmit,
    currentIndex,
    isLast,
    allAnswered,
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 bg-white shadow-xl rounded-2xl">
        {/* 문항 번호 / 응답 현황 */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-[#587CF0]">
            {currentIndex + 1} / {total} 문항
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {answeredCount} / {total} 완료
          </span>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-gray-800">{content}</h2>

        {/* 선택지 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          {sorted.map((value, idx) => {
            const isSelected = selectedValue === value;
            return (
              <button
                key={value}
                onClick={() => onAnswer(value)}
                className={`w-full p-6 text-left border-2 rounded-xl transition-all group ${
                  isSelected
                    ? "border-[#587CF0] bg-blue-50"
                    : "border-gray-200 hover:border-[#587CF0] hover:bg-blue-50"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-gray-400">
                    [{idx + 1}]
                  </span>
                  <span
                    className={`text-base font-semibold ${isSelected ? "text-[#587CF0]" : "text-gray-700 group-hover:text-[#587CF0]"}`}
                  >
                    {LABELS[value]}
                  </span>
                  <span
                    className={`text-sm ${isSelected ? "text-[#587CF0]" : "text-gray-400 group-hover:text-[#587CF0]"}`}
                  >
                    {value}점
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 이전 / 다음 · 제출 버튼 */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-xl text-gray-500 hover:border-[#587CF0] hover:text-[#587CF0] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-500"
          >
            <ArrowLeft className="w-4 h-4" />
            이전
          </button>

          <p className="text-sm text-gray-400">키보드 1~5 선택 · ← → 이동</p>

          {isLast ? (
            <button
              onClick={onSubmit}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-[#587CF0] hover:bg-[#4060d0] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              결과 확인
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-xl text-gray-500 hover:border-[#587CF0] hover:text-[#587CF0] transition-all"
            >
              다음
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
