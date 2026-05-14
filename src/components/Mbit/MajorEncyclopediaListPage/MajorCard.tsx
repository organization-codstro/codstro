import React from "react";
import { MajorCardProps } from "../../../types/pages/Mbit/MajorEncyclopediaListPage/MajorCard";

export const MajorCard: React.FC<MajorCardProps> = ({ major, onClick }) => {
  return (
    <div
      onClick={() => onClick(major.major_id)}
      className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
    >
      <div className="p-6">
        {/* 전공 이름 */}
        <div className="mb-3">
          <h3 className="mt-1 text-xl font-semibold text-gray-800">
            {major.major_name}
          </h3>
        </div>

        {/* 전공 설명 */}
        <div>
          <p className="mt-1 text-gray-600 line-clamp-3">
            {major.major_description}
          </p>
        </div>
      </div>
    </div>
  );
};
