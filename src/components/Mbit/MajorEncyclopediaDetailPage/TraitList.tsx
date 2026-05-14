import React from "react";
import { TraitListProps } from "../../../types/pages/Mbit/PersonalityEncyclopediaDetailPage/TraitList";

export const TraitList: React.FC<TraitListProps> = ({
  title,
  item,
  icon,
  bgColor,
  bulletColor,
}) => {
  return (
    <div className={`p-6 ${bgColor} rounded-xl`}>
      <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        <li className="flex items-start gap-2 text-gray-700">
          <span className={`mt-1 ${bulletColor}`}>•</span>
          <span>{item}</span>
        </li>
      </ul>
    </div>
  );
};
