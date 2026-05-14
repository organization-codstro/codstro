import {
  BookOpen,
  Puzzle,
  PlayCircle,
  FileText,
  Trophy,
  Lightbulb,
  FolderOpen,
} from "lucide-react";

export type STUDY_PLAN_STATE_TYPE = "waiting" | "in progress" | "done";

// 생성모달에 사용되는 데이터
export const LEARNING_STYLES = [
  { value: "이론 → 실습", icon: BookOpen, desc: "개념 먼저, 실습 나중" },
  { value: "프로젝트 중심", icon: FolderOpen, desc: "만들면서 배우기" },
  { value: "문제풀이 중심", icon: Puzzle, desc: "문제를 풀며 학습" },
  { value: "강의 기반", icon: PlayCircle, desc: "영상/강의 위주" },
  { value: "문서 기반", icon: FileText, desc: "공식 문서 위주" },
];

export const EXPECTED_OUTPUTS = [
  { value: "프로젝트", icon: FolderOpen },
  { value: "지식", icon: Lightbulb },
  { value: "포트폴리오", icon: Trophy },
  { value: "자격증/시험", icon: BookOpen },
];

//StudyPlanMainPage에서 사용하는 상태마다 표시되는 색 데이터
export const STATE_COLORS = {
  waiting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "in progress": "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-green-100 text-green-700 border-green-200",
};
