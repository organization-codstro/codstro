import { FileText } from "lucide-react";
import { mockUserInterviews } from "../../data/CompanyInformation/mockData";
import { useNavigate } from "react-router-dom";

export default function InterviewHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            나의 질문 기록
          </h1>
          <p className="text-gray-600">지금까지 작성한 모의 면접 답변 기록</p>
        </div>

        {mockUserInterviews.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">아직 질문 기록이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockUserInterviews.map((interview) => (
              <div
                key={interview.id}
                onClick={() => navigate(`/interviews/${interview.id}`)}
                className="p-6 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
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
                      <span
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{
                          backgroundColor: "#F0F4FF",
                          color: "#587CF0",
                        }}
                      >
                        AI 피드백 완료
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg"
                    style={{ backgroundColor: "#F0F4FF" }}
                  >
                    <FileText size={24} style={{ color: "#587CF0" }} />
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
