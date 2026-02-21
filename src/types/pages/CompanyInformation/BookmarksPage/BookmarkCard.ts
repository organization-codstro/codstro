import { Company } from "../../../common/companyInformation";

export interface BookmarkCardProps {
  company: Company;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onClick: (id: string) => void;
}
