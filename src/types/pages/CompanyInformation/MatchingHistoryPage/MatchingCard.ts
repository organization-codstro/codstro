import { CompanyMatch } from "../../../common/CompanyInformation";

export interface MatchingCardProps {
  match: CompanyMatch;
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
