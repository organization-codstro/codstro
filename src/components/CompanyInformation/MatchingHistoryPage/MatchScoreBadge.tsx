import { TrendingUp } from "lucide-react";

interface MatchScoreBadgeProps {
  rate: number;
}

export const MatchScoreBadge = ({ rate }: MatchScoreBadgeProps) => {
  const getMatchColor = (score: number) => {
    if (score >= 90) return "#10b981";
    if (score >= 80) return "#3b82f6";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const matchColor = getMatchColor(rate);

  return (
    <div
      className="flex flex-col items-center justify-center w-20 h-20 rounded-lg shrink-0"
      style={{ backgroundColor: "#F0F4FF" }}
    >
      <TrendingUp size={28} style={{ color: matchColor }} className="mb-1" />
      <span className="text-lg font-bold" style={{ color: matchColor }}>
        {rate}%
      </span>
    </div>
  );
};
