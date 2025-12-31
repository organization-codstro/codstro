import {
  Building2,
  ExternalLink,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import {
  mockCompanies,
  mockBookmarkedCompanyIds,
} from "../../data/CompanyInformation/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
  const navigate = useNavigate();

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    mockBookmarkedCompanyIds
  );

  const bookmarkedCompanies = mockCompanies.filter((c) =>
    bookmarkedIds.includes(c.company_id)
  );

  const removeBookmark = (companyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => prev.filter((id) => id !== companyId));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            관심있는 회사
          </h1>
          <p className="text-gray-600">북마크한 회사 목록입니다</p>
        </div>

        {bookmarkedCompanies.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
            <BookmarkIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">
              아직 북마크한 회사가 없습니다
            </p>
            <p className="mt-2 text-sm text-gray-400">
              관심있는 회사를 북마크하여 나중에 다시 확인해보세요
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedCompanies.map((company) => (
              <div
                key={company.company_id}
                className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                onClick={() => navigate(`/companies/${company.company_id}`)}
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
                      <h3 className="text-lg font-bold text-gray-900">
                        {company.company_name}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => removeBookmark(company.company_id, e)}
                      className="p-2 text-yellow-500 transition-colors rounded-lg hover:bg-yellow-50"
                    >
                      <BookmarkIcon size={20} fill="currentColor" />
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
