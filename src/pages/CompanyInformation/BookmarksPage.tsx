import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkCard } from "../../components/CompanyInformation/BookmarksPage/BookmarkCard";
import { BookmarkEmptyState } from "../../components/CompanyInformation/BookmarksPage/BookmarkEmptyState";
import { BookmarkHeader } from "../../components/CompanyInformation/BookmarksPage/BookmarkHeader";
import { Company } from "../../types/api/CompanyInformation/BookmarksPage";
import { BookmarksService } from "../../api/CompanyInformation/BookmarksPage";
import { LoginService } from "../../api/Auth/LoginPage";

export default function BookmarksPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [bookmarkedCompanies, setBookmarkedCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 2. 초기 데이터 로드
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 유저 ID 가져오기
      const currentUserId = await LoginService.getCurrentUserId();

      if (!currentUserId) {
        setError("로그인이 필요합니다.");
        setIsLoading(false);
        return;
      }

      setUserId(currentUserId);

      // 북마크된 회사 목록 가져오기
      const companies = await BookmarksService.getBookmarkedCompanies({
        userId: currentUserId,
      });

      setBookmarkedCompanies(companies);
    } catch (err) {
      console.error("북마크 로드 실패:", err);
      setError("북마크를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 북마크 삭제 핸들러
  const removeBookmark = async (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      // API 호출로 북마크 삭제
      await BookmarksService.removeBookmark({
        userId,
        companyId,
      });

      // 로컬 상태 업데이트
      setBookmarkedCompanies((prev) =>
        prev.filter((company) => company.company_id !== companyId)
      );
    } catch (err) {
      console.error("북마크 삭제 실패:", err);
      setError("북마크 삭제 중 오류가 발생했습니다.");
    }
  };

  // 4. 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <BookmarkHeader />
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 5. 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <BookmarkHeader />
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 text-lg text-red-500">{error}</div>
            <button
              onClick={loadBookmarks}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

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
