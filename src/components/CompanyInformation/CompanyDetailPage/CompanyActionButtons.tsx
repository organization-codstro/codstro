import { TrendingUp, FileQuestion } from "lucide-react";
import { CompanyActionButtonsProps } from "../../../types/CompanyInformation/CompanyDetailPage/CompanyActionButtons";


export function CompanyActionButtons({
  onAnalysisClick,
  onInterviewClick,
}: CompanyActionButtonsProps) {
  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={onAnalysisClick}
          className="flex items-center justify-center gap-3 px-6 py-4 font-medium text-white transition-all rounded-lg hover:shadow-lg"
          style={{ backgroundColor: "#587CF0" }}
        >
          <TrendingUp size={20} />
          <span>회사 매칭 분석</span>
        </button>

        <button
          onClick={onInterviewClick}
          className="flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all border-2 rounded-lg hover:shadow-lg hover:bg-white"
          style={{ borderColor: "#587CF0", color: "#587CF0" }}
        >
          <FileQuestion size={20} />
          <span>모의 면접</span>
        </button>
      </div>
    </div>
  );
}
