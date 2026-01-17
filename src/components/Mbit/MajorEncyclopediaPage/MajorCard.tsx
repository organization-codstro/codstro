import React from "react";
import { MajorCardProps } from "../../../types/pages/Mbit/MajorEncyclopediaPage/MajorCard";

const MajorCard: React.FC<MajorCardProps> = ({ major, onClick }) => {
  console.log(major);
  return (
    <div
      onClick={() => onClick(major)}
      className="overflow-hidden transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`bg-gradient-to-r  p-6`}>
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-2xl font-bold text-black">{major.name}</h3>
        </div>
        <p className="text-white text-opacity-90">{major.description}</p>
      </div>
    </div>
  );
};

export default MajorCard;
