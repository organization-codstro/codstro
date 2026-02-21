export interface LibrarySummaryResponse {
  id: string;
  name: string;
  description: string;
  category: string[];
  content: string;
  documentUrl: string;
  includedLanguage: string;
  representativeImageUrl?: string;
}
export interface SearchLibrariesParams {
  keyword: string;
}

export interface FilterLibrariesParams {
  column: string,
  value: string;
}

export interface GetAILibraryStackRecommendationParams {
  projectType: string;
}
