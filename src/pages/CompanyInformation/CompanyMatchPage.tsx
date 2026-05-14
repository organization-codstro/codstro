import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatchSummaryCard } from "../../components/CompanyInformation/CompanyMatchPage/MatchSummaryCard";
import { MatchDetailReport } from "../../components/CompanyInformation/CompanyMatchPage/MatchDetailReport";
import { MatchInfoFooter } from "../../components/CompanyInformation/CompanyMatchPage/MatchInfoFooter";
import { GetCompanyMatchDetailResponse } from "../../types/api/CompanyInformation/CompanyMatchPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { CompanyMatchService } from "../../api/CompanyInformation/CompanyMatchPage";
import { NotFoundPage } from "../NotFound/NotFoundPage";
import { ArrowLeft } from "lucide-react";

export default function CompanyMatchPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  const [matchData, setMatchData] =
    useState<GetCompanyMatchDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetail = async () => {
      if (!companyId) return;

      setIsLoading(true);
      try {
        // 1. 현재 유저 ID 확인
        const userId = await LoginService.getCurrentUserId();
        if (!userId) {
          console.error("로그인이 필요합니다.");
          setIsLoading(false);
          return;
        }

        // 2. 매칭 상세 내역 조회
        const data = await CompanyMatchService.getCompanyMatchDetail({
          userId,
          companyId,
        });

        if (data) {
          setMatchData(data);
        }
      } catch (error) {
        console.error("매칭 데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetail();
  }, [companyId]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        매칭 데이터를 불러오는 중...
      </div>
    );
  }

  // 매칭 결과가 없을 경우 (조회만 하고 끝남)
  if (!matchData) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 1. 상단 요약 섹션 (JOIN된 companys 정보 사용) */}
          <MatchSummaryCard
            companyName={matchData.companys?.company_name || "회사 정보 없음"}
            matchRate={matchData.company_user_match_rate}
            onBack={() => navigate(-1)}
          />

          {/* 2. 상세 리포트 섹션 */}
          <div className="relative">
            <MatchDetailReport
              reason={matchData.company_user_match_reason}
              suggestions={matchData.company_user_match_suggestions}
            />

            {/* 3. 하단 메타 정보 */}
            <div className="px-8 pb-8">
              <MatchInfoFooter created_at={matchData.created_at} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
