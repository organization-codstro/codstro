import { Badge } from "../Profile";

export interface BadgeDetailModalProps {
  badge: Badge;
  onClose: () => void;
  onSetDisplay: (badgeName: string) => void;
}
