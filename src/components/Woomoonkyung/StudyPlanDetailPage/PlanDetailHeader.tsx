import React from "react";
import { Calendar, Target, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../StatusBadge";
import { ProgressBar } from "../../ProgressBar";
import { PlanDetailHeaderProps } from "../../../types/pages/Woomoonkyung/StudyPlanDetailPage/PlanDetailHeader";

//기본 이미지
import StudyPlanBasicImg from "../../../assets/images/Woomoonkyung/StudyPlanBasicImg.png";

export const PlanDetailHeader: React.FC<PlanDetailHeaderProps> = ({
  planId,
  name,
  description,
  imageUrl,
  startDate,
  endDate,
  state,
  completedNodes,
  totalNodes,
  progressPercentage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={imageUrl ? imageUrl : StudyPlanBasicImg}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">{name}</h1>
            <p className="mb-4 text-gray-600">{description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(startDate).toLocaleDateString()} -{" "}
                  {new Date(endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>
                  {completedNodes}/{totalNodes} nodes completed
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge state={state} />
            <button
              onClick={() => navigate(`/woomoonkyung/edit/${planId}`)}
              className="p-2 text-gray-400 transition-colors rounded-full hover:text-blue-500 hover:bg-gray-100"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <ProgressBar percentage={progressPercentage} label="Overall Progress" />
      </div>
    </div>
  );
};
