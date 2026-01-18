import React from "react";
import { MajorDetailHeaderProps } from "../../../types/pages/Mbit/MajorEncyclopediaDetailPage/MajorDetailHeader";

const MajorDetailHeader: React.FC<MajorDetailHeaderProps> = ({ major }) => {
  return (
    <div className={`bg-gradient-to-r  p-8 text-white`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20"></div>
        <h1 className="text-4xl font-bold">{major.name}</h1>
      </div>
      <p className="text-lg text-white text-opacity-90">{major.description}</p>
    </div>
  );
};

export default MajorDetailHeader;
