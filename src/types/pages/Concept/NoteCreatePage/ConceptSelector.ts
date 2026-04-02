import { MATERIAL_TYPE } from "../../../../constants/Concepts/concepts";
import { ConceptItem } from "../../../common/Concepts";

export interface ConceptSelectorProps {
  availableConcepts: ConceptItem[];
  selectedConcepts: ConceptItem[];
  onToggle: (concept: ConceptItem) => void;
  isGenerating?: boolean;

  activeFilter: MATERIAL_TYPE | "all";
  onFilterChange: (type: MATERIAL_TYPE | "all") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoadingConcepts?: boolean;
}
