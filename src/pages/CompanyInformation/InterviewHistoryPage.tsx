import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockUserInterviews } from "../../data/CompanyInformation/mockData";
import "react-toastify/dist/ReactToastify.css";
import { HistoryHeader } from "../../components/CompanyInformation/InterviewHistoryPage/HistoryHeader";
import { EmptyState } from "../../components/CompanyInformation/InterviewHistoryPage/EmptyState";
import { InterviewCard } from "../../components/CompanyInformation/InterviewHistoryPage/InterviewCard";

export default function InterviewHistoryPage() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState(mockUserInterviews);
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);

  // 3초 후 삭제 대기 상태 초기화 로직
  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  // 삭제 처리 핸들러
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 카드 클릭 이벤트(상세 이동) 방지

    if (deletePendingId === id) {
      const updatedInterviews = interviews.filter((item) => item.id !== id);
      setInterviews(updatedInterviews);
      setDeletePendingId(null);
      toast.success("해당 기록이 삭제되었습니다.");
    } else {
      setDeletePendingId(id);
    }
  };

  // 배경 클릭 시 삭제 대기 상태 해제
  const resetDeleteState = () => setDeletePendingId(null);

  return (
    <div className="min-h-screen p-8 bg-gray-50" onClick={resetDeleteState}>
      <div className="max-w-4xl mx-auto">
        {/* 1. 헤더 섹션 */}
        <HistoryHeader
          title="나의 질문 기록"
          description="지금까지 작성한 모의 면접 답변 기록"
        />

        {interviews.length === 0 ? (
          <EmptyState />
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
