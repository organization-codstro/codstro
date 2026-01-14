export type MaterialType = "concept" | "tool" | "library" | "service";

export interface RecommendedMaterialResponse {
  id: string;
  title: string;
  type: MaterialType;
  category: string;
  tags?: string[];
}

export interface DocumentationSite {
  name: string;
  url: string;
  desc: string;
}

export interface DocumentationCategoryResponse {
  category: string;
  sites: DocumentationSite[];
}

export interface GetAIRoadmapSuggestionsParams {
  userInterests: string[];
}
