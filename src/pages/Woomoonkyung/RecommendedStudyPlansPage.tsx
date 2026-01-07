import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  studyPlans as recommendedStudyPlans,
  studyPlanNodes as recommendedStudyPlanNodes,
  bookmarkedPlans,
} from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlan } from "../../types/Woomoonkyung/StudyPlanNode";
import PlanSearchHeader from "../../components/Woomoonkyung/RecommendedStudyPlansPage/PlanSearchHeader";
import StudyPlanCard from "../../components/Woomoonkyung/RecommendedStudyPlansPage/StudyPlanCard";
import EmptyState from "../../components/Woomoonkyung/RecommendedStudyPlansPage/EmptyState";


const RecommendedStudyPlans: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<number>>(
    new Set(
      bookmarkedPlans
        .filter((b) => b.is_bookmarked)
        .map((b) => Number(b.study_plan_id))
    )
  );

  // 로직: 특정 플랜의 노드 개수 계산
  const getTotalNodesCount = (planId: number): number => {
    return recommendedStudyPlanNodes.filter(
      (node) => node.study_plan_id === planId
    ).length;
  };

  // 핸들러: 플랜 클릭 시 이동
  const handlePlanClick = (plan: StudyPlan) => {
    navigate(`/woomoonkyung/recommended/${plan.study_plan_id}`);
  };

  // 핸들러: 북마크 토글
  const toggleBookmark = (planId: number) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(planId)) {
      newBookmarks.delete(planId);
      toast.info("북마크가 해제되었습니다.");
    } else {
      newBookmarks.add(planId);
      toast.success("북마크에 추가되었습니다.");
    }
    setBookmarks(newBookmarks);
  };

  // 핸들러: 플랜 추가
  const addToMyPlans = (plan: StudyPlan) => {
    toast.success(`"${plan.study_plan_name}" 계획이 추가되었습니다!`);
  };

  // 필터링 로직
  const filteredPlans = recommendedStudyPlans.filter((plan) => {
    const query = searchQuery.toLowerCase();
    return (
      plan.study_plan_name.toLowerCase().includes(query) ||
      plan.study_plan_description.toLowerCase().includes(query)
    );
  });

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

          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlans.map((plan) => (
                <StudyPlanCard
                  key={plan.study_plan_id}
                  plan={plan}
                  totalNodes={getTotalNodesCount(plan.study_plan_id)}
                  isBookmarked={bookmarks.has(plan.study_plan_id)}
                  onCardClick={handlePlanClick}
                  onToggleBookmark={toggleBookmark}
                  onAddToMyPlans={addToMyPlans}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No plans found"
              description="Try adjusting your search query"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedStudyPlans;
