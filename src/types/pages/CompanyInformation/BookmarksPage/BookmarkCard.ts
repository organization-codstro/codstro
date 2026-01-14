import { Company } from "../company";

export interface BookmarkCardProps {
  company: Company;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onClick: (id: string) => void;
}
