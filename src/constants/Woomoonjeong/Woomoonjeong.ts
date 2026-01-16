//필드 설정할때 표시할수 있는 그룹의 종류

export type GROUP_TYPE =
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

export const GROUP_TYPES: GROUP_TYPE[] = [
  "web",
  "app",
  "server",
  "game",
  "security",
  "work",
  "other",
];

export type TODO_STATUS_TYPE = "waiting" | "in-progress" | "done";

export const TODO_STATUS: TODO_STATUS_TYPE[] = [
  "waiting",
  "in-progress",
  "done",
];

import {
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";

//필드당 아이콘 표시할때 사용되는 아이콘
export const fieldTypeIcons: Record<GROUP_TYPE, React.ElementType> = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};
