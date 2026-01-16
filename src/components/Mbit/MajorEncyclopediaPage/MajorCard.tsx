import React from "react";
import { MajorCardProps } from "../../../types/pages/Mbit/MajorEncyclopediaPage/MajorCard";

const MajorCard: React.FC<MajorCardProps> = ({ major, onClick }) => {

  return (
    <div
      onClick={() => onClick(major)}
      className="overflow-hidden transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`bg-gradient-to-r ${major.color} p-6`}>
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-2xl font-bold text-white">{major.name}</h3>
        </div>
        <p className="text-white text-opacity-90">{major.description}</p>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h4 className="mb-2 font-semibold text-gray-800">
            Key Technologies:
          </h4>
          <p className="text-sm text-gray-600">{major.focus}</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-gray-800">Career Paths:</h4>
          <p className="text-sm text-gray-600">{major.careers}</p>
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
