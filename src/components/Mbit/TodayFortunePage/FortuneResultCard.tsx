import React from "react";
import FortuneCategoryMessage from "./FortuneCategoryMessage";
import { Fortune } from "../../../data/Mbit/fortuneData";

interface FortuneResultCardProps {
  fortune: Fortune;
}

const FortuneResultCard: React.FC<FortuneResultCardProps> = ({ fortune }) => {
  return (
    <div
      className={`bg-gradient-to-br ${fortune.color} rounded-2xl p-12 shadow-xl text-white`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center w-32 h-32 mx-auto mb-6 bg-white rounded-full bg-opacity-20">
          <span className="text-6xl font-bold">{fortune.code}</span>
        </div>
        <h2 className="mb-2 text-4xl font-bold">{fortune.name}</h2>
        <p className="mb-6 text-2xl font-semibold">{fortune.summary}</p>

        <div className="p-6 text-left bg-white bg-opacity-10 rounded-xl">
          <p className="mb-6 text-lg leading-relaxed">{fortune.description}</p>
          <FortuneCategoryMessage message={fortune.categoryMessage} />
        </div>
      </div>
    </div>
  );
};

export default FortuneResultCard;
