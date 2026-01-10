import React from "react";
import { FilterSectionProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/FilterSection";

const FilterSection: React.FC<FilterSectionProps> = ({ children }) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
};

export default FilterSection;
