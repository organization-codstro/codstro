export interface DocumentFilterBarProps {
  selectedGroupType: string;
  onSelectType: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
