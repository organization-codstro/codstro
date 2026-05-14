import { FileText, Calendar } from "lucide-react";
import { DeleteButton } from "../DeleteButton";
import { InterviewCardProps } from "../../../types/pages/CompanyInformation/InterviewHistoryPage/InterviewCard";

export const InterviewCard = ({
  interview,
  isPending,
  onDelete,
  onClick,
}: InterviewCardProps) => {
  // 날짜 포맷팅 (YYYY. MM. DD.)
  const formattedDate = new Date(interview.created_at).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div
      onClick={onClick}
      className={`relative p-6 transition-all border shadow-sm cursor-pointer rounded-xl hover:shadow-md group ${
        isPending
          ? "border-red-300 bg-red-50" // 삭제 대기 상태일 때 배경색 변경
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* 질문 제목 */}
          <h3 className="pr-10 mb-2 text-lg font-bold text-gray-900 line-clamp-1">
            Q. {interview.company_qna_question}
          </h3>

          {/* 답변 미리보기 */}
          <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
            {interview.company_user_qna_answer}
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-col items-center self-stretch justify-between gap-2">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-lg"
            style={{
              backgroundColor: isPending ? "#FEE2E2" : "#F0F4FF",
              transition: "background-color 0.2s",
            }}
          >
            <FileText
              size={24}
              style={{ color: isPending ? "#EF4444" : "#587CF0" }}
            />
          </div>

          {/* 삭제 버튼 영역 */}
          <div className="mt-auto">
            <DeleteButton isPending={isPending} onClick={onDelete} />
          </div>
        </div>
      </div>

      {/* 삭제 대기 중일 때 나타나는 안내 레이어 (선택 사항) */}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-xl bg-red-50/10">
          <span className="px-3 py-1 text-xs font-bold text-red-500 bg-white border border-red-200 rounded-full shadow-sm">
            한 번 더 클릭하면 삭제됩니다
          </span>
        </div>
      )}
    </div>
  );
};
