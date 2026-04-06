import { ConceptItem } from "../../../common/Concepts";

export interface ConceptSelectorProps {
  availableConcepts: ConceptItem[];
  selectedConcepts: ConceptItem[];
  onToggle: (concept: ConceptItem) => void;

  activeFilter: string;
  onFilterChange: (type: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoadingConcepts?: boolean;
}