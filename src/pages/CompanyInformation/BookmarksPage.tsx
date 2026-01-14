import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockCompanies,
  mockBookmarkedCompanyIds,
} from "../../data/CompanyInformation/mockData";
import { BookmarkCard } from "../../components/CompanyInformation/BookmarksPage/BookmarkCard";
import { BookmarkEmptyState } from "../../components/CompanyInformation/BookmarksPage/BookmarkEmptyState";
import { BookmarkHeader } from "../../components/CompanyInformation/BookmarksPage/BookmarkHeader";

export default function BookmarksPage() {
  const navigate = useNavigate();

  // 1. 상태 관리: 북마크된 아이디 목록
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    mockBookmarkedCompanyIds
  );

  // 2. 데이터 필터링: 북마크된 회사만 추출
  const bookmarkedCompanies = mockCompanies.filter((c) =>
    bookmarkedIds.includes(c.company_id)
  );

  // 3. 북마크 삭제 핸들러
  const removeBookmark = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setBookmarkedIds((prev) => prev.filter((id) => id !== companyId));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 상단 타이틀 섹션 */}
        <BookmarkHeader />

        {bookmarkedCompanies.length === 0 ? (
          /* 북마크가 없을 때의 화면 */
          <BookmarkEmptyState />
        ) : (
          /* 북마크 리스트 그리드 */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedCompanies.map((company) => (
              <BookmarkCard
                key={company.company_id}
                company={company}
                onRemove={removeBookmark}
                onClick={(id) => navigate(`/companies/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
