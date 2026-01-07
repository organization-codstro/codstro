import React from "react";
import { Sparkles } from "lucide-react";
import { Fortune } from "../../../data/Mbit/fortuneData";

interface DetailHeaderProps {
  fortune: Fortune;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ fortune }) => {
  return (
    <div className={`${fortune.color} p-8 text-white`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold">{fortune.code}</h1>
      </div>
      <p className="text-lg text-white text-opacity-90">{fortune.name}</p>
    </div>
  );
};

export default DetailHeader;
