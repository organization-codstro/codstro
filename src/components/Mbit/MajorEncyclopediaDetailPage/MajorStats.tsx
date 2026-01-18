import React from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import { MajorStatsProps } from "../../../types/pages/Mbit/MajorEncyclopediaDetailPage/MajorStats";


const MajorStats: React.FC<MajorStatsProps> = ({ salaryRange, jobOutlook }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-6 bg-blue-50 rounded-xl">
        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Salary Range
        </h3>
        <p className="text-2xl font-bold text-[#587CF0]">{salaryRange}</p>
        <p className="mt-2 text-sm text-gray-600">Annual salary in USD</p>
      </div>

      <div className="p-6 bg-green-50 rounded-xl">
        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Job Outlook
        </h3>
        <p className="text-lg font-semibold text-gray-700">{jobOutlook}</p>
      </div>
    </div>
  );
};

export default MajorStats;
