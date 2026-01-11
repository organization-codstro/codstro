interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "service";
}

export interface LibraryDetailResponse {
  id: number;
  name: string;
  language: string;
  category: string[];
  tags: string[]; // category 배열을 tags로 활용
  officialSite: string | null;
  description: string;
  content: string;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}
