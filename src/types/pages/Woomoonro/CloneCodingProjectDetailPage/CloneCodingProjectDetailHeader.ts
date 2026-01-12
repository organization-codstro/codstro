export interface CloneCodingProjectDetailHeaderProps {
  title: string;
  description: string;
  isBookmarked: boolean;
  onBack: () => void;
  onToggleBookmark: () => void;
}
