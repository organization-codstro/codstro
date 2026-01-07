export interface ProjectDetailHeaderProps {
  title: string;
  description: string;
  isBookmarked: boolean;
  onBack: () => void;
  onToggleBookmark: () => void;
}
