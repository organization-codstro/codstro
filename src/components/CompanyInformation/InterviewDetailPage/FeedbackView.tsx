import { CheckCircle, ArrowRight } from "lucide-react";
import MarkdownRenderer from "../../Markdown/MarkdownRenderer";

interface FeedbackViewProps {
  feedback: string;
  isLast: boolean;
  onNext: () => void;
}

export function FeedbackView({ feedback, isLast, onNext }: FeedbackViewProps) {
  return (
    <div className="p-8 duration-500 animate-in fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-green-50">
          <CheckCircle className="text-green-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">AI 피드백 분석 결과</h2>
        </div>
        <div className="prose max-w-none">
          <MarkdownRenderer content={feedback} />
        </div>
      </div>

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