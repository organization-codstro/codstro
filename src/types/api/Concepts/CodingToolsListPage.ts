export interface ToolSummaryResponse {
  id: string;
  name: string;
  description: string;
  category: string[];
  tags: string[]; // DB의 category 배열을 tags로 매핑
  representative_image_url?: string;
}

export interface SearchToolsParams {
  keyword: string;
}

export interface FilterToolsByCategoryParams {
  categoryName: string;
}

export interface GetAIToolSuggestionsParams {
  keyword: string;
}
