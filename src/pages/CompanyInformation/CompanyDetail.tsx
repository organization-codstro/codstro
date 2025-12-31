import {
  ArrowLeft,
  Building2,
  ExternalLink,
  TrendingUp,
  FileQuestion,
  Bookmark,
} from "lucide-react";
import {
  mockCompanies,
  mockBookmarkedCompanyIds,
} from "../../data/CompanyInformation/mockData";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyDetail() {
  /* ===============================
     URL 파라미터 & 네비게이션
  =============================== */
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  const numericCompanyId = Number(companyId);

  /* ===============================
     더미 데이터 조회
  =============================== */
  const company = mockCompanies.find((c) => c.company_id === numericCompanyId);

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    mockBookmarkedCompanyIds
  );

  if (!company) {
    return <div className="p-8">Company not found</div>;
  }

  /* ===============================
     북마크 처리 (임시)
  =============================== */
  const isBookmarked = bookmarkedIds.includes(numericCompanyId);

  const toggleBookmark = () => {
    setBookmarkedIds((prev) =>
      prev.includes(numericCompanyId)
        ? prev.filter((id) => id !== numericCompanyId)
        : [...prev, numericCompanyId]
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 */}
        <button
          onClick={() => navigate("/companies")}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>목록으로 돌아가기</span>
        </button>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{ backgroundColor: "#F0F4FF" }}
                >
                  <Building2 size={32} style={{ color: "#587CF0" }} />
                </div>
                <div>
                  <h1 className="mb-1 text-3xl font-bold text-gray-900">
                    {company.company_name}
                  </h1>
                  <p className="text-gray-600">{company.company_industry}</p>
                </div>
              </div>

              {/* 북마크 */}
              <button
                onClick={toggleBookmark}
                className={`p-3 rounded-lg transition-colors ${
                  isBookmarked
                    ? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <Bookmark
                  size={24}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* 회사 정보 */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  회사 소개
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {company.companie_description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    핵심 가치
                  </h3>
                  <p className="text-gray-700">{company.company_values}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    웹사이트
                  </h3>
                  <a
                    href={company.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                    style={{ color: "#587CF0" }}
                  >
                    <ExternalLink size={18} />
                    <span>{company.company_website}</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  등록일:{" "}
                  {new Date(company.company_created_date).toLocaleDateString(
                    "ko-KR"
                  )}{" "}
                  | 수정일:{" "}
                  {new Date(company.company_update_date).toLocaleDateString(
                    "ko-KR"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate(`/companies/${numericCompanyId}/match`)}
                className="flex items-center justify-center gap-3 px-6 py-4 font-medium text-white transition-all rounded-lg hover:shadow-lg"
                style={{ backgroundColor: "#587CF0" }}
              >
                <TrendingUp size={20} />
                <span>회사 매칭 분석</span>
              </button>

              <button
                onClick={() =>
                  navigate(`/companies/${numericCompanyId}/interview`)
                }
                className="flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all border-2 rounded-lg hover:shadow-lg hover:bg-white"
                style={{ borderColor: "#587CF0", color: "#587CF0" }}
              >
                <FileQuestion size={20} />
                <span>모의 면접</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
