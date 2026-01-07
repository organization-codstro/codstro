import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockUserMatchingHistory } from "../../data/CompanyInformation/mockData";
import "react-toastify/dist/ReactToastify.css";
import { HistoryHeader } from "../../components/CompanyInformation/InterviewHistoryPage/HistoryHeader";
import { MatchEmptyState } from "../../components/CompanyInformation/MatchingHistoryPage/MatchEmptyState";
import { MatchingCard } from "../../components/CompanyInformation/MatchingHistoryPage/MatchingCard";


export default function MatchingHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(mockUserMatchingHistory);
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (deletePendingId === id) {
      setHistory((prev) =>
        prev.filter((item) => item.company_user_matche_id !== id)
      );
      setDeletePendingId(null);
      toast.success("해당 기록이 삭제되었습니다.");
    } else {
      setDeletePendingId(id);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePendingId(null)}
    >
      <div className="max-w-4xl mx-auto">
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
                key={match.company_user_matche_id}
                match={match}
                isPending={deletePendingId === match.company_user_matche_id}
                onDelete={(e) => handleDelete(e, match.company_user_matche_id)}
                onClick={() =>
                  navigate(`/matches/${match.company_user_matche_id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
