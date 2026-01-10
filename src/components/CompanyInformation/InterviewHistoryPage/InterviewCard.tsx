import { FileText } from "lucide-react";
import { DeleteButton } from "../DeleteButton";
import { InterviewCardProps } from "../../../types/pages/CompanyInformation/InterviewHistoryPage/InterviewCard";

export const InterviewCard = ({
  interview,
  isPending,
  onDelete,
  onClick,
}: InterviewCardProps) => {
  const formattedDate = new Date(
    interview.company_user_qna_create_date
  ).toLocaleDateString("ko-KR");

  return (
    <div
      onClick={onClick}
      className="relative p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="pr-8 mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
            {interview.company_qna_question}
          </h3>
          <p className="mb-3 text-gray-600 line-clamp-2">
            {interview.company_user_qna_answer}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-lg"
            style={{ backgroundColor: "#F0F4FF" }}
          >
            <FileText size={24} style={{ color: "#587CF0" }} />
          </div>
          <DeleteButton isPending={isPending} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};
