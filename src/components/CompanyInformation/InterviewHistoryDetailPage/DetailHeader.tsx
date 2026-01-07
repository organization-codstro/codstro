import { CheckCircle } from "lucide-react";
import { DetailHeaderProps } from "../../../types/CompanyInformation/InterviewHistoryDetailPage/DetailHeader";

export const DetailHeader = ({ date }: DetailHeaderProps) => {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR");

  return (
    <div
      className="p-8 border-b border-gray-200"
      style={{ backgroundColor: "#F0F4FF" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle size={32} className="text-green-500" />
        <h1 className="text-2xl font-bold text-gray-900">질문 기록 상세</h1>
      </div>
      <p className="text-sm text-gray-600">작성일: {formattedDate}</p>
    </div>
  );
};
