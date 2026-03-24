export type PROJECT_STATUS_TYPE = "waiting" | "in progress" | "done";
export type PROJECT_ROOM_TYPE = "Feature" | "Free";

export const PROJECT_STATUS: PROJECT_STATUS_TYPE[] = [
  "waiting",
  "in progress",
  "done",
];

//프로젝트 진행 단계
export type PROJECT_PLANNING_STAGE = "chat" | "info";

export type PROJECT_CHAT_SENDER = "AI" | "USER";
