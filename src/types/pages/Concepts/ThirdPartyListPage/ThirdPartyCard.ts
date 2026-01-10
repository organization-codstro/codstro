export interface ThirdPartyCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  onClick: (id: string) => void;
}
