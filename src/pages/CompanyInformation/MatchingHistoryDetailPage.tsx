import { useNavigate, useParams } from "react-router-dom";
import { mockUserMatchingHistory } from "../../data/CompanyInformation/mockData";
import { BackButton } from "../../components/CompanyInformation/BackButton";
import { NotFoundView } from "../../components/CompanyInformation/NotFoundView";
import { MatchScoreHeader } from "../../components/CompanyInformation/MatchingHistoryDetailPage/MatchScoreHeader";
import { ReportSection } from "../../components/CompanyInformation/MatchingHistoryDetailPage/ReportSection";
import { ReportFooter } from "../../components/CompanyInformation/MatchingHistoryDetailPage/ReportFooter";

export default function MatchingHistoryDetail() {
  const navigate = useNavigate();
  const { matchingId } = useParams<{ matchingId: string }>();

  const match = mockUserMatchingHistory.find(
    (m) => m.company_user_matche_id === Number(matchingId)
  );

  if (!match) {
    return <NotFoundView message="Matching record not found" />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={() => navigate("/matches")} />

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <MatchScoreHeader
            rate={match.match_rate}
            name={match.company_user_matche_name}
          />

          <div className="p-8">
            <ReportSection
              title="매칭 분석 리포트"
              content={match.company_user_matche_reason}
            />

            <ReportSection
              title="개선 제안"
              content={match.company_user_matche_suggestions}
              isLast
            />

            <ReportFooter date={match.company_user_matche_created_date} />
          </div>
        </div>
      </div>
    </div>
  );
}
