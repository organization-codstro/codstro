import { TrendingUp, FileQuestion, Loader2 } from "lucide-react";
import { CompanyActionButtonsProps } from "../../../types/pages/CompanyInformation/CompanyDetailPage/CompanyActionButtons";

export function CompanyActionButtons({
  onAnalysisClick,
  onInterviewClick,
  isAnalyzing = false,
  isGeneratingInterview = false,
}: CompanyActionButtonsProps) {
  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 매칭 분석 버튼 */}
        <button
          onClick={onAnalysisClick}
          disabled={isAnalyzing || isGeneratingInterview}
          className="flex items-center justify-center gap-3 px-6 py-4 font-medium text-white transition-all rounded-lg hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#587CF0" }}
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>분석 중...</span>
            </>
          ) : (
            <>
              <TrendingUp size={20} />
              <span>회사 매칭 분석</span>
            </>
          )}
        </button>

        {/* 모의 면접 버튼 */}
        <button
          onClick={onInterviewClick}
          disabled={isAnalyzing || isGeneratingInterview}
          className="flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all border-2 rounded-lg hover:shadow-lg hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ borderColor: "#587CF0", color: "#587CF0" }}
        >
          {isGeneratingInterview ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>질문 생성 중...</span>
            </>
          ) : (
            <>
              <FileQuestion size={20} />
              <span>모의 면접</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
