import { AnswerInputFormProps } from "../../../types/pages/CompanyInformation/InterviewDetailPage/AnswerInputForm";

export function AnswerInputForm({
  question,
  answer,
  onAnswerChange,
  onSubmit,
}: AnswerInputFormProps) {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">질문</h2>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">{question}</p>

      <textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 outline-none resize-none rounded-xl focus:ring-2 focus:border-transparent"
        style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
        placeholder="여기에 답변을 작성하세요..."
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={onSubmit}
          className="px-8 py-3 font-bold text-white transition-opacity rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#587CF0" }}
        >
          답변 제출
        </button>
      </div>
    </div>
  );
}
