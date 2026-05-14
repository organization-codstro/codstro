import { AnswerInputFormProps } from "../../../types/pages/CompanyInformation/InterviewDetailPage/AnswerInputForm";

export const AnswerInputForm = ({
  question,
  answer,
  onAnswerChange,
  onSubmit,
  disabled,
}: AnswerInputFormProps) => {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">질문</h2>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">{question}</p>

      <textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        disabled={disabled} // 분석 중일 때 입력창 비활성화
        className={`w-full h-64 p-4 border border-gray-300 outline-none resize-none rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
          disabled ? "bg-gray-50 text-gray-400" : "bg-white"
        }`}
        style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
        placeholder={
          disabled ? "AI가 분석 중입니다..." : "여기에 답변을 작성하세요..."
        }
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={onSubmit}
          disabled={disabled} // 분석 중일 때 버튼 클릭 방지
          className={`px-8 py-3 font-bold text-white transition-all rounded-lg ${
            disabled ? "bg-gray-300 cursor-not-allowed" : "hover:opacity-90"
          }`}
          style={disabled ? { backgroundColor: "#587CF0" } : {}}
        >
          {disabled ? "분석 중..." : "답변 제출"}
        </button>
      </div>
    </div>
  );
};
