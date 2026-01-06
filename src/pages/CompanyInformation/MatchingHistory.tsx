import React, { useEffect, useState } from "react";
import { Trash2, TrendingUp } from "lucide-react";
import { mockUserMatchingHistory } from "../../data/CompanyInformation/mockData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MatchingHistory() {
  const navigate = useNavigate();

  const getMatchColor = (rate: number) => {
    if (rate >= 90) return "#10b981";
    if (rate >= 80) return "#3b82f6";
    if (rate >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const [history, setHistory] = useState(mockUserMatchingHistory);
  // [추가] 삭제 대기 ID 상태
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  // [추가] 3초 후 삭제 대기 상태 자동 해제
  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    // [수정] 2차 클릭 시 실제 삭제 수행
    if (deletePendingId === id) {
      const updatedHistory = history.filter(
        (item) => item.company_user_matche_id !== id
      );
      setHistory(updatedHistory);
      setDeletePendingId(null);

      toast.success("해당 기록이 삭제되었습니다.");
    } else {
      // [수정] 1차 클릭 시 대기 상태로 전환
      setDeletePendingId(id);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePendingId(null)} // 바탕 클릭 시 대기 해제
    >
      {/* 토스트 위치 우측 상단 고정 */}
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            매칭 정보 기록
          </h1>
          <p className="text-gray-600">지금까지 분석한 회사 매칭 결과</p>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
            <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">아직 매칭 기록이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((match) => {
              const matchColor = getMatchColor(match.match_rate);
              const isPending =
                deletePendingId === match.company_user_matche_id;

              return (
                <div
                  key={match.company_user_matche_id}
                  onClick={() =>
                    navigate(`/matches/${match.company_user_matche_id}`)
                  }
                  className="p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="pr-2 mb-2 text-lg font-semibold text-gray-900">
                        {match.company_user_matche_name}
                      </h3>
                      <p className="mb-3 text-sm text-gray-600">
                        매칭 분석 결과를 자세히 확인해보세요
                      </p>
                      <span className="text-sm text-gray-500">
                        {new Date(
                          match.company_user_matche_created_date
                        ).toLocaleDateString("ko-KR")}
                      </span>
                    </div>

                    <div className="flex flex-row items-center gap-4 shrink-0">
                      <div
                        className="flex flex-col items-center justify-center w-20 h-20 rounded-lg"
                        style={{ backgroundColor: "#F0F4FF" }}
                      >
                        <TrendingUp
                          size={28}
                          style={{ color: matchColor }}
                          className="mb-1"
                        />
                        <span
                          className="text-lg font-bold"
                          style={{ color: matchColor }}
                        >
                          {match.match_rate}%
                        </span>
                      </div>

                      {/* [수정] 대기 상태에 따른 아이콘 스타일 동적 변경 */}
                      <button
                        onClick={(e) =>
                          handleDelete(e, match.company_user_matche_id)
                        }
                        className={`p-3 transition-all duration-200 rounded-full border ${
                          isPending
                            ? "bg-red-500 text-white border-red-500 scale-110 shadow-md"
                            : "text-gray-400 border-transparent hover:bg-red-50 hover:text-red-500"
                        }`}
                        title={
                          isPending ? "한 번 더 클릭하여 삭제" : "삭제하기"
                        }
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
