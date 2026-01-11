export interface ConceptSummaryResponse {
  id: number;
  name: string;
  description: string;
  category: string[];
  tags: string[]; // DB의 category 필드를 tags로 활용하거나 content에서 추출
  representative_image_url?: string;
}
