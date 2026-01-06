import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notice } from "../../data/Notice/notice";

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  return (
    <div className="max-w-4xl p-8 mx-auto">
      {/* 🔙 뒤로가기 */}
      <button
        onClick={() => navigate("/notices")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Notices
      </button>

      <article className="p-8 bg-white border border-gray-200 rounded-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(
                notice.category
              )}`}
            >
              {notice.category}
            </span>

            <button
              onClick={() => setIsBookmarked((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {notice.title}
          </h1>

          <div className="flex items-center gap-4 pb-4 text-sm text-gray-600 border-b border-gray-200">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {notice.date}
            </div>
            <div>By {notice.author}</div>
          </div>
        </div>

        {/* 📄 본문 */}
        <div className="mb-8 leading-relaxed prose-sm prose text-gray-700 whitespace-pre-wrap max-w-none">
          {notice.content}
        </div>

        {/* 🔗 공유 */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="mb-3 font-bold text-gray-900">Share this notice</h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </article>
    </div>
  );
}
