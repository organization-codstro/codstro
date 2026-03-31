import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyDetailHeader } from "../../components/CompanyInformation/CompanyDetailPage/CompanyDetailHeader";
import { CompanyInfoSection } from "../../components/CompanyInformation/CompanyDetailPage/CompanyInfoSection";
import { CompanyActionButtons } from "../../components/CompanyInformation/CompanyDetailPage/CompanyActionButtons";
import { LoginService } from "../../api/Auth/LoginPage";
import { CompanyDetailService } from "../../api/CompanyInformation/CompanyDetailPage";
import { toast } from "react-toastify";
import { CompanyMatchService } from "../../api/CompanyInformation/CompanyMatchPage";
import { UserInfoService } from "../../api/AiChat/UserInfoPage";
import { Company } from "../../types/common/CompanyInformation";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [company, setCompany] = useState<Company | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 2. 초기 데이터 로드
  useEffect(() => {
    if (companyId) {
      loadCompanyData();
    }
  }, [companyId]);

  const loadCompanyData = async () => {
    if (!companyId) return;

    try {
      setIsLoading(true);
      setError(null);

      // 유저 ID 가져오기
      const currentUserId = await LoginService.getCurrentUserId();
      if (!currentUserId) {
        setError("로그인이 필요합니다.");
        setIsLoading(false);
        return;
      }
      setUserId(currentUserId);

      // 회사 상세 정보 가져오기
      const companyData = await CompanyDetailService.getCompanyDetail({
        companyId,
      });

      setCompany(companyData);

      // 북마크 상태 확인
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

  /**
   * [AI 매칭 생성 및 저장 핸들러]
   */
  const handleAnalysisClick = async () => {
    if (!userId || !company || !companyId) return;

    // 이미 분석 중이면 중복 클릭 방지
    if (isAnalyzing) return;

    const toastId = toast.loading("AI 매칭 정보를 생성 중입니다...");
    setIsAnalyzing(true);

    try {
      // 1. 유저 AI 기록 조회
      const userRecord = await UserInfoService.getUserRecord({ userId });

      if (!userRecord) {
        toast.update(toastId, {
          render: "유저 활동 기록이 부족하여 AI 분석을 시작할 수 없습니다.",
          type: "error",
          isLoading: false,
          autoClose: 500,
        });
        return;
      }

      // 2. AI 매칭 리포트 생성 (Gemini API)
      const aiReportText = await CompanyDetailService.generateAiMatchReport(
        {
          companyName: company.company_name,
          companyValues: company.company_values,
        },
        userRecord,
      );

      // 3. AI 결과 파싱 (SCORE 추출)
      const scoreMatch = aiReportText.match(/SCORE:\s*(\d+)/i);
      const matchRate = scoreMatch ? parseInt(scoreMatch[1], 10) : 70; // 기본값 70

      // 4. DB에 매칭 결과 저장
      await CompanyMatchService.createMatchResult({
        userId,
        companyId,
        companyName: company.company_name,
        matchRate,
        reason: aiReportText, // 전체 리포트를 사유 섹션에 저장하거나 파싱하여 분리
        suggestions: "추가적인 자기계발을 통해 매칭률을 높여보세요.", // 혹은 AI 결과에서 파싱
      });

      // 5. 성공 알림 및 페이지 이동
      toast.update(toastId, {
        render: "매칭 정보가 성공적으로 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      setTimeout(() => {
        navigate(`/companies/${companyId}/match`);
      }, 1500);
    } catch (err) {
      console.error("AI 분석 실패:", err);
      toast.update(toastId, {
        render: "매칭 정보 생성 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 3. 북마크 토글 핸들러
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

  // 4. 로딩 상태 처리
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

  // 5. 에러 또는 회사 정보 없음 처리
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
            onAnalysisClick={handleAnalysisClick} // 수정된 핸들러 연결
            onInterviewClick={() =>
              navigate(`/companies/${companyId}/interview`)
            }
          />
        </div>
      </div>
    </div>
  );
}
