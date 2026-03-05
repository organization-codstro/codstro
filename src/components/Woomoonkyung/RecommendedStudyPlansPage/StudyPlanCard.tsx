import React from "react";
import { Calendar, Download } from "lucide-react";
import { StudyPlanCardProps } from "../../../types/pages/Woomoonkyung/RecommendedStudyPlansPage/StudyPlanCard";

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  totalNodes,
  //isBookmarked,
  onCardClick,
  //onToggleBookmark,
  onAddToMyPlans,
}) => {
  return (
    <div
      className="flex flex-col overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
      onClick={() => onCardClick(plan)}
    >
      {plan.study_plan_image_url && (
        <div className="h-32 overflow-hidden bg-gray-200">
          <img
            src={plan.study_plan_image_url}
            alt={plan.study_plan_name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-gray-800 line-clamp-1">
              {plan.study_plan_name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {plan.study_plan_description}
            </p>
          </div>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(plan.study_plan_id);
            }}
            className="p-1 transition-colors rounded-full hover:bg-gray-100"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-yellow-500" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400" />
            )}
          </button> */}
        </div>

        <div className="mt-auto">
          <div className="flex justify-between mb-3 text-xs text-gray-500">
            <span>Learning Nodes</span>
            <span>{totalNodes} steps</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(plan.study_plan_start_date).toLocaleDateString()}
              </span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(plan.study_plan_end_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToMyPlans(plan);
            }}
            className="w-full px-3 py-2 bg-[#587CF0] text-white text-sm rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3 h-3" />
            Add to My Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCard;
