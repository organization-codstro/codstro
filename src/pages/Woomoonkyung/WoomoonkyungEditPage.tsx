import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studyPlans } from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlan } from "../../types/Woomoonkyung/Woomoonkyung";
import StudyPlanForm from "../../components/Woomoonkyung/StudyPlanForm";
import PlanNotFound from "../../components/Woomoonkyung/WoomoonkyungEditPage/PlanNotFound";
import PageHeader from "../../components/Woomoonkyung/WoomoonkyungEditPage/PageHeader";

const WoomoonkyungEdit: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const plan = studyPlans.find((p) => p.study_plan_id === Number(planId));

  /** 🔹 플랜이 없을 경우 처리 */
  if (!plan) {
    return <PlanNotFound message="해당 공부 계획을 찾을 수 없습니다." />;
  }

  const handleSave = (
    planData: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => {
    console.log("Update plan:", plan.study_plan_id, planData);
    navigate(`/woomoonkyung/plan/${plan.study_plan_id}`);
  };

  const handleCancel = () => {
    navigate(`/woomoonkyung/plan/${plan.study_plan_id}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Edit Study Plan"
          description="Update your study plan information and keep your goals on track."
        />

        <div className="p-8 bg-white border border-purple-100 shadow-xl rounded-2xl">
          <StudyPlanForm
            mode="edit"
            existingPlan={plan}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default WoomoonkyungEdit;
