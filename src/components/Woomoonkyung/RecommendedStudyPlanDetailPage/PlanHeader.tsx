import React from "react";
import { Calendar, Download } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { PlanHeaderProps } from "../../../types/pages/Woomoonkyung/RecommendedStudyPlanDetailPage/PlanHeader";

const PlanHeader: React.FC<PlanHeaderProps> = ({
  plan,
  nodeCount,
  state,
  onAddToMyPlans,
  //  isBookmarked,
}) => {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
      {plan.study_plan_image_url && (
        <div className="h-48 overflow-hidden bg-gray-200">
          <img
            src={plan.study_plan_image_url}
            alt={plan.study_plan_name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              {plan.study_plan_name}
            </h1>
            <p className="mb-2 text-gray-600">{plan.study_plan_description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(plan.study_plan_start_date).toLocaleDateString()} -{" "}
                  {new Date(plan.study_plan_end_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{nodeCount} learning nodes</span>
              </div>
            </div>
          </div>
          <StatusBadge state={state} />
        </div>

        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToMyPlans(plan);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
          >
            <Download className="w-4 h-4" />
            Add to My Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
