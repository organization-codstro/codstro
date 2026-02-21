export interface RecommendedMaterialResponse {
  id: string;
  title: string;
  type: string;
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
