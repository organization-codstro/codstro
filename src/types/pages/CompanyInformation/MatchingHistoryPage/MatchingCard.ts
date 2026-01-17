export interface MatchingCardProps {
  match: {
    company_user_match_id: string;
    company_user_match_name: string;
    created_at: string;
    company_user_match_rate: number;
  };
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
