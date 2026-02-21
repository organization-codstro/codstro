export type CLONE_CODING_STATE_TYPE = "waiting" | "in progress" | "done";
export type PROJECT_DIFFICULTY = "beginner" | "intermediate" | "advanced";

//클론코딩 난이도
export type CLONE_CODINGS_DIFFICULTY_TYPE =
  | "beginner"
  | "intermediate"
  | "advanced";

export const CLONE_CODINGS_DIFFICULTIES: CLONE_CODINGS_DIFFICULTY_TYPE[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export const DIFFICULTY_COLORS = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  advanced: "bg-red-100 text-red-700 border-red-200",
  all: "bg-gray-100 text-gray-700 border-gray-200",
};

export const STATUS_COLORS = {
  waiting: "bg-gray-100 text-gray-700 border-gray-200",
  "in progress": "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-green-100 text-green-700 border-green-200",
};
