import React from "react";
import { Plus, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudyPlanCard from "../../components/Woomoonkyung/WoomoonkyungMain/StudyPlanCard"; // 분리한 컴포넌트 임포트
import {
  studyPlans,
  studyPlanNodes,
  recommendedStudyPlanNodes,
  stateColors,
} from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlanNode } from "../../types/Woomoonkyung/StudyPlanNode";
import { toast } from "react-toastify";

const WoomoonkyungMain: React.FC = () => {
  const navigate = useNavigate();

  // 노드 데이터 가져오기 로직 (추천 여부 판단 포함)
  const getNodesForPlan = (planId: number): StudyPlanNode[] => {
    const plan = studyPlans.find((p) => p.study_plan_id === planId);
    // 추천 계획이면 recommendedSource에서, 아니면 일반 source에서 가져옴
    const nodesSource = plan?.study_plan_is_recommendation
      ? recommendedStudyPlanNodes
      : studyPlanNodes;

    return nodesSource
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  // 통계 계산용 헬퍼
  const getStats = (planId: number) => {
    const nodes = getNodesForPlan(planId);
    const total = nodes.length;
    const completed = nodes.filter((n) => n.completed).length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, progress };
  };

  // 삭제 핸들러
  const handleDeletePlan = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    // TODO: 삭제 API 호출
    toast.success("공부 계획이 삭제되었습니다.", {
      position: "top-right",
    });
  };

  // 필터링: 내가 만든 계획(recommendation: false)이면서 진행 중(in progress)인 것들
  const activeMyPlans = studyPlans.filter(
    (plan) =>
      !plan.study_plan_is_recommendation &&
      plan.study_plans_state === "in progress"
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Woomoonkyung</h1>
            <p className="text-gray-600">
              현재 진행 중인 나의 학습 계획을 관리하세요
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => navigate("/woomoonkyung/archive")}
            >
              <Archive className="w-4 h-4" />
              Archive
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors shadow-sm"
              onClick={() => navigate("/woomoonkyung/create")}
            >
              <Plus className="w-4 h-4" />
              Add Study Plan
            </button>
          </div>
        </div>

        {/* Current Active My Plans Section */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-800">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Active My Plans ({activeMyPlans.length})
          </h2>

          {activeMyPlans.length === 0 ? (
            <div className="py-20 text-center border-2 border-gray-100 border-dashed rounded-xl">
              <p className="text-gray-400">
                현재 진행 중인 나의 계획이 없습니다.
              </p>
              <button
                onClick={() => navigate("/woomoonkyung/create")}
                className="mt-2 text-[#587CF0] font-medium hover:underline"
              >
                새로운 계획을 만들어보세요
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default WoomoonkyungMain;
