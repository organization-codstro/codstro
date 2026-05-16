export interface CloneCodingProjectDetailHeaderProps {
  title: string;
  description: string;
  isBookmarked: boolean | undefined;
  onToggleBookmark: () => void;
  thumbnailUrl: string | undefined;
}
