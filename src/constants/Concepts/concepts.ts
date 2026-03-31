export type MATERIAL_TYPE =
  | "concept"
  | "tool"
  | "library"
  | "thirdPartyService"
  | "packageManager";

//ConceptSelector
export const PAGE_SIZE = 10;

export const FILTER_TYPES: (MATERIAL_TYPE | "all")[] = [
  "all",
  "concept",
  "tool",
  "library",
  "thirdPartyService",
  "packageManager",
];

export const TYPE_MAP: Record<string, MATERIAL_TYPE> = {
  concept: "concept",
  tool: "tool",
  library: "library",
  third_party_service: "thirdPartyService",
  package_manager: "packageManager",
};

//노트 생성시에 선택할수 있는 라벨들
export const LABEL_OPTIONS = [
  { value: "personal", label: "개인" },
  { value: "study", label: "학습" },
  { value: "work", label: "업무" },
  { value: "project", label: "프로젝트" },
  { value: "reference", label: "참고자료" },

  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "database", label: "데이터베이스" },
  { value: "api", label: "API" },
  { value: "infra", label: "인프라" },

  { value: "debug", label: "디버깅" },
  { value: "optimization", label: "성능 최적화" },
  { value: "architecture", label: "아키텍처" },
  { value: "design", label: "설계" },

  { value: "meeting", label: "회의" },
  { value: "idea", label: "아이디어" },
  { value: "todo", label: "할 일" },
  { value: "troubleshooting", label: "문제 해결" },
];
