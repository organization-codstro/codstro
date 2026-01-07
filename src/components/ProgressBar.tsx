import React from "react";

interface ProgressBarProps {
  percentage: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  const roundedPercentage = Math.round(percentage);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label || "Progress"}</span>
        <span className="font-medium">{roundedPercentage}%</span>
      </div>
      <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
        <div
          className="bg-[#587CF0] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${roundedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
