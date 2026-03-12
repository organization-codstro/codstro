import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoticeDetailService } from "../../api/Notice/NoticeDetailPage";
import { NoticeResponse } from "../../types/api/Notice/NoticeDetailPage";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import { LoginService } from "../../api/Auth/LoginPage";
import { toast } from "react-toastify";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function NoticeDetailPage() {
  const navigate = useNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (noticeId) {
      fetchNoticeDetail(noticeId);
    }
  }, [noticeId]);

  const fetchNoticeDetail = async (noticeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const currentUserId = await LoginService.getCurrentUserId();

      if (!currentUserId) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const data = await NoticeDetailService.getNoticeById({
        noticeId: noticeId,
      });

      if (data) {
        setNotice(data);

        // 공지사항을 읽음 상태로 표시
        await NoticeDetailService.markAsRead({
          userId: currentUserId,
          noticeId: noticeId,
        });
      } else {
        setError("공지사항을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("Failed to fetch notice:", err);
      setError("공지사항을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  //todo 상수로 분리
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      update: "bg-blue-100 text-blue-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      event: "bg-green-100 text-green-800",
      general: "bg-purple-100 text-purple-800",
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: notice?.notice_title,
          text: notice?.notice_content,
          url: url,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      // 공유 API를 지원하지 않는 브라우저에서는 URL 복사
      navigator.clipboard.writeText(url);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl p-8 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return <NotFoundPage />;
  }

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
                notice.notice_type,
              )}`}
            >
              {notice.notice_type}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {notice.notice_title}
          </h1>

          <div className="flex items-center gap-4 pb-4 text-sm text-gray-600 border-b border-gray-200">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(notice.notice_created_date)}
            </div>
            {notice.notice_updated_date && (
              <div className="text-gray-500">
                수정됨: {formatDate(notice.notice_updated_date)}
              </div>
            )}
          </div>
        </div>

        {/* 📄 본문 */}
        <MarkdownRenderer content={notice.notice_content} />

        {/* 🔗 공유 */}
        <div className="pt-6 mt-8 border-t border-gray-200 ">
          <h3 className="mb-3 font-bold text-gray-900">Share this notice</h3>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </article>
    </div>
  );
}
