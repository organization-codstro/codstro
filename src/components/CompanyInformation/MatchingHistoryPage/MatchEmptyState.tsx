import { TrendingUp } from "lucide-react";

interface MatchEmptyStateProps {
  message?: string;
}

export const MatchEmptyState = ({
  message = "아직 매칭 기록이 없습니다",
}: MatchEmptyStateProps) => {
  return (
    <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
      <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
      <p className="text-lg text-gray-500">{message}</p>
    </div>
  );
};
