export interface LibraryHeaderProps {
  name: string;
  language: string;
  description: string;
  category: string[];
  officialSite: string | null;

  isUnderstood: boolean;
  onToggleUnderstood: () => void;
}
