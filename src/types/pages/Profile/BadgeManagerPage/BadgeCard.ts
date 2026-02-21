import { Badge } from "../../../common/Profile";

export interface BadgeCardProps {
  badge: Badge;
  onClick: () => void;
  isDisplayed?: boolean;
}
