import React from "react";
import { Calendar, Target, Trash2, AlertCircle } from "lucide-react";
import { StudyPlanCardProps } from "../../../types/pages/StudyPlan/StudyPlanArchivePage/ArchiveStudyPlanCard";

export const ArchiveStudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  completedNodes,
  totalNodes,
  progress,
  stateColors,
  onPlanClick,
  onDeleteClick,
  isDeleting = false,
}) => {
  return (
    <div
      className={`overflow-hidden transition-all bg-white border rounded-lg cursor-pointer hover:shadow-md group relative ${
        isDeleting ? "border-red-400 ring-2 ring-red-100" : "border-gray-200"
      }`}
      onClick={() => onPlanClick(plan.study_plan_id)}
    >
      {/* 삭제 대기 상태 Overlay (Pending UI) */}
      {isDeleting && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px] transition-all">
          <AlertCircle className="w-8 h-8 mb-2 text-red-500 animate-bounce" />
          <span className="text-xs font-bold text-red-600">
            한 번 더 클릭 시 삭제
          </span>
        </div>
      )}

      {/* 썸네일 이미지 */}
      {plan.study_plan_image_url && (
        <div className="h-32 overflow-hidden bg-gray-200">
          <img
            src={plan.study_plan_image_url}
            alt={plan.study_plan_name}
            className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 ${
              isDeleting ? "grayscale-[0.5]" : ""
            }`}
          />
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-gray-800 line-clamp-1">
              {plan.study_plan_name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {plan.study_plan_description}
            </p>
          </div>
          {/* 삭제 버튼: isDeleting 상태에 따라 색상 변경 */}
          <button
            onClick={(e) => onDeleteClick(e, plan)}
            className={`p-2 ml-2 transition-colors rounded relative z-20 ${
              isDeleting
                ? "bg-red-500 text-white"
                : "text-gray-400 hover:bg-red-50 hover:text-red-500"
            }`}
            title={isDeleting ? "Confirm delete" : "Delete plan"}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* 배지 영역: 추천 여부 및 상태 */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-full border ${
              stateColors[plan.study_plan_state] ||
              "border-gray-200 text-gray-500"
            }`}
          >
            {plan.study_plan_state.toUpperCase()}
          </span>
        </div>

        {/* 진행률 바 */}
        <div>
          <div className="flex justify-between mb-1 text-xs text-gray-500">
            <span>Progress</span>
            <span className="font-medium">
              {completedNodes}/{totalNodes} Nodes
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="bg-[#587CF0] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 날짜 정보 */}
        <div className="flex justify-between text-[11px] text-gray-400 pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(plan.study_plan_start_date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {new Date(plan.study_plan_end_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
