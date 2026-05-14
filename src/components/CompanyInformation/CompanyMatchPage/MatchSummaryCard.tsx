import { TrendingUp } from "lucide-react";
import { MatchSummaryCardProps } from "../../../types/pages/CompanyInformation/CompanyMatchPage/MatchSummaryCard";

export function MatchSummaryCard({
  companyName,
  matchRate,
}: MatchSummaryCardProps) {
  // 매칭 점수 색상 로직
  const getMatchColor = (rate: number) => {
    if (rate >= 90) return "#10b981";
    if (rate >= 80) return "#3b82f6";
    if (rate >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const matchColor = getMatchColor(matchRate);

  return (
    <>
      <div
        className="p-8 border-b border-gray-200"
        style={{ backgroundColor: "#F0F4FF" }}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4 bg-white rounded-full shadow-lg">
            <TrendingUp size={48} style={{ color: matchColor }} />
          </div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: matchColor }}>
            {matchRate}% 추천해요
          </h1>
          <p className="text-lg text-gray-700">
            {companyName}와의 매칭 분석 결과
          </p>
        </div>
      </div>
    </>
  );
}
