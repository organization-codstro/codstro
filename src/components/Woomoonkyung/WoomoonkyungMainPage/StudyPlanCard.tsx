import React, { useState, useEffect } from "react";
import { Calendar, Target, Trash2, Award, User } from "lucide-react";
import { StudyPlanCardProps } from "../../../types/Woomoonkyung/WoomoonkyungMainPage/StudyPlanCard";

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  completedNodes,
  totalNodes,
  progress,
  stateColors,
  onPlanClick,
  onDeleteClick,
}) => {
  const isPlanRecommended = plan.study_plan_is_recommendation;

  // [추가] 삭제 대기 상태 (해당 카드 내에서만 관리)
  const [isDeletePending, setIsDeletePending] = useState(false);

  // [추가] 3초 타이머: 대기 상태 자동 해제
  useEffect(() => {
    if (isDeletePending) {
      const timer = setTimeout(() => setIsDeletePending(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDeletePending]);

  // [추가] 2단계 삭제 핸들러
  const handleSafeDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    if (isDeletePending) {
      // 2차 클릭: 실제 삭제 수행
      onDeleteClick(e, plan.study_plan_id);
      setIsDeletePending(false);
    } else {
      // 1차 클릭: 대기 상태로 전환
      setIsDeletePending(true);
    }
  };

  return (
    <div
      className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md group"
      onClick={() => onPlanClick(plan.study_plan_id)}
    >
      {/* 썸네일 이미지 */}
      {plan.study_plans_image_url && (
        <div className="h-32 overflow-hidden bg-gray-200">
          <img
            src={plan.study_plans_image_url}
            alt={plan.study_plan_name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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

          {/* [수정] 삭제 버튼: 상태에 따라 스타일 변경 */}
          <button
            onClick={handleSafeDelete}
            className={`p-2 ml-2 transition-all duration-200 rounded border ${
              isDeletePending
                ? "bg-red-500 text-white border-red-500 shadow-sm scale-110"
                : "text-gray-400 border-transparent hover:bg-red-50 hover:text-red-500"
            }`}
            title={isDeletePending ? "한 번 더 눌러서 삭제" : "Delete plan"}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* 배지 영역: 추천 여부 및 상태 */}
        <div className="flex flex-wrap gap-2">
          {isPlanRecommended ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
              <Award className="w-3 h-3" /> System
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 rounded-full">
              <User className="w-3 h-3" /> My Plan
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-full border ${
              stateColors[plan.study_plans_state]
            }`}
          >
            {plan.study_plans_state.toUpperCase()}
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
            {new Date(plan.study_plans_start_date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {new Date(plan.study_plans_end_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCard;
