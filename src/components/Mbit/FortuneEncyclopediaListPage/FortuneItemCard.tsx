import React from "react";
import { FortuneItemCardProps } from "../../../types/pages/Mbit/FortuneEncyclopediaListPage/FortuneItemCard";

export const FortuneItemCard: React.FC<FortuneItemCardProps> = ({
  fortune,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(fortune.id)}
      className="p-6 transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 pl-4">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {fortune.code} - {fortune.name}
          </h3>
          <p className="text-gray-600">{fortune.summary}</p>
        </div>
      </div>
    </div>
  );
};

