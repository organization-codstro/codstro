export interface ToolSummaryResponse {
  id: string;
  name: string;
  description: string;
  category: string[];
  tags: string[]; 
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
