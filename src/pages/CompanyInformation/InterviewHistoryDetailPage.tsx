import { useNavigate, useParams } from "react-router-dom";
import { mockUserInterviews } from "../../data/CompanyInformation/mockData";
import { NotFoundView } from "../../components/CompanyInformation/NotFoundView";
import { BackButton } from "../../components/CompanyInformation/BackButton";
import { InfoSection } from "../../components/CompanyInformation/InterviewHistoryDetailPage/InfoSection";
import { DetailHeader } from "../../components/CompanyInformation/InterviewHistoryDetailPage/DetailHeader";


export default function InterviewHistoryDetail() {
  const navigate = useNavigate();
  const { interviewId } = useParams<{ interviewId: string }>();

  // 데이터 페칭 로직
  const interview = mockUserInterviews.find(
    (i) => i.id === Number(interviewId)
  );

  // 1. 예외 처리 (NotFoundView 사용)
  if (!interview) {
    return <NotFoundView />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 2. 뒤로가기 버튼 */}
        <BackButton onClick={() => navigate("/interviews")} />

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 3. 헤더 영역 */}
          <DetailHeader date={interview.company_user_qna_create_date} />

          <div className="p-8 space-y-8">
            {/* 4. 질문 섹션 */}
            <InfoSection
              title="질문"
              content={interview.company_qna_question}
            />

            {/* 5. 나의 답변 섹션 (회색 배경) */}
            <InfoSection
              title="나의 답변"
              content={interview.company_user_qna_answer}
              variant="gray"
            />

            {/* 6. AI 피드백 섹션 (파란색 배경) */}
            <InfoSection
              title="AI 피드백"
              content={interview.company_user_qna_evaluation}
              variant="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
