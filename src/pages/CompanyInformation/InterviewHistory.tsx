import React, { useEffect, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { mockUserInterviews } from "../../data/CompanyInformation/mockData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InterviewHistory() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState(mockUserInterviews);
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    if (deletePendingId === id) {
      const updatedInterviews = interviews.filter((item) => item.id !== id);
      setInterviews(updatedInterviews);
      setDeletePendingId(null);

      // 토스트 알림 실행
      toast.success("해당 기록이 삭제되었습니다.");
    } else {
      setDeletePendingId(id);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePendingId(null)}
    >
      {/* 1. 토스트 위치를 top-right로 명시적 설정 */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            나의 질문 기록
          </h1>
          <p className="text-gray-600">지금까지 작성한 모의 면접 답변 기록</p>
        </div>

        {interviews.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">아직 질문 기록이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                onClick={() => navigate(`/interviews/${interview.id}`)}
                className="relative p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="pr-8 mb-2 text-lg font-semibold text-gray-900">
                      {interview.company_qna_question}
                    </h3>
                    <p className="mb-3 text-gray-600 line-clamp-2">
                      {interview.company_user_qna_answer}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        {new Date(
                          interview.company_user_qna_create_date
                        ).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-lg"
                      style={{ backgroundColor: "#F0F4FF" }}
                    >
                      <FileText size={24} style={{ color: "#587CF0" }} />
                    </div>

                    {/* 2. 아이콘은 Trash2 고정, 배경색만 변경 */}
                    <button
                      onClick={(e) => handleDelete(e, interview.id)}
                      className={`p-2 transition-all duration-200 rounded-full border ${
                        deletePendingId === interview.id
                          ? "bg-red-500 text-white border-red-500 scale-110 shadow-md" // 삭제 대기 시 붉은 배경
                          : "text-gray-400 border-transparent hover:bg-red-50 hover:text-red-500" // 평상시
                      }`}
                      title={
                        deletePendingId === interview.id
                          ? "확인을 위해 한 번 더 클릭"
                          : "삭제하기"
                      }
                    >
                      <Trash2 size={20} />
                    </button>
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
