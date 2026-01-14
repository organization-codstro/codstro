import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  mockCompanies,
  mockBookmarkedCompanyIds,
} from "../../data/CompanyInformation/mockData";
import { CompanyDetailHeader } from "../../components/CompanyInformation/CompanyDetailPage/CompanyDetailHeader";
import { CompanyInfoSection } from "../../components/CompanyInformation/CompanyDetailPage/CompanyInfoSection";
import { CompanyActionButtons } from "../../components/CompanyInformation/CompanyDetailPage/CompanyActionButtons";

export default function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  const company = mockCompanies.find((c) => c.company_id === companyId);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    mockBookmarkedCompanyIds
  );

  // 회사 ID가 숫자형 문자열인지 확인 (추후 404 페이지 삽입)
  if (!company || !companyId) {
    return (
      <div className="p-8 font-medium text-center text-gray-500">
        Company not found
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(companyId);

  const toggleBookmark = () => {
    setBookmarkedIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-6 md:p-8">
            {/* 1. 헤더 영역 */}
            <CompanyDetailHeader
              name={company.company_name}
              industry={company.company_industry}
              isBookmarked={isBookmarked}
              onBack={() => navigate("/companies")}
              onBookmarkToggle={toggleBookmark}
            />

            {/* 2. 정보 상세 영역 */}
            <CompanyInfoSection
              description={company.companie_description}
              values={company.company_values}
              website={company.company_website}
              createdDate={company.company_created_date}
              updatedDate={company.company_update_date}
            />
          </div>

          {/* 3. 하단 액션 버튼 영역 */}
          <CompanyActionButtons
            onAnalysisClick={() =>
              navigate(`/companies/${companyId}/match`)
            }
            onInterviewClick={() =>
              navigate(`/companies/${companyId}/interview`)
            }
          />
        </div>
      </div>
    </div>
  );
}
