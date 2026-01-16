import React from "react";
import { Filter } from "lucide-react";
import { FilterGroup } from "../FilterGroup";
import { CloneCodingProjectFiltersProps } from "../../../types/pages/Woomoonro/CloneCodingProjectMainPage/CloneCodingProjectFilters";
import { CLONE_CODINGS_DIFFICULTIES } from "../../../constants/Woomoonro/woomoonro";

const ProjectFilters: React.FC<CloneCodingProjectFiltersProps> = ({
  selectedFilter,
  setSelectedFilter,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl w-fit">
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-[#587CF0]" />
          <FilterGroup
            label="Status"
            current={selectedFilter}
            options={CLONE_CODINGS_DIFFICULTIES}
            onChange={setSelectedFilter}
          />
        </div>
        <FilterGroup
          label="Difficulty"
          current={selectedDifficulty}
          options={CLONE_CODINGS_DIFFICULTIES}
          onChange={setSelectedDifficulty}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
