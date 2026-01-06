import { Building2, ExternalLink, Bookmark } from "lucide-react";
import {
  mockCompanies,
  mockBookmarkedCompanyIds,
} from "../../data/CompanyInformation/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyList() {
  const navigate = useNavigate();

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    mockBookmarkedCompanyIds
  );

  const handleCompanySelect = (companyId: number) => {
    setSelectedCompanyId(companyId);
    navigate(`/companies/${companyId}`);
  };

  const toggleBookmark = (companyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">회사 정보</h1>
          <p className="text-gray-600">관심있는 회사를 찾아보세요</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCompanies.map((company) => {
            const isBookmarked = bookmarkedIds.includes(company.company_id);
            return (
              <div
                key={company.company_id}
                className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                onClick={() => handleCompanySelect(company.company_id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-lg"
                        style={{ backgroundColor: "#F0F4FF" }}
                      >
                        <Building2 size={24} style={{ color: "#587CF0" }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {company.company_name}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleBookmark(company.company_id, e)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? "text-yellow-500 hover:bg-yellow-50"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <Bookmark
                        size={20}
                        fill={isBookmarked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        분야
                      </p>
                      <p className="text-sm text-gray-700">
                        {company.company_industry}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        회사 설명
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {company.companie_description}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        핵심 가치
                      </p>
                      <p className="text-sm text-gray-700">
                        {company.company_values}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <a
                      href={company.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-sm hover:underline"
                      style={{ color: "#587CF0" }}
                    >
                      <ExternalLink size={14} />
                      <span>웹사이트</span>
                    </a>
                    <span className="text-xs text-gray-400">
                      {new Date(company.company_update_date).toLocaleDateString(
                        "ko-KR"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
