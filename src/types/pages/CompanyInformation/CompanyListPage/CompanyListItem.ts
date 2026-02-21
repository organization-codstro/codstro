import { Company } from "../../../common/companyInformation";

export interface CompanyListItemProps {
  company: Company;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
}
