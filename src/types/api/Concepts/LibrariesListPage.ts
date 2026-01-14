export interface LibrarySummaryResponse {
  id: string;
  name: string;
  language: string;
  description: string;
  category: string[];
  tags: string[]; // DB의 category 배열을 UI용 tags로 매핑
  representative_image_url?: string;
}
export interface SearchLibrariesParams {
  keyword: string;
}

export interface FilterLibrariesParams {
  column: "language" | "category";
  value: string;
}

export interface GetAILibraryStackRecommendationParams {
  projectType: string;
}
