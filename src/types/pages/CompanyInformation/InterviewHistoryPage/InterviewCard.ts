export interface InterviewCardProps {
  interview: {
    id: string;
    company_qna_question: string;
    company_user_qna_answer: string;
    company_user_qna_create_date: string;
  };
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
