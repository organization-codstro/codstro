import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 컴포넌트 임포트
import { HistoryHeader } from "../../components/CompanyInformation/InterviewHistoryPage/HistoryHeader";
import { MatchEmptyState } from "../../components/CompanyInformation/MatchingHistoryPage/MatchEmptyState";
import { MatchingCard } from "../../components/CompanyInformation/MatchingHistoryPage/MatchingCard";

// 서비스 및 타입 임포트
import { GetUserMatchingListResponse } from "../../types/api/CompanyInformation/MatchingHistoryPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { MatchingHistoryService } from "../../api/CompanyInformation/MatchingHistoryPage";

export default function MatchingHistoryPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [history, setHistory] = useState<GetUserMatchingListResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);

  // 1. 초기 데이터 로드 (유저 ID 확인 후 목록 조회)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const userId = await LoginService.getCurrentUserId();

        if (!userId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }

        const data = await MatchingHistoryService.getUserMatchingList({
          userId,
        });
        setHistory(data);
      } catch (error) {
        console.error("매칭 이력 로드 실패:", error);
        toast.error("기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
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
    e.stopPropagation(); // 카드 클릭(상세 이동) 방지

    if (deletePendingId === id) {
      // 두 번째 클릭 시 실제 DB 삭제 수행
      try {
        const success = await MatchingHistoryService.deleteMatchingRecord({
          matchingId: id,
        });

        if (success) {
          setHistory((prev) =>
            prev.filter((item) => item.company_user_match_id !== id),
          );
          setDeletePendingId(null);
          toast.success("해당 매칭 기록이 삭제되었습니다.");
        }
      } catch (error) {
        console.error("삭제 실패:", error);
        toast.error("삭제 실패: 다시 시도해주세요.");
      }
    } else {
      // 첫 번째 클릭 시 삭제 대기 상태로 전환
      setDeletePendingId(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">매칭 기록을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      role="button"
      tabIndex={0}
      onClick={() => setDeletePendingId(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setDeletePendingId(null);
        }
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* 헤더 섹션 */}
        <HistoryHeader
          title="매칭 정보 기록"
          description="지금까지 분석한 회사 매칭 결과"
        />

        {history.length === 0 ? (
          <MatchEmptyState />
        ) : (
          <div className="space-y-4">
            {history.map((match) => (
              <MatchingCard
                key={match.company_user_match_id}
                match={match}
                isPending={deletePendingId === match.company_user_match_id}
                onDelete={(e) => handleDelete(e, match.company_user_match_id)}
                onClick={() =>
                  navigate(`/matches/${match.company_user_match_id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
