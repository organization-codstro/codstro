import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 컴포넌트 임포트
import HistoryHeader from "../../components/CompanyInformation/InterviewHistoryPage/HistoryHeader";
import InterviewHistoryEmptyState from "../../components/CompanyInformation/InterviewHistoryPage/InterviewHistoryEmptyState";
import InterviewCard from "../../components/CompanyInformation/InterviewHistoryPage/InterviewCard";

// 서비스 및 타입 임포트
import { GetUserInterviewListResponse } from "../../types/api/CompanyInformation/InterviewHistoryPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { InterviewHistoryService } from "../../api/CompanyInformation/InterviewHistoryPage";

export default function InterviewHistoryPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [interviews, setInterviews] = useState<GetUserInterviewListResponse>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);

  // 1. 초기 데이터 로드 (유저 ID 확인 후 목록 조회)
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setIsLoading(true);
        const userId = await LoginService.getCurrentUserId();

        if (!userId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }

        const data = await InterviewHistoryService.getUserInterviewList({
          userId,
        });
        setInterviews(data);
      } catch (error) {
        console.error("목록 로드 실패:", error);
        toast.error("기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [navigate]);

  // 2. 3초 후 삭제 대기 상태 초기화
  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  // 3. 삭제 처리 핸들러 (DB 연동)
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    // 두 번째 클릭 시 실제 삭제 수행
    if (deletePendingId === id) {
      try {
        const success = await InterviewHistoryService.deleteInterviewRecord({
          id,
        });

        if (success) {
          setInterviews((prev) => prev.filter((item) => item.id !== id));
          setDeletePendingId(null);
          toast.success("해당 기록이 삭제되었습니다.");
        }
      } catch (error) {
        toast.error("삭제 실패: 다시 시도해주세요.");
      }
    } else {
      // 첫 번째 클릭 시 삭제 대기 상태로 전환
      setDeletePendingId(id);
    }
  };

  const resetDeleteState = () => setDeletePendingId(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">기록을 로드 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50" onClick={resetDeleteState}>
      <div className="max-w-4xl mx-auto">
        <HistoryHeader
          title="나의 질문 기록"
          description="지금까지 작성한 모의 면접 답변 기록"
        />

        {interviews.length === 0 ? (
          <InterviewHistoryEmptyState />
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                isPending={deletePendingId === interview.id}
                onDelete={(e) => handleDelete(e, interview.id)}
                onClick={() => navigate(`/interviews/${interview.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
