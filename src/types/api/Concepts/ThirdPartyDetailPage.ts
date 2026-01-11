export interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "service";
}

export interface ThirdPartyDetailResponse {
  id: number;
  name: string;
  category: string[];
  tags: string[]; // category 배열을 tags로 매핑
  officialSite: string | null;
  description: string;
  content: string;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}
