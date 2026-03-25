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

//components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection.tsx 에서 사용하는 프로젝트 상태 배열값
export const PROJECT_STATUS_TYPE_ARRAY: PROJECT_STATUS_TYPE[] = [
  "waiting",
  "in progress",
  "done",
];

//components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection.tsx 에서 사용하는 프로젝트 기본 스타일 설정
// 현재 상태를 기준으로 다음 상태를 순환(cycle)시키는 함수
// 예: waiting → in progress → done → waiting
// PROJECT_STATUS_TYPE_ARRAY 순서를 기준으로 동작함
export const GET_NEXT_STATUS = (
  current: PROJECT_STATUS_TYPE,
): PROJECT_STATUS_TYPE => {
  const idx = PROJECT_STATUS_TYPE_ARRAY.indexOf(current);
  return PROJECT_STATUS_TYPE_ARRAY[
    (idx + 1) % PROJECT_STATUS_TYPE_ARRAY.length
  ];
};

// 각 상태값에 대응되는 Tailwind CSS 스타일 정의
// UI에서 상태 버튼(또는 라벨)의 색상/호버 스타일에 사용됨
export const STATUS_STYLE: Record<PROJECT_STATUS_TYPE, string> = {
  waiting: "bg-gray-100 text-gray-700 hover:bg-gray-200", // 대기 상태 (회색)
  "in progress": "bg-blue-100 text-blue-700 hover:bg-blue-200", // 진행 중 (파란색)
  done: "bg-green-100 text-green-700 hover:bg-green-200", // 완료 (초록색)
};

// 상태값을 사용자에게 보여줄 문자열(label)로 매핑
// 내부 enum 값 → UI 표시용 텍스트 변환 용도
export const STATUS_LABEL: Record<PROJECT_STATUS_TYPE, string> = {
  waiting: "waiting",
  "in progress": "in progress",
  done: "done",
};
