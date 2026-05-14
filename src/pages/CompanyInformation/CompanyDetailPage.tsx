import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyDetailHeader } from "../../components/CompanyInformation/CompanyDetailPage/CompanyDetailHeader";
import { CompanyInfoSection } from "../../components/CompanyInformation/CompanyDetailPage/CompanyInfoSection";
import { CompanyActionButtons } from "../../components/CompanyInformation/CompanyDetailPage/CompanyActionButtons";
import { LoginService } from "../../api/Auth/LoginPage";
import { CompanyDetailService } from "../../api/CompanyInformation/CompanyDetailPage";
import { toast } from "react-toastify";
import { Company } from "../../types/common/CompanyInformation";
import {NotFoundPage} from "../NotFound/NotFoundPage";

export default function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (companyId) loadCompanyData();
  }, [companyId]);

  const loadCompanyData = async () => {
    if (!companyId) return;
    try {
      setIsLoading(true);
      setError(null);

      const currentUserId = await LoginService.getCurrentUserId();
      if (!currentUserId) {
        setError("로그인이 필요합니다.");
        setIsLoading(false);
        return;
      }
      setUserId(currentUserId);

      const companyData = await CompanyDetailService.getCompanyDetail({
        companyId,
      });
      setCompany(companyData);

      const bookmarkStatus = await CompanyDetailService.checkIsBookmarked({
        userId: currentUserId,
        companyId,
      });
      setIsBookmarked(bookmarkStatus);
    } catch (err) {
      console.error("회사 정보 로드 실패:", err);
      setError("회사 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── 회사 매칭 분석 ───────────────────────────────────────────
  const handleAnalysisClick = async () => {
    if (!userId || !company || !companyId || isAnalyzing) return;

    setIsAnalyzing(true);
    const toastId = toast.loading("AI 매칭 분석 중...");

    try {
      // 1. 유저 AI 기록 조회
      const userSummary = await CompanyDetailService.getUserAiSummary(userId);
      if (!userSummary) {
        toast.update(toastId, {
          render: "활동 기록이 부족합니다. AI 채팅을 먼저 이용해주세요.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // 2. Edge Function 호출 (분석 + DB 저장 일괄 처리)
      await CompanyDetailService.analyzeCompanyMatch({
        userId,
        companyId,
        companyName: company.company_name,
        companyValues: company.company_values,
        companyDescription: company.company_description,
        companyIndustry: company.company_industry,
        userSummary,
      });

      toast.update(toastId, {
        render: "매칭 분석 완료!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      setTimeout(() => navigate(`/companies/${companyId}/match`), 1200);
    } catch (err) {
      console.error("매칭 분석 실패:", err);
      toast.update(toastId, {
        render: "분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ─── 모의 면접 ────────────────────────────────────────────────
  const handleInterviewClick = async () => {
    if (!userId || !company || !companyId || isGeneratingInterview) return;

    setIsGeneratingInterview(true);
    const toastId = toast.loading("맞춤 면접 질문 생성 중...");

    try {
      // 1. 유저 AI 기록 조회
      const userSummary = await CompanyDetailService.getUserAiSummary(userId);
      if (!userSummary) {
        toast.update(toastId, {
          render: "활동 기록이 부족합니다. AI 채팅을 먼저 이용해주세요.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // 2. 질문 생성 + DB 저장 (Edge Function)
      const questions = await CompanyDetailService.generateInterviewQuestions({
        userId,
        companyId,
        companyName: company.company_name,
        companyValues: company.company_values,
        companyDescription: company.company_description,
        companyIndustry: company.company_industry,
        userSummary,
      });

      if (!questions || questions.length === 0) {
        throw new Error("질문 생성 실패");
      }

      toast.update(toastId, {
        render: "질문 준비 완료! 면접을 시작합니다.",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      // 생성된 첫 질문 ID를 state로 넘겨서 면접 페이지에서 활용
      setTimeout(() => {
        navigate(`/companies/${companyId}/interview`, {
          state: { questions, companyName: company.company_name, userSummary },
        });
      }, 1200);
    } catch (err) {
      console.error("면접 질문 생성 실패:", err);
      toast.update(toastId, {
        render: "질문 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsGeneratingInterview(false);
    }
  };

  // ─── 북마크 ───────────────────────────────────────────────────
  const toggleBookmark = async () => {
    if (!userId || !companyId) return;
    try {
      await CompanyDetailService.toggleBookmarkStatus({
        userId,
        companyId,
        currentlyBookmarked: isBookmarked,
      });
      setIsBookmarked((prev) => !prev);
    } catch (err) {
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-center py-20">
                <div className="text-lg text-gray-500">로딩 중...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !company || !companyId) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-6 md:p-8">
            <CompanyDetailHeader
              name={company.company_name}
              industry={company.company_industry}
              isBookmarked={isBookmarked}
              onBack={() => navigate("/companies")}
              onBookmarkToggle={toggleBookmark}
            />
            <CompanyInfoSection
              description={company.company_description}
              values={company.company_values}
              website={company.company_website}
              createdDate={company.created_at}
            />
          </div>

          <CompanyActionButtons
            onAnalysisClick={handleAnalysisClick}
            onInterviewClick={handleInterviewClick}
            isAnalyzing={isAnalyzing}
            isGeneratingInterview={isGeneratingInterview}
          />
        </div>
      </div>
    </div>
  );
}
