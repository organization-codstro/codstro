import React from "react";
import FortuneItemCard from "./FortuneItemCard";
import { FortuneListProps } from "../../../types/pages/Mbit/FortuneEncyclopediaPage/FortuneList";

const FortuneList: React.FC<FortuneListProps> = ({
  fortunes,
  onSelectFortune,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Fortune Encyclopedia
        </h1>
        <p className="text-gray-600">Learn about all possible fortune levels</p>
      </div>

      <div className="grid gap-6">
        {fortunes.map((fortune) => (
          <FortuneItemCard
            key={fortune.id}
            fortune={fortune}
            onClick={onSelectFortune}
          />
        ))}
      </div>
    </div>
  );
};

export default FortuneList;
