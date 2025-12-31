import React from "react";
import {
  Plus,
  Calendar,
  Clock,
  Target,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Edit3,
  Trash2,
} from "lucide-react";
import {
  StudyPlan,
  StudyPlanNode,
  studyPlans,
  studyPlanNodes,
  stateColors,
  stateIcons,
} from "../../data/Woomoonkyung/woomoonkyungData";
import { useNavigate } from "react-router-dom";

const WoomoonkyungMain: React.FC = () => {
  const navigate = useNavigate();

  const getNodesForPlan = (planId: string): StudyPlanNode[] => {
    return studyPlanNodes
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  const getCompletedNodesCount = (planId: string) =>
    getNodesForPlan(planId).filter((node) => node.completed).length;

  const getTotalNodesCount = (planId: string) => getNodesForPlan(planId).length;

  const getProgressPercentage = (planId: string) => {
    const total = getTotalNodesCount(planId);
    const completed = getCompletedNodesCount(planId);
    return total > 0 ? (completed / total) * 100 : 0;
  };

  // Statistics
  const totalPlans = studyPlans.length;
  const waitingPlans = studyPlans.filter(
    (p) => p.study_plans_state === "waiting"
  ).length;
  const inProgressPlans = studyPlans.filter(
    (p) => p.study_plans_state === "in progress"
  ).length;
  const completedPlans = studyPlans.filter(
    (p) => p.study_plans_state === "done"
  ).length;

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Woomoonkyung</h1>
            <p className="text-gray-600">
              Create and manage your coding study plans
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
            onClick={() => navigate("/woomoonkyung/create")}
          >
            <Plus className="w-4 h-4" />
            Add Study Plan
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard
            icon={<BookOpen />}
            label="Total Plans"
            value={totalPlans}
          />
          <StatCard icon={<Clock />} label="Waiting" value={waitingPlans} />
          <StatCard
            icon={<TrendingUp />}
            label="In Progress"
            value={inProgressPlans}
          />
          <StatCard
            icon={<CheckCircle2 />}
            label="Completed"
            value={completedPlans}
          />
        </div>

        {/* Study Plan List */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            My Study Plans
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studyPlans.map((plan) => {
              const completedNodes = getCompletedNodesCount(plan.study_plan_id);
              const totalNodes = getTotalNodesCount(plan.study_plan_id);
              const progress = getProgressPercentage(plan.study_plan_id);

              return (
                <div
                  key={plan.study_plan_id}
                  className="transition-shadow border border-gray-200 rounded-lg hover:shadow-md"
                  onClick={() =>
                    navigate(`/woomoonkyung/plan/${plan.study_plan_id}`)
                  }
                >
                  {plan.study_plans_image_url && (
                    <img
                      src={plan.study_plans_image_url}
                      alt={plan.study_plan_name}
                      className="object-cover w-full h-32 rounded-t-lg"
                    />
                  )}

                  <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {plan.study_plan_name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {plan.study_plan_description}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${
                        stateColors[plan.study_plans_state]
                      }`}
                    >
                      {stateIcons[plan.study_plans_state]}
                      {plan.study_plans_state}
                    </span>

                    <div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>
                          {completedNodes}/{totalNodes}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="bg-[#587CF0] h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        <Calendar className="inline w-3 h-3 mr-1" />
                        {new Date(
                          plan.study_plans_start_date
                        ).toLocaleDateString()}
                      </span>
                      <span>
                        <Target className="inline w-3 h-3 mr-1" />
                        {new Date(
                          plan.study_plans_end_date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== 통계 카드 컴포넌트 ===== */
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default WoomoonkyungMain;
