import { Company } from "../../../common/CompanyInformation";

export interface CompanyListItemProps {
  company: Company;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
}
