import { ArrowLeft, Calendar, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  NoticeListItemResponse,
  NoticeTypeProps,
} from "../../types/api/Notice/NoticesListPage";
import { NoticesListService } from "../../api/Notice/NoticesListPage";

export default function NoticesListPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<NoticeListItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<NoticeTypeProps | null>(null);

  useEffect(() => {
    fetchNotices();
  }, [selectedCategory]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);

      let data: NoticeListItemResponse[];

      if (selectedCategory) {
        data = await NoticesListService.getNoticesByType({
          type: selectedCategory,
        });
      } else {
        data = await NoticesListService.getAllNotices();
      }

      setNotices(data);
    } catch (err) {
      console.error("Failed to fetch notices:", err);
      setError("공지사항을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Update: "bg-blue-100 text-blue-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Feature: "bg-green-100 text-green-800",
      Security: "bg-red-100 text-red-800",
      Community: "bg-purple-100 text-purple-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // 최근 7일 이내 공지사항을 NEW로 표시
  const isNew = (dateString: string) => {
    const noticeDate = new Date(dateString);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return noticeDate >= weekAgo;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const categories: NoticeTypeProps[] = [
    "update",
    "maintenance",
    "event",
    "general",
  ];

  if (loading) {
    return (
      <div className="max-w-4xl p-8 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl p-8 mx-auto">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-lg text-red-600">{error}</div>
          <button
            onClick={fetchNotices}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-8 mx-auto">
      {/* 🔙 프로필로 돌아가기 */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Profile
      </button>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">Notices</h1>
      <p className="mb-6 text-gray-600">
        Stay updated with important announcements and updates
      </p>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === null
              ? "bg-[#587CF0] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-[#587CF0] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 📄 Notices */}
      {notices.length > 0 ? (
        <div className="space-y-3">
          {notices.map((notice) => (
            <button
              key={notice.notice_id}
              onClick={() => navigate(`/notices/${notice.notice_id}`)}
              className="w-full p-5 text-left transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">
                      {notice.notice_title}
                    </h3>
                    {isNew(notice.created_at) && (
                      <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {notice.notice_content}
                  </p>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                        notice.notice_type
                      )}`}
                    >
                      {notice.notice_type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(notice.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">
          공지사항이 없습니다.
        </div>
      )}
    </div>
  );
}
