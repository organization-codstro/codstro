import { FileText } from "lucide-react";
import { EmptyStateProps } from "../../../types/CompanyInformation/InterviewHistoryPage/EmptyState";

export const EmptyState = ({
  message = "아직 질문 기록이 없습니다",
}: EmptyStateProps) => {
  return (
    <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
      <FileText size={48} className="mx-auto mb-4 text-gray-300" />
      <p className="text-lg text-gray-500">{message}</p>
    </div>
  );
};
