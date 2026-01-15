export interface ThirdPartyCardProps {
  id: string;
  name: string;
  description: string;
  category: string[];
  onClick: (id: string) => void;
}
