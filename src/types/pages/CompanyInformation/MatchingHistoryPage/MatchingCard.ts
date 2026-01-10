export interface MatchingCardProps {
  match: {
    company_user_matche_id: number;
    company_user_matche_name: string;
    company_user_matche_created_date: string;
    match_rate: number;
  };
  isPending: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
}
