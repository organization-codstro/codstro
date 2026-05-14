import { CheckCircle, ArrowRight, Star } from "lucide-react";
import MarkdownRenderer from "../../Markdown/MarkdownRenderer";
import { FeedbackViewProps } from "../../../types/pages/CompanyInformation/InterviewDetailPage/FeedbackView";

export function FeedbackView({
  feedback,
  evaluation,
  isLast,
  onNext,
}: FeedbackViewProps) {
  return (
    <div className="p-6 duration-500 md:p-8 animate-in fade-in">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-green-50">
        <CheckCircle className="text-green-500 shrink-0" size={24} />
        <h2 className="text-xl font-bold text-gray-800">AI 피드백 분석 결과</h2>
      </div>

      {/* 점수 섹션 */}
      {evaluation && (
        <div className="mb-6">
          {/* 점수 바 */}
          <div className="flex items-center gap-4 p-4 mb-5 border border-gray-100 rounded-xl bg-gray-50">
            <div
              className="flex flex-col items-center justify-center w-16 h-16 rounded-full shrink-0"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <span
                className="text-2xl font-bold leading-none"
                style={{ color: "#587CF0" }}
              >
                {evaluation.score}
              </span>
              <span className="text-xs text-gray-400">/ 10</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-600">
                  답변 점수
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < evaluation.score ? "fill-current" : ""}
                      style={{
                        color: i < evaluation.score ? "#587CF0" : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-full transition-all duration-700 rounded-full"
                  style={{
                    width: `${(evaluation.score / 10) * 100}%`,
                    backgroundColor:
                      evaluation.score >= 8
                        ? "#22c55e"
                        : evaluation.score >= 5
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 잘한 점 / 개선할 점 / 예시 답변 카드 */}
          <div className="mb-6 space-y-3">
            <div className="p-4 border border-green-100 rounded-xl bg-green-50">
              <p className="mb-1.5 text-xs font-semibold text-green-600 uppercase tracking-wide">
                잘한 점
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {evaluation.strengths}
              </p>
            </div>

            <div className="p-4 border border-amber-100 rounded-xl bg-amber-50">
              <p className="mb-1.5 text-xs font-semibold text-amber-600 uppercase tracking-wide">
                개선할 점
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {evaluation.improvements}
              </p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <p className="mb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                더 나은 답변 예시
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {evaluation.betterAnswer}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* evaluation 없을 때 마크다운 fallback */}
      {!evaluation && (
        <div className="mb-6 prose max-w-none">
          <MarkdownRenderer content={feedback} />
        </div>
      )}

      {/* 다음 버튼 */}
      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 font-bold text-white transition-all rounded-lg hover:shadow-lg"
          style={{ backgroundColor: "#587CF0" }}
        >
          {isLast ? "모든 면접 완료" : "다음 질문으로 이동"}
          {!isLast && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}
