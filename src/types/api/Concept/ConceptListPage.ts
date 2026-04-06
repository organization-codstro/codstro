export interface LibrarySummaryResponse {
  id: string;
  name: string;
  description: string;
  category: string[];
  content: string;
  documentUrl: string;
  includedField: string;
}
export interface SearchlibrarysParams {
  keyword: string;
}

export interface FilterlibrarysParams {
  column: string;
  value: string;
}
