import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Archive, Search } from "lucide-react";
import {
  studyPlans,
  studyPlanNodes,
  recommendedStudyPlans,
  recommendedStudyPlanNodes,
  bookmarkedPlans,
  stateColors,
} from "../../data/Woomoonkyung/woomoonkyungData";
import {
  StudyPlanNode,
  StudyPlan,
} from "../../types/Woomoonkyung/StudyPlanNode";
import ArchiveStudyPlanCard from "../../components/Woomoonkyung/StudyPlanArchive/ArchiveStudyPlanCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudyPlanArchive: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 1. 노드 데이터를 가져오는 함수 (내부에서 추천 여부 판단)
  const getNodesForPlan = (planId: number): StudyPlanNode[] => {
    const plan =
      studyPlans.find((p) => p.study_plan_id === planId) ||
      recommendedStudyPlans.find((p) => p.study_plan_id === planId);

    const nodesSource = plan?.study_plan_is_recommendation
      ? recommendedStudyPlanNodes
      : studyPlanNodes;

    return nodesSource
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  // 2. 통계 계산
  const getStats = (planId: number) => {
    const nodes = getNodesForPlan(planId);
    const total = nodes.length;
    const completed = nodes.filter((n) => n.completed).length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, progress };
  };

  // 3. 보관된 계획
  const getArchivedPlans = (): StudyPlan[] => {
    const completedUserPlans = studyPlans.filter(
      (plan) => plan.study_plans_state === "done"
    );

    const bookmarkedRecommendedPlans = recommendedStudyPlans.filter((plan) =>
      bookmarkedPlans.some(
        (bookmark) =>
          bookmark.study_plan_id === plan.study_plan_id &&
          bookmark.is_bookmarked
      )
    );

    return [...completedUserPlans, ...bookmarkedRecommendedPlans];
  };

  const handleDeletePlan = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    // 실제 앱에서는 API 호출
    toast.success("공부 계획이 삭제되었습니다.", {
      position: "top-right",
    });
  };

  const filteredPlans = getArchivedPlans().filter((plan) => {
    const query = searchQuery.toLowerCase();
    return (
      plan.study_plan_name.toLowerCase().includes(query) ||
      plan.study_plan_description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <Archive className="text-[#587CF0]" />
              Study Plans Archive
            </h1>
            <p className="text-gray-600">완료된 내 계획을 확인하세요</p>
          </div>

          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search archived plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none bg-white transition-all w-64"
            />
          </div>
        </div>

        {/* Archived Plans List */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Archived Plans ({filteredPlans.length})
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              const { total, completed, progress } = getStats(
                plan.study_plan_id
              );

              return (
                <ArchiveStudyPlanCard
                  key={plan.study_plan_id}
                  plan={plan}
                  completedNodes={completed}
                  totalNodes={total}
                  progress={progress}
                  stateColors={stateColors}
                  onPlanClick={(id) => navigate(`/woomoonkyung/plan/${id}`)}
                  onDeleteClick={handleDeletePlan}
                />
              );
            })}
          </div>

          {filteredPlans.length === 0 && (
            <div className="py-20 text-center">
              <Archive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                보관된 계획이 없습니다
              </h3>
              <p className="text-gray-600">
                계획을 완료하거나 추천 계획을 북마크해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanArchive;
