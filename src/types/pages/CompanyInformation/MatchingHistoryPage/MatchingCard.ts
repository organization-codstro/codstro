import { CompanyMatch } from "../../../common/companyInformation";

export interface MatchingCardProps {
  match: CompanyMatch;
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
