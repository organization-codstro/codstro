import { ArrowLeft, CheckCircle } from "lucide-react";
import { mockUserInterviews } from "../../data/CompanyInformation/mockData";
import { useNavigate, useParams } from "react-router-dom";

export default function InterviewHistoryDetail() {
  const navigate = useNavigate();
  const { interviewId } = useParams<{ interviewId: string }>();

  const interview = mockUserInterviews.find(
    (i) => i.id === Number(interviewId)
  );

  if (!interview) {
    return <div className="p-8">Interview not found</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>목록으로 돌아가기</span>
        </button>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div
            className="p-8 border-b border-gray-200"
            style={{ backgroundColor: "#F0F4FF" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={32} className="text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                질문 기록 상세
              </h1>
            </div>
            <p className="text-sm text-gray-600">
              작성일:{" "}
              {new Date(
                interview.company_user_qna_create_date
              ).toLocaleDateString("ko-KR")}
            </p>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">질문</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {interview.company_qna_question}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                나의 답변
              </h3>
              <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <p className="leading-relaxed text-gray-700">
                  {interview.company_user_qna_answer}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                AI 피드백
              </h3>
              <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {interview.company_user_qna_evaluation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
