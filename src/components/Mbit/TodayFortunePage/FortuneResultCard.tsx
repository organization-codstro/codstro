import React from "react";
import FortuneCategoryMessage from "./FortuneCategoryMessage";
import { FortuneResultCardProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneResultCard";

const FortuneResultCard: React.FC<FortuneResultCardProps> = ({ fortune }) => {
  return (
    <div className="bg-white rounded-2xl p-16 shadow-xl border border-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center w-44 h-44 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
          <span className="text-6xl font-bold text-white">{fortune.code}</span>
        </div>

        <h2 className="mb-3 text-4xl font-bold text-blue-500">
          {fortune.name}
        </h2>

        <p className="mb-6 text-2xl font-semibold text-blue-500">
          {fortune.summary}
        </p>

        <div className="p-8 text-left bg-gray-50 rounded-xl border border-gray-100">
          <p className="mb-6 text-lg leading-relaxed text-gray-400">
            {fortune.description}
          </p>

          <FortuneCategoryMessage message={fortune.categoryMessage} />
        </div>
      </div>
    </div>
  );
};

export default FortuneResultCard;
