import { Company } from "../../../common/CompanyInformation";

export interface BookmarkCardProps {
  company: Company;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onClick: (id: string) => void;
}
