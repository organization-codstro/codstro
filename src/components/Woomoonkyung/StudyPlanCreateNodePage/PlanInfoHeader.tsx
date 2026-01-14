import { FileText } from "lucide-react";
import { PlanInfoHeaderProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/PlanInfoHeader";

export const PlanInfoHeader = ({ planInfo }: PlanInfoHeaderProps) => (
  <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gradient-to-r from-[#587CF0] to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
        <FileText className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          {planInfo.study_plan_name}
        </h1>
        <p className="text-gray-600">{planInfo.study_plan_description}</p>
      </div>
    </div>
  </div>
);
