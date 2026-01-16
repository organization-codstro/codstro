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

//CreateTodoManagementModal에서 사용하는 id가 포함된 전공 목록
export const GROUP_TYPE_ID = [
  { id: "WEB", label: "web" },
  { id: "APP", label: "app" },
  { id: "SERVER", label: "server" },
  { id: "GAME", label: "game" },
  { id: "SECURITY", label: "security" },
  { id: "WORK", label: "work" },
  { id: "OTHER", label: "other" },
] as const;

export type TODO_STATUS_TYPE = "waiting" | "in-progress" | "done";

export const TODO_STATUS: TODO_STATUS_TYPE[] = [
  "waiting",
  "in-progress",
  "done",
];
