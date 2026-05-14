import { EvaluationResult } from "../../../api/CompanyInformation/InterviewDetailPage";

export interface FeedbackViewProps {
  feedback: string;
  evaluation: EvaluationResult | null;
  isLast: boolean;
  onNext: () => void;
}
