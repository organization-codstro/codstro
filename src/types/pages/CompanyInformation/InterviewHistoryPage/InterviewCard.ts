export interface InterviewCardProps {
  interview: {
    id: string;
    company_qna_question: string | null;
    company_user_qna_answer: string | null;
    company_user_qna_create_at: string;
    company_user_qna_evaluation: string | null;
  };
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
