import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// 컴포넌트 임포트
import { BackButton } from "../../components/CompanyInformation/BackButton";
import { InfoSection } from "../../components/CompanyInformation/InterviewHistoryDetailPage/InfoSection";
import { DetailHeader } from "../../components/CompanyInformation/InterviewHistoryDetailPage/DetailHeader";
import NotFoundPage from "../NotFound/NotFoundPage";

// 서비스 및 타입 임포트
import { GetInterviewHistoryDetailResponse } from "../../types/api/CompanyInformation/InterviewHistoryDetailPage";
import { InterviewHistoryDetailService } from "../../api/CompanyInformation/InterviewHistoryDetailPage";

export default function InterviewHistoryDetailPage() {
  const navigate = useNavigate();
  const { interviewId } = useParams<{ interviewId: string }>();

  // 상태 관리
  const [interview, setInterview] =
    useState<GetInterviewHistoryDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    const fetchDetail = async () => {
      if (!interviewId) return;

      try {
        setIsLoading(true);
        const data =
          await InterviewHistoryDetailService.getInterviewHistoryDetail({
            id: interviewId,
          });
        setInterview(data);
      } catch (error) {
        console.error("이력 상세 조회 실패:", error);
        // 에러가 발생하거나 데이터가 없을 경우 처리
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [interviewId]);

  // 삭제 핸들러 (서비스에 정의된 delete 기능 활용 예시)
  const handleDelete = async () => {
    if (!interviewId || !window.confirm("이 기록을 정말 삭제하시겠습니까?"))
      return;

    try {
      await InterviewHistoryDetailService.deleteInterviewHistory({
        id: interviewId,
      });
      toast.success("기록이 삭제되었습니다.");
      navigate("/interviews"); // 목록 페이지로 이동
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
    }
  };

  // 1. 로딩 중 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">기록을 불러오는 중입니다...</p>
      </div>
    );
  }

  // 2. 예외 처리 (데이터가 없는 경우)
  if (!interview) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={() => navigate(-1)} />
          {/* 삭제 기능이 필요한 경우 버튼 추가 가능 */}
          <button
            onClick={handleDelete}
            className="text-sm text-red-400 hover:text-red-600 hover:underline"
          >
            기록 삭제
          </button>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 3. 헤더 영역 - DB의 생성일자 연결 */}
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
