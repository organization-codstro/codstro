export interface ThirdPartySummaryResponse {
  id: number;
  name: string;
  description: string;
  category: string[];
  tags: string[]; // DB의 category 배열을 UI용 tags로 매핑
  representative_image_url?: string;
}

export interface SearchServicesParams {
  keyword: string;
}

export interface FilterServicesByCategoryParams {
  categoryName: string;
}

export interface GetAIServiceStackAdviceParams {
  projectBrief: string;
}
