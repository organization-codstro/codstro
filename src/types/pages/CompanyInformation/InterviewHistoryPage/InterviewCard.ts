import { CompanyInterview } from "../../../common/companyInformation";

export interface InterviewCardProps {
  interview: CompanyInterview;
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
