import { Company } from "../company";

export interface CompanyListItemProps {
  company: Company;
  isBookmarked: boolean;
  onToggleBookmark: (id: number, e: React.MouseEvent) => void;
  onSelect: (id: number) => void;
}
