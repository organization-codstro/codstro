//필드 설정할때 표시할수 있는 그룹의 종류

export type GROUP_TYPE = "web" | "app" | "server" | "ai" | "work" | "other";

export type WOOMOONJEONG_HIERARCHY = "group" | "field" | "pin";

export const GROUP_TYPES: GROUP_TYPE[] = [
  "web",
  "app",
  "server",
  "ai",
  "work",
  "other",
];

export const DEFAULT_GROUP_TYPE: GROUP_TYPE = "web";

export type TODO_STATUS_TYPE = "waiting" | "in progress" | "done";

export const TODO_STATUS: TODO_STATUS_TYPE[] = [
  "waiting",
  "in progress",
  "done",
];

import {
  Code,
  Smartphone,
  Server,
  Briefcase,
  HelpCircle,
  Brain,
} from "lucide-react";

//그룹 아이콘 표시할때 사용되는 아이콘
export const GROUP_TYPE_ICONS: Record<GROUP_TYPE, React.ElementType> = {
  web: Code,
  app: Smartphone,
  server: Server,
  ai: Brain,
  work: Briefcase,
  other: HelpCircle,
};

//그룹 배경 색 설정
export const GROUP_TYPE_COLORS: Record<GROUP_TYPE, string> = {
  web: "bg-amber-50 text-amber-400 border-amber-100",
  app: "bg-yellow-50 text-yellow-400 border-yellow-100",
  server: "bg-lime-50 text-lime-400 border-lime-100",
  // game: "bg-green-100 text-green-700 border-green-200",
  // security: "bg-blue-100 text-blue-700 border-blue-200",
  ai: "bg-emerald-50 text-emerald-400 border-emerald-100",
  work: "bg-sky-50 text-sky-400 border-sky-100",
  other: "bg-violet-50 text-violet-400 border-violet-100",
};
