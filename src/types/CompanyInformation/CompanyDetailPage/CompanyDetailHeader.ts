export interface CompanyDetailHeaderProps {
  name: string;
  industry: string;
  isBookmarked: boolean;
  onBack: () => void;
  onBookmarkToggle: () => void;
}
