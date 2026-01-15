export interface ThirdPartyHeaderProps {
  name: string;
  category: string[];
  description: string;
  officialSite: string | null;
  isUnderstood: boolean;
  onToggleUnderstood: () => void;
}
