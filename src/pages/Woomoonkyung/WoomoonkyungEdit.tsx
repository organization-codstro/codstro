import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyPlanForm from "../../components/Woomoonkyung/Node/StudyPlanForm";
import { studyPlans } from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlan } from "../../types/Woomoonkyung/StudyPlanNode";

const WoomoonkyungEdit: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  /** 🔹 수정 대상 플랜 찾기 */
  const plan = studyPlans.find((p) => p.study_plan_id === Number(planId));

  /** 🔹 플랜이 없을 경우 (잘못된 접근) */
  if (!plan) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-red-500">
          Study plan not found
        </h2>
        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => navigate("/woomoonkyung")}
        >
          Back to list
        </button>
      </div>
    );
  }

  /** 🔹 저장 처리 */
  const handleSave = (
    planData: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => {
    // 실제 서비스에서는 API PUT 요청
    console.log("Update plan:", plan.study_plan_id, planData);

    navigate(`/woomoonkyung/plan/${plan.study_plan_id}`);
  };

  /** 🔹 취소 */
  const handleCancel = () => {
    navigate(`/woomoonkyung/plan/${plan.study_plan_id}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mt-2 text-2xl font-bold text-gray-800">
            Edit Study Plan
          </h1>
          <p className="text-gray-600">Update your study plan information</p>
        </div>

        {/* Form */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
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
