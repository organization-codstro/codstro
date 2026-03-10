export interface CollectionCardProps {
  name: string;
  gender: string;
  oneLineIntroduction?: string;
  preferredFeatures: string;
  profileImageUrl?: string;
  onClick: () => void;
}
