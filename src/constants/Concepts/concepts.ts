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

export const typeMap: Record<string, MATERIAL_TYPE> = {
  concept: "concept",
  tool: "tool",
  library: "library",
  third_party_service: "thirdPartyService",
  package_manager: "packageManager",
};
