import React from "react";
import { FilterGroup } from "../FilterGroup";
import { CloneCodingProjectArchiveFiltersProps } from "../../../types/pages/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectArchiveFilters";
import { CLONE_CODINGS_DIFFICULTIES } from "../../../constants/Woomoonkyung/Woomoonkyung";

const ArchiveFilters: React.FC<CloneCodingProjectArchiveFiltersProps> = ({
  selectedFilter,
  setSelectedFilter,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center gap-8">
        <FilterGroup
          label="Status"
          current={selectedFilter}
          options={CLONE_CODINGS_DIFFICULTIES}
          onChange={setSelectedFilter}
        />
        <FilterGroup
          label="Difficulty"
          current={selectedDifficulty}
          options={CLONE_CODINGS_DIFFICULTIES}
          onChange={setSelectedDifficulty}
        />
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-semibold text-gray-700">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
          >
            <option value="date">Latest Date</option>
            <option value="title">Project Title</option>
            <option value="difficulty">Difficulty Level</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArchiveFilters;
