import { useNavigate, useParams } from "react-router-dom";
import {
  mockCompanies,
  mockMatches,
} from "../../data/CompanyInformation/mockData";
import { MatchSummaryCard } from "../../components/CompanyInformation/CompanyMatchPage/MatchSummaryCard";
import { MatchDetailReport } from "../../components/CompanyInformation/CompanyMatchPage/MatchDetailReport";
import { MatchInfoFooter } from "../../components/CompanyInformation/CompanyMatchPage/MatchInfoFooter";

export default function CompanyMatchPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const numericCompanyId = Number(companyId);

  const company = mockCompanies.find((c) => c.company_id === numericCompanyId);
  const match = mockMatches[numericCompanyId];

  if (!company || !match) {
    return (
      <div className="p-8 font-medium text-center text-gray-500">
        Data not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 1. 상단 요약 섹션 */}
          <MatchSummaryCard
            companyName={company.company_name}
            matchRate={match.match_rate}
            onBack={() => navigate(`/companies/${numericCompanyId}`)}
          />

          {/* 2. 상세 리포트 섹션 */}
          <div className="relative">
            <MatchDetailReport
              reason={match.company_user_matche_reason}
              suggestions={match.company_user_matche_suggestions}
            />

            {/* 3. 하단 메타 정보 (Report 패딩 안에 포함) */}
            <div className="px-8 pb-8">
              <MatchInfoFooter
                createdDate={match.company_user_matche_created_date}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
