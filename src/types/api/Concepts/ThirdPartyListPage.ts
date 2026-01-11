export interface ThirdPartySummaryResponse {
  id: number;
  name: string;
  description: string;
  category: string[];
  tags: string[]; // DB의 category 배열을 UI용 tags로 매핑
  representative_image_url?: string;
}
