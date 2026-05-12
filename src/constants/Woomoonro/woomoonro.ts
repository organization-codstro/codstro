import { Puzzle, Code, Layout, GitBranch, Box } from "lucide-react";

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

//클론코딩 추가 모달에서 사용하는 난이도 설정 데이터
export const DIFFICULTY_LEVELS = [
  { level: 1, label: "컴포넌트", description: "작은 UI", icon: Puzzle },
  { level: 2, label: "기능 클론", description: "로직 중심", icon: Code },
  { level: 3, label: "페이지 클론", description: "단일 페이지", icon: Layout },
  {
    level: 4,
    label: "플로우 클론",
    description: "여러 페이지",
    icon: GitBranch,
  },
  { level: 5, label: "프로젝트 클론", description: "전체 프로젝트", icon: Box },
];
