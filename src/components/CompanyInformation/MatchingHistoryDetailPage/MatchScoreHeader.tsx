import { TrendingUp } from "lucide-react";
import { MatchScoreHeaderProps } from "../../../types/pages/CompanyInformation/MatchingHistoryDetailPage/MatchScoreHeader";

export const MatchScoreHeader = ({ rate, name }: MatchScoreHeaderProps) => {
  // 점수에 따른 색상 계산 로직
  const getMatchColor = (score: number) => {
    if (score === null) return "#ef4444"; // 빨강
    if (score >= 90) return "#10b981"; // 초록
    if (score >= 80) return "#3b82f6"; // 파랑
    if (score >= 70) return "#f59e0b"; // 주황
    return "#ef4444"; // 빨강
  };

  const matchColor = getMatchColor(rate);

  return (
    <div
      className="p-8 border-b border-gray-200"
      style={{ backgroundColor: "#F0F4FF" }}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 mb-4 bg-white rounded-full shadow-lg">
          <TrendingUp size={48} style={{ color: matchColor }} />
        </div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: matchColor }}>
          {rate}% 추천해요
        </h1>
        <p className="text-lg text-gray-700">{name}</p>
      </div>
    </div>
  );
};
