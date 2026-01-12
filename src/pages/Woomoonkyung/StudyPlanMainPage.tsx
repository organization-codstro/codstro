import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  studyPlans,
  studyPlanNodes,
  recommendedStudyPlanNodes,
  stateColors,
} from "../../data/Woomoonkyung/woomoonkyungData";
import StudyPlanCard from "../../components/Woomoonkyung/StudyPlanMainPage/StudyPlanCard";
import DashboardHeader from "../../components/Woomoonkyung/StudyPlanMainPage/DashboardHeader";
import ActivePlanSection from "../../components/Woomoonkyung/StudyPlanMainPage/ActivePlanSection";
import EmptyPlanState from "../../components/Woomoonkyung/StudyPlanMainPage/EmptyPlanState";

const WoomoonkyungMain: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 통계 및 데이터 로직 (부모에서 관리)
  const getStats = (planId: number) => {
    const plan = studyPlans.find((p) => p.study_plan_id === planId);
    const nodesSource = plan?.study_plan_is_recommendation
      ? recommendedStudyPlanNodes
      : studyPlanNodes;

    const nodes = nodesSource
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);

    const total = nodes.length;
    const completed = nodes.filter((n) => n.completed).length;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, progress };
  };

  const handleDeletePlan = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast.success("공부 계획이 삭제되었습니다.");
  };

  const activeMyPlans = studyPlans.filter(
    (plan) =>
      !plan.study_plan_is_recommendation &&
      plan.study_plans_state === "in progress"
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 영역 */}
        <DashboardHeader
          title="Woomoonkyung"
          description="현재 진행 중인 나의 학습 계획을 관리하세요"
          onArchiveClick={() => navigate("/woomoonkyung/archive")}
          onCreateClick={() => navigate("/woomoonkyung/create")}
        />

        {/* 진행 중인 플랜 섹션 */}
        <ActivePlanSection count={activeMyPlans.length}>
          {activeMyPlans.length === 0 ? (
            <EmptyPlanState
              message="현재 진행 중인 나의 계획이 없습니다."
              actionLabel="새로운 계획을 만들어보세요"
              onActionClick={() => navigate("/woomoonkyung/create")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeMyPlans.map((plan) => {
                const { total, completed, progress } = getStats(
                  plan.study_plan_id
                );
                return (
                  <StudyPlanCard
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
          )}
        </ActivePlanSection>
      </div>
    </div>
  );
};

export default WoomoonkyungMain;
