export type MATERIAL_TYPE =
  | "concept"
  | "tool"
  | "librarie"
  | "third_party_service"
  | "package_manager";

//ConceptSelector
export const PAGE_SIZE = 10;

export const FILTER_TYPES: (MATERIAL_TYPE | "all")[] = [
  "all",
  "concept",
  "tool",
  "librarie",
  "third_party_service",
  "package_manager",
];

