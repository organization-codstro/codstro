import React from "react";
import { FortuneCategoryMessage } from "./FortuneCategoryMessage";
import { FortuneResultCardProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneResultCard";

export const FortuneResultCard: React.FC<FortuneResultCardProps> = ({
  fortune,
}) => {
  return (
    <div className="p-16 bg-white border border-gray-100 shadow-xl rounded-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center mx-auto mb-6 rounded-full w-44 h-44 bg-gradient-to-br from-blue-400 to-purple-500">
          <span className="text-6xl font-bold text-white">{fortune.code}</span>
        </div>

        <h2 className="mb-3 text-4xl font-bold text-blue-500">
          {fortune.name}
        </h2>

        <p className="mb-6 text-2xl font-semibold text-blue-500">
          {fortune.summary}
        </p>

        <div className="p-8 text-left border border-gray-100 bg-gray-50 rounded-xl">
          <p className="mb-6 text-lg leading-relaxed text-gray-400">
            {fortune.description}
          </p>

          <FortuneCategoryMessage message={fortune.categoryMessage} />
        </div>
      </div>
    </div>
  );
};
