import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RecommendedStudyPlansService } from "../../api/Woomoonkyung/RecommendedStudyPlansPage";
import { LoginService } from "../../api/Auth/LoginPage";
import PlanSearchHeader from "../../components/Woomoonkyung/RecommendedStudyPlansPage/PlanSearchHeader";
import StudyPlanCard from "../../components/Woomoonkyung/RecommendedStudyPlansPage/StudyPlanCard";
import EmptyState from "../../components/Woomoonkyung/RecommendedStudyPlansPage/EmptyState";
import { RecommendedPlan } from "../../types/pages/Woomoonkyung/RecommendedStudyPlansPage/RecommendedStudyPlansPage";

export default function RecommendedStudyPlansPage() {
  const navigate = useNavigate();

  /* 상태 관리 (useState) */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState<RecommendedPlan[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  /**
   * [데이터 초기화 로드]
   * 유저 ID 확보 후 추천 플랜 리스트와 북마크 상태를 동기화합니다.
   */
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUserId = await LoginService.getCurrentUserId();
      setUserId(currentUserId);

      // 플랜 목록과 북마크된 ID 목록을 병렬로 가져옴
      const [plansData, bookmarkedIds] = await Promise.all([
        RecommendedStudyPlansService.getRecommendedPlans(searchQuery),
        currentUserId
          ? RecommendedStudyPlansService.getBookmarkedIds(currentUserId)
          : Promise.resolve([]),
      ]);

      setPlans(plansData as RecommendedPlan[]);
      setBookmarks(new Set(bookmarkedIds));
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /**
   * [핸들러: 플랜 클릭 시 이동]
   */
  const handlePlanClick = (plan: RecommendedPlan) => {
    navigate(`/woomoonkyung/recommended/${plan.study_plan_id}`);
  };

  /**
   * [핸들러: 북마크 토글]
   * Pending UI 처리를 위해 즉시 상태를 변경하고 API 결과에 따라 롤백하거나 유지합니다.
   */
  const toggleBookmark = async (planId: string) => {
    const isCurrentlyBookmarked = bookmarks.has(planId);

    try {
      // API 호출
      await RecommendedStudyPlansService.toggleBookmark({
        planId,
        currentState: isCurrentlyBookmarked,
      });

      const newBookmarks = new Set(bookmarks);
      if (isCurrentlyBookmarked) {
        newBookmarks.delete(planId);
        toast.info("북마크가 해제되었습니다.");
      } else {
        newBookmarks.add(planId);
        toast.success("북마크에 추가되었습니다.");
      }
      setBookmarks(newBookmarks);
    } catch (error) {
      toast.error("북마크 처리 중 오류가 발생했습니다.");
    }
  };

  /**
   * [핸들러: 내 계획으로 추가]
   * 추천 플랜을 복사하여 유저의 개인 플랜으로 생성합니다.
   */
  const addToMyPlans = async (plan: RecommendedPlan) => {
    if (!userId) {
      toast.warning("로그인이 필요한 기능입니다.");
      return;
    }

    const loadingToast = toast.loading("내 계획에 추가하는 중...");

    try {
      await RecommendedStudyPlansService.addToMyPlans({
        userId,
        targetPlan: {
          study_plan_name: plan.study_plan_name,
          study_plan_description: plan.study_plan_description,
          study_plan_image_url: plan.study_plan_image_url,
          study_plan_end_date: plan.study_plan_end_date,
        },
      });

      toast.update(loadingToast, {
        render: `"${plan.study_plan_name}" 계획이 추가되었습니다!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(loadingToast, {
        render: "계획 추가에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <PlanSearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Available Study Plans
          </h2>

          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              플랜을 불러오는 중입니다...
            </div>
          ) : plans.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <StudyPlanCard
                  key={plan.study_plan_id}
                  plan={{
                    ...plan,
                    // UI 컴포넌트에서 기대하는 이미지 필드명 매칭
                    study_plan_image_url: plan.study_plan_image_url,
                    study_plan_is_archived: bookmarks.has(plan.study_plan_id),
                  }}
                  totalNodes={plan.totalNodes}
                  isBookmarked={bookmarks.has(plan.study_plan_id)}
                  onCardClick={() => handlePlanClick(plan)}
                  onToggleBookmark={() => toggleBookmark(plan.study_plan_id)}
                  onAddToMyPlans={() => addToMyPlans(plan)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No plans found"
              description={
                searchQuery
                  ? "검색 결과가 없습니다. 다른 키워드를 입력해보세요."
                  : "현재 등록된 추천 계획이 없습니다."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
