import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

import { InterviewHeader } from "../../components/CompanyInformation/InterviewDetailPage/InterviewHeader";
import { AnswerInputForm } from "../../components/CompanyInformation/InterviewDetailPage/AnswerInputForm";
import { FeedbackView } from "../../components/CompanyInformation/InterviewDetailPage/FeedbackView";

import { LoginService } from "../../api/Auth/LoginPage";
import { InterviewDetailService } from "../../api/CompanyInformation/InterviewDetailPage";

import type {
  GetCompanyInfoResponse,
  GetCompanyQuestionsResponse,
  EvaluationResult,
} from "../../types/api/CompanyInformation/InterviewDetailPage";
import type { CompanyQna } from "../../types/common/CompanyInformation";

import NotFoundPage from "../NotFound/NotFoundPage";
import { CompanyDetailService } from "../../api/CompanyInformation/CompanyDetailPage";

export default function InterviewDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  // ─── 상태 관리 ────────────────────────────────────────────────
  const [company, setCompany] = useState<GetCompanyInfoResponse | null>(null);
  const [questions, setQuestions] = useState<GetCompanyQuestionsResponse>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userSummary, setUserSummary] = useState<string>("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [evaluationText, setEvaluationText] = useState<string | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── 초기 데이터 로딩 ─────────────────────────────────────────
  useEffect(() => {
    if (!companyId) return;

    const initData = async () => {
      try {
        setIsLoading(true);

        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        // 회사 정보, 질문 목록, 유저 AI 요약 병렬 조회
        const [companyData, questionsData, summary] = await Promise.all([
          InterviewDetailService.getCompanyInfo({ companyId }),
          InterviewDetailService.getCompanyQuestions({ companyId }),
          userId
            ? CompanyDetailService.getUserAiSummary(userId)
            : Promise.resolve(null),
        ]);

        setCompany(companyData);
        setQuestions(questionsData);
        setUserSummary(summary ?? "");
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        toast.error("면접 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [companyId]);

  // ─── 답변 제출 ────────────────────────────────────────────────
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.warning("답변을 입력해주세요.");
      return;
    }
    if (!currentUserId || !company || questions.length === 0) return;

    const currentQuestion: CompanyQna = questions[currentQuestionIndex];
    const toastId = toast.loading("AI가 답변을 분석 중입니다...");
    setIsSubmitting(true);

    try {
      // Edge Function 한 번으로 AI 평가 + DB 저장 처리
      const result = await InterviewDetailService.evaluateAndSave({
        userId: currentUserId,
        question: currentQuestion.company_qna_question,
        answer,
        companyName: company.company_name,
        userSummary,
      });

      setEvaluation(result.evaluation);
      setEvaluationText(result.evaluationText);
      setShowingFeedback(true);

      toast.update(toastId, {
        render: "분석이 완료되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 1000,
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

  // ─── 다음 질문 이동 ───────────────────────────────────────────
  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      toast.success("모든 면접 과정을 완료했습니다! 수고하셨습니다 🎉");
      navigate(`/companies/${companyId}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
      setEvaluation(null);
      setEvaluationText(null);
      setShowingFeedback(false);
    }
  };

  // ─── 렌더링 ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">면접 질문을 가져오는 중...</p>
      </div>
    );
  }

  if (!company || questions.length === 0) {
    return <NotFoundPage />;
  }

  const currentQuestion: CompanyQna = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/companies/${companyId}`)}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <InterviewHeader
            companyName={company.company_name}
            currentIndex={currentQuestionIndex}
            totalCount={questions.length}
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
              feedback={evaluationText!}
              evaluation={evaluation}
              isLast={currentQuestionIndex === questions.length - 1}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
