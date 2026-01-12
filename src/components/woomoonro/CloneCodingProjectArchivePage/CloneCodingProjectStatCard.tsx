import { CloneCodingProjectStatCardProps } from "../../../types/pages/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectStatCard";

export const StatCard = ({
  icon,
  label,
  value,
  bgColor,
}: CloneCodingProjectStatCardProps) => (
  <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center w-10 h-10 ${bgColor} rounded-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);
