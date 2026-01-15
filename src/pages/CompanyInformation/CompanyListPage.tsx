import { Building2, ExternalLink, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetCompanyListResponse } from "../../types/api/CompanyInformation/CompanyListPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { CompanyListService } from "../../api/CompanyInformation/CompanyListPage";

export default function CompanyListPage() {
  const navigate = useNavigate();

  // 상태 관리: 회사 목록 및 북마크 ID 리스트
  const [companies, setCompanies] = useState<GetCompanyListResponse>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. 유저 ID 가져오기
        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        // 2. 회사 목록과 유저의 북마크 목록 병렬 로드
        const [companyData, bookmarkData] = await Promise.all([
          CompanyListService.getCompanyList(),
          userId ? CompanyListService.getUserBookmarkedIds({ userId }) : [],
        ]);

        setCompanies(companyData);
        setBookmarkedIds(bookmarkData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompanySelect = (companyId: string) => {
    navigate(`/companies/${companyId}`);
  };

  const toggleBookmark = async (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // 로그인이 안 되어 있을 경우 처리 (임시)
    if (!currentUserId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    const isCurrentlyBookmarked = bookmarkedIds.includes(companyId);

    try {
      // UI 즉시 반영 (Optimistic Update)
      setBookmarkedIds((prev) =>
        isCurrentlyBookmarked
          ? prev.filter((id) => id !== companyId)
          : [...prev, companyId]
      );

      // DB 동기화
      await CompanyListService.toggleBookmarkInDB({
        userId: currentUserId,
        companyId,
        isCurrentlyBookmarked,
      });
    } catch (error) {
      console.error("북마크 업데이트 실패:", error);
      // 실패 시 UI 복구
      setBookmarkedIds((prev) =>
        isCurrentlyBookmarked
          ? [...prev, companyId]
          : prev.filter((id) => id !== companyId)
      );
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">회사 정보</h1>
          <p className="text-gray-600">관심있는 회사를 찾아보세요</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
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
                      {/* API 컬럼명 반영: company_description */}
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {company.company_description}
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
                      href={company.company_website || "#"}
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
                      {/* API 컬럼명 반영: company_update_date */}
                      {new Date(company.company_update_at).toLocaleDateString(
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
