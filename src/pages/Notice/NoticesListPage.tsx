import { ArrowLeft, Calendar, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notices } from "../../data/Notice/notice";

export default function NoticesList() {
  const navigate = useNavigate();

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

  const pinnedNotices = notices.filter((n) => n.isPinned);
  const otherNotices = notices.filter((n) => !n.isPinned);

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
      <p className="mb-8 text-gray-600">
        Stay updated with important announcements and updates
      </p>

      {/* 📌 Pinned */}
      {pinnedNotices.length > 0 && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900">
            <Bookmark className="w-5 h-5 text-[#587CF0]" />
            Pinned
          </h2>

          <div className="space-y-3">
            {pinnedNotices.map((notice) => (
              <button
                key={notice.id}
                onClick={() => navigate(`/notices/${notice.id}`)}
                className="w-full p-5 text-left transition-shadow border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {notice.title}
                      </h3>
                      {notice.isNew && (
                        <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                      {notice.preview}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                          notice.category
                        )}`}
                      >
                        {notice.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {notice.date}
                      </div>
                    </div>
                  </div>

                  <Bookmark className="w-5 h-5 text-[#587CF0]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 📄 Recent */}
      <div className="space-y-3">
        {otherNotices.map((notice) => (
          <button
            key={notice.id}
            onClick={() => navigate(`/notices/${notice.id}`)}
            className="w-full p-5 text-left transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{notice.title}</h3>
                  {notice.isNew && (
                    <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                  {notice.preview}
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      notice.category
                    )}`}
                  >
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {notice.date}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
