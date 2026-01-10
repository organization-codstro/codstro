import { Company } from "../company";

export interface BookmarkCardProps {
  company: Company;
  onRemove: (id: number, e: React.MouseEvent) => void;
  onClick: (id: number) => void;
}
