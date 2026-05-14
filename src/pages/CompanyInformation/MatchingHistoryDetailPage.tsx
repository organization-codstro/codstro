import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 컴포넌트 임포트
import { BackButton } from "../../components/CompanyInformation/BackButton";
import { MatchScoreHeader } from "../../components/CompanyInformation/MatchingHistoryDetailPage/MatchScoreHeader";
import { ReportSection } from "../../components/CompanyInformation/MatchingHistoryDetailPage/ReportSection";
import { ReportFooter } from "../../components/CompanyInformation/MatchingHistoryDetailPage/ReportFooter";

// 서비스 및 타입 임포트

import { GetMatchingHistoryDetailResponse } from "../../types/api/CompanyInformation/MatchingHistoryDetailPage";
import { MatchingHistoryDetailService } from "../../api/CompanyInformation/MatchingHistoryDetailPage";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function MatchingHistoryDetailPage() {
  const navigate = useNavigate();
  const { matchingId } = useParams<{ matchingId: string }>();

  // 상태 관리
  const [match, setMatch] = useState<GetMatchingHistoryDetailResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // 1. 초기 데이터 페칭
  useEffect(() => {
    const fetchMatchDetail = async () => {
      if (!matchingId) return;

      try {
        setIsLoading(true);
        const data =
          await MatchingHistoryDetailService.getMatchingHistoryDetail({
            matchingId,
          });
        setMatch(data);
      } catch (error) {
        console.error("매칭 이력 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetail();
  }, [matchingId]);

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">매칭 리포트를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 데이터 없음 처리
  if (!match) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={() => navigate(-1)} />
          {/* 삭제 버튼 추가 */}
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* 헤더: 점수와 매칭명(DB 데이터) 표시 */}
          <MatchScoreHeader
            rate={match.company_user_match_rate}
            name={match.company_user_match_name}
          />

          <div className="p-8">
            {/* 리포트 섹션: 분석 사유 */}
            <ReportSection
              title="매칭 분석 리포트"
              content={match.company_user_match_reason}
            />

            {/* 리포트 섹션: 개선 제안 */}
            <ReportSection
              title="개선 제안"
              content={match.company_user_match_suggestions}
              isLast
            />

            {/* 푸터: 생성 날짜 */}
            <ReportFooter date={match.created_at} />
          </div>
        </div>
      </div>
    </div>
  );
}
