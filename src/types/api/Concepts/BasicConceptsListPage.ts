export interface SearchConceptsParams {
  keyword: string;
}

export interface FilterByCategoryParams {
  category: string;
}

export interface GetRecommendedKeywordsParams {
  userInterests: string[];
}

export interface ConceptSummaryResponse {
  id: string;
  name: string;
  description: string;
  category: string[];
  representative_image_url?: string;
}
