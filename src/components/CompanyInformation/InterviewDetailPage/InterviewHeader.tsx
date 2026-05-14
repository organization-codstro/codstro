import { InterviewHeaderProps } from "../../../types/pages/CompanyInformation/InterviewDetailPage/InterviewHeader";

export const InterviewHeader = ({
  companyName,
  currentIndex,
  totalCount,
}: InterviewHeaderProps) => {
  return (
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
  );
};
