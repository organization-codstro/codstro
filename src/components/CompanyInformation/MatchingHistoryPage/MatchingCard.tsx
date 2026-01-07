import { MatchScoreBadge } from "./MatchScoreBadge";
import { DeleteButton } from "../DeleteButton"; // 이전에 만든 것 재사용
import { MatchingCardProps } from "../../../types/CompanyInformation/MatchingHistoryPage/MatchingCard";

export const MatchingCard = ({
  match,
  isPending,
  onDelete,
  onClick,
}: MatchingCardProps) => {
  const formattedDate = new Date(
    match.company_user_matche_created_date
  ).toLocaleDateString("ko-KR");

  return (
    <div
      onClick={onClick}
      className="p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="pr-2 mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
            {match.company_user_matche_name}
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            매칭 분석 결과를 자세히 확인해보세요
          </p>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>

        <div className="flex flex-row items-center gap-4 shrink-0">
          <MatchScoreBadge rate={match.match_rate} />
          <DeleteButton isPending={isPending} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};
