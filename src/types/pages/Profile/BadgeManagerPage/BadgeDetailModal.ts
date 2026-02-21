import { Badge } from "../../../common/Profile";

export interface BadgeDetailModalProps {
  badge: Badge;
  onClose: () => void;
  onSetDisplay: (badgeName: string) => void;
}
