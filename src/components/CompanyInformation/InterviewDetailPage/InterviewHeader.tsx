import { ArrowLeft } from "lucide-react";
import { InterviewHeaderProps } from "../../../types/pages/CompanyInformation/InterviewDetailPage/InterviewHeader";

export function InterviewHeader({
  companyName,
  currentIndex,
  totalCount,
  onBack,
}: InterviewHeaderProps) {
  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>뒤로 가기</span>
      </button>

      <div
        className="p-8 border-b border-gray-200"
        style={{ backgroundColor: "#F0F4FF" }}
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {companyName} 모의 면접
        </h1>
        <span className="font-medium text-gray-600">
          질문 {currentIndex + 1} / {totalCount}
        </span>
      </div>
    </>
  );
}
