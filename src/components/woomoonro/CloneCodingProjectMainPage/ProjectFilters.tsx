import React from "react";
import { Filter } from "lucide-react";
import { FilterGroup } from "../FilterGroup";
import { ProjectFiltersProps } from "../../../types/Woomoonro/WoomoonroMainPage/ProjectFilters";



const ProjectFilters: React.FC<ProjectFiltersProps> = ({
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
            options={["all", "bookmarked", "in_progress", "completed"]}
            onChange={setSelectedFilter}
          />
        </div>
        <FilterGroup
          label="Difficulty"
          current={selectedDifficulty}
          options={["all", "beginner", "intermediate", "advanced"]}
          onChange={setSelectedDifficulty}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
