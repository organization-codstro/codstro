import React from "react";
import { MajorDetailHeaderProps } from "../../../types/pages/Mbit/MajorEncyclopediaDetailPage/MajorDetailHeader";

const MajorDetailHeader: React.FC<MajorDetailHeaderProps> = ({ major }) => {
  return (
    <div className="p-8 space-y-8">
      {/* name */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          {major.major_name}
        </h2>
        <p className="leading-relaxed text-gray-700">
          {major.major_description}
        </p>
      </section>
    </div>
  );
};

export default MajorDetailHeader;
