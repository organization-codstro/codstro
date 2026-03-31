import { CompanyInterview } from "../../../common/CompanyInformation";

export interface InterviewCardProps {
  interview: CompanyInterview;
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
