import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// 컴포넌트 임포트
import { InterviewHeader } from "../../components/CompanyInformation/InterviewDetailPage/InterviewHeader";
import { AnswerInputForm } from "../../components/CompanyInformation/InterviewDetailPage/AnswerInputForm";
import { FeedbackView } from "../../components/CompanyInformation/InterviewDetailPage/FeedbackView";

import {
  GetCompanyQuestionsResponse,
  GetCompanyInfoResponse,
} from "../../types/api/CompanyInformation/InterviewDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { InterviewDetailService } from "../../api/CompanyInformation/InterviewDetailPage";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function InterviewDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  // 상태 관리
  const [company, setCompany] = useState<GetCompanyInfoResponse | null>(null);
  const [questions, setQuestions] = useState<GetCompanyQuestionsResponse>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. 초기 데이터 로딩 (회사 정보 + 질문 리스트)
  useEffect(() => {
    const initData = async () => {
      if (!companyId) return;

      try {
        setIsLoading(true);
        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        const [companyData, questionsData] = await Promise.all([
          InterviewDetailService.getCompanyInfo({ companyId }),
          InterviewDetailService.getCompanyQuestions({ companyId }),
        ]);

        setCompany(companyData);
        setQuestions(questionsData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        toast.error("면접 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [companyId]);

  // 2. 답변 제출 및 AI 피드백 생성/저장
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.warning("답변을 입력해주세요.");
      return;
    }

    if (!currentUserId || questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const toastId = toast.loading("AI가 지원님의 답변을 분석 중입니다...");
    setIsSubmitting(true);

    try {
      // AI 피드백 생성
      const aiFeedback =
        await InterviewDetailService.generateAiInterviewFeedback({
          question: currentQuestion.company_qna_question,
          answer: answer,
        });

      // DB에 유저 답변 및 피드백 저장
      await InterviewDetailService.saveUserInterviewResponse({
        userId: currentUserId,
        questionId: currentQuestion.company_qna_id,
        questionText: currentQuestion.company_qna_question,
        userAnswer: answer,
        evaluation: aiFeedback,
      });

      setFeedback(aiFeedback);
      setShowingFeedback(true);

      toast.update(toastId, {
        render: "분석이 완료되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("제출 실패:", error);
      toast.update(toastId, {
        render: "분석 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

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

  // 3. 렌더링 조건 처리
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        면접 질문을 가져오는 중...
      </div>
    );
  }

  if (!company || questions.length === 0) {
    return <NotFoundPage />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <InterviewHeader
            companyName={company.company_name}
            currentIndex={currentQuestionIndex}
            totalCount={questions.length}
            onBack={() => navigate(`/companies/${companyId}`)}
          />

          {!showingFeedback ? (
            <AnswerInputForm
              question={currentQuestion.company_qna_question}
              answer={answer}
              onAnswerChange={setAnswer}
              onSubmit={handleSubmitAnswer}
              disabled={isSubmitting}
            />
          ) : (
            <FeedbackView
              feedback={feedback!}
              isLast={currentQuestionIndex === questions.length - 1}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
