export interface DocumentFilterBarProps {
  selectedGroupType: string;
  onSelectType: (type: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}