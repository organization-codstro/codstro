import { useState } from "react";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import {
  mockCompanies,
  mockQnas,
} from "../../data/CompanyInformation/mockData";
import ReactMarkdown from "../../components/CompanyInformation/ReactMarkdown";
import { useNavigate, useParams } from "react-router-dom";

export default function MockInterview() {
  /* ===============================
     URL 파라미터 & 네비게이션
  =============================== */
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  const numericCompanyId = Number(companyId);

  /* ===============================
     더미 데이터 조회
  =============================== */
  const company = mockCompanies.find((c) => c.company_id === numericCompanyId);
  const questions = mockQnas[numericCompanyId] || [];

  /* ===============================
     상태 관리
  =============================== */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  if (!company || questions.length === 0) {
    return <div className="p-8">No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  /* ===============================
     임시 AI 피드백 생성
  =============================== */
  const generateMockFeedback = (question: string, userAnswer: string) => {
    return `# 답변 분석

## 강점
- **구체성**: ${
      userAnswer.length > 100 ? "충분히 상세한" : "간단하지만 명확한"
    } 답변을 제공했습니다.
- **구조**: ${
      userAnswer.includes(".")
        ? "문장 구조가 잘 잡혀있습니다."
        : "답변이 간결합니다."
    }

## 개선 사항
1. **구체적인 예시 추가**
2. **결과 중심 설명**
3. **STAR 기법 활용**

## 전체 평가
질문의 핵심을 잘 파악한 답변입니다.`;
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    const mockFeedback = generateMockFeedback(
      currentQuestion.company_qna_question,
      answer
    );

    setFeedback(mockFeedback);
    setShowingFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      alert("모든 질문을 완료했습니다!");
      navigate(`/companies/${numericCompanyId}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
      setFeedback(null);
      setShowingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 */}
        <button
          onClick={() => navigate(`/companies/${numericCompanyId}`)}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 헤더 */}
          <div
            className="p-8 border-b border-gray-200"
            style={{ backgroundColor: "#F0F4FF" }}
          >
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {company.company_name} 모의 면접
            </h1>
            <span className="text-gray-600">
              질문 {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>

          {/* 본문 */}
          <div className="p-8">
            {!showingFeedback ? (
              <>
                {/* 질문 */}
                <h2 className="mb-4 text-xl font-semibold">질문</h2>
                <p className="mb-4 text-lg">
                  {currentQuestion.company_qna_question}
                </p>

                {/* 답변 */}
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-64 p-4 border rounded-lg"
                  placeholder="여기에 답변을 작성하세요..."
                />

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSubmitAnswer}
                    className="px-6 py-3 text-white rounded-lg"
                    style={{ backgroundColor: "#587CF0" }}
                  >
                    답변 제출
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 피드백 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-green-500" />
                    <h2 className="text-xl font-bold">AI 피드백</h2>
                  </div>
                  <ReactMarkdown content={feedback!} />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-lg"
                    style={{ backgroundColor: "#587CF0" }}
                  >
                    {isLastQuestion ? "완료" : "다음 질문"}
                    {!isLastQuestion && <ArrowRight size={18} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
