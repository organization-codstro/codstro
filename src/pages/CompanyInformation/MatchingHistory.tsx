import { TrendingUp } from "lucide-react";
import { mockUserMatchingHistory } from "../../data/CompanyInformation/mockData";
import { useNavigate } from "react-router-dom";

export default function MatchingHistory() {
  const navigate = useNavigate();

  const getMatchColor = (rate: number) => {
    if (rate >= 90) return "#10b981";
    if (rate >= 80) return "#3b82f6";
    if (rate >= 70) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            매칭 정보 기록
          </h1>
          <p className="text-gray-600">지금까지 분석한 회사 매칭 결과</p>
        </div>

        {mockUserMatchingHistory.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
            <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">아직 매칭 기록이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockUserMatchingHistory.map((match) => {
              const matchColor = getMatchColor(match.match_rate);

              return (
                <div
                  key={match.company_user_matche_id}
                  onClick={() =>
                    navigate(`/matches/${match.company_user_matche_id}`)
                  }
                  className="p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
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

                    <div className="flex flex-col items-end gap-3">
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
