export type MaterialType = "concept" | "tool" | "library" | "service";

export interface RecommendedMaterialResponse {
  id: string;
  title: string;
  type: MaterialType;
  category: string[];
}

export interface DocumentationSite {
  name: string;
  url: string;
  desc: string;
}

export interface GetAIRoadmapSuggestionsParams {
  userInterests: string[];
}
