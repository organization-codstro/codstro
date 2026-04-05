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
export interface SearchlibrarysParams {
  keyword: string;
}

export interface FilterlibrarysParams {
  column: string;
  value: string;
}
