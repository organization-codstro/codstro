import { ArrowLeft, TrendingUp } from "lucide-react";
import { mockUserMatchingHistory } from "../../data/CompanyInformation/mockData";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "../../components/CompanyInformation/ReactMarkdown";

export default function MatchingHistoryDetail() {
  const navigate = useNavigate();
  const { matchingId } = useParams<{ matchingId: string }>();

  const match = mockUserMatchingHistory.find(
    (m) => m.company_user_matche_id === Number(matchingId)
  );

  if (!match) {
    return <div className="p-8">Matching record not found</div>;
  }

  const getMatchColor = (rate: number) => {
    if (rate >= 90) return "#10b981";
    if (rate >= 80) return "#3b82f6";
    if (rate >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const matchColor = getMatchColor(match.match_rate);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>목록으로 돌아가기</span>
        </button>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div
            className="p-8 border-b border-gray-200"
            style={{ backgroundColor: "#F0F4FF" }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-4 bg-white rounded-full shadow-lg">
                <TrendingUp size={48} style={{ color: matchColor }} />
              </div>
              <h1
                className="mb-2 text-4xl font-bold"
                style={{ color: matchColor }}
              >
                {match.match_rate}% 추천해요
              </h1>
              <p className="text-lg text-gray-700">
                {match.company_user_matche_name}
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                매칭 분석 리포트
              </h2>
              <div className="prose-sm prose max-w-none">
                <ReactMarkdown content={match.company_user_matche_reason} />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                개선 제안
              </h2>
              <div className="prose-sm prose max-w-none">
                <ReactMarkdown
                  content={match.company_user_matche_suggestions}
                />
              </div>
            </div>

            <div className="p-4 mt-8 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">
                <span className="font-medium">분석 생성일:</span>{" "}
                {new Date(
                  match.company_user_matche_created_date
                ).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
