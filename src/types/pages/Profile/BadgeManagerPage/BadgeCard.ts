import { Badge } from "../Profile";

export interface BadgeCardProps {
  badge: Badge;
  onClick: () => void;
  isDisplayed?: boolean;
}
