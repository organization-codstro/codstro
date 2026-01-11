interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "package_manager" | "third_party";
}

export interface ToolDetailResponse {
  id: number;
  name: string;
  category: string[];
  tags: string[]; // category 데이터를 tags로 활용
  description: string;
  content: string;
  officialSite: string | null;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}
