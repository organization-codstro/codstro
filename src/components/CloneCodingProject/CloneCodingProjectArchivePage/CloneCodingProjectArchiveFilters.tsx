import React from "react";
import { FilterGroup } from "../FilterGroup";
import { CloneCodingProjectArchiveFiltersProps } from "../../../types/pages/CloneCodingProject/CloneCodingProjectArchivePage/CloneCodingProjectArchiveFilters";
import { CLONE_CODINGS_DIFFICULTIES } from "../../../constants/CloneCodingProject/CloneCodingProject";

export const ArchiveFilters: React.FC<
  CloneCodingProjectArchiveFiltersProps
> = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center gap-8">
        <FilterGroup
          label="Status"
          current={selectedFilter}
          options={CLONE_CODINGS_DIFFICULTIES}
          onChange={setSelectedFilter}
        />
      </div>
    </div>
  );
};
