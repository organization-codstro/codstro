export interface CloneCodingProjectFiltersProps {
  selectedFilter: "all" | "waiting" | "in progress" | "done";
  setSelectedFilter: (val: "all" | "waiting" | "in progress" | "done") => void;
}
