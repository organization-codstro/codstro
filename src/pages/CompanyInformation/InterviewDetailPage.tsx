import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  generateMockFeedback,
  mockCompanies,
  mockQnas,
} from "../../data/CompanyInformation/mockData";
import { InterviewHeader } from "../../components/CompanyInformation/InterviewDetailPage/InterviewHeader";
import { AnswerInputForm } from "../../components/CompanyInformation/InterviewDetailPage/AnswerInputForm";
import { FeedbackView } from "../../components/CompanyInformation/InterviewDetailPage/FeedbackView";

export default function InterviewDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  //1. 회사 ID 유효성 검사 (추후 404 페이지 삽입)
  if (!companyId) {
    return (
      <div className="p-8 text-center text-gray-500">
        No questions available
      </div>
    );
  }

  // 데이터 조회
  const company = mockCompanies.find((c) => c.company_id === companyId);
  const questions = mockQnas[companyId] || [];

  // 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  if (!company || questions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No questions available
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast.warning("답변을 입력해주세요.");
      return;
    }
    setFeedback(generateMockFeedback(answer));
    setShowingFeedback(true);
    toast.success("답변이 제출되었습니다.");
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      toast.success("모든 면접 과정을 완료했습니다!");
      navigate(`/companies/${companyId}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
      setFeedback(null);
      setShowingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 1. 공통 헤더 */}
          <InterviewHeader
            companyName={company.company_name}
            currentIndex={currentQuestionIndex}
            totalCount={questions.length}
            onBack={() => navigate(`/companies/${companyId}`)}
          />

          {/* 2. 상태에 따른 조건부 렌더링 */}
          {!showingFeedback ? (
            <AnswerInputForm
              question={currentQuestion.company_qna_question}
              answer={answer}
              onAnswerChange={setAnswer}
              onSubmit={handleSubmitAnswer}
            />
          ) : (
            <FeedbackView
              feedback={feedback!}
              isLast={isLastQuestion}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
