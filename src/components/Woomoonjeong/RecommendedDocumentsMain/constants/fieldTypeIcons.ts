import {
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";

//필드 설정할때 표시할수 있는 그룹의 종류
type FieldGroupType =
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

//필드당 아이콘 표시할때 사용되는 아이콘
export const fieldTypeIcons: Record<FieldGroupType, React.ElementType> = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};
