export interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "service";
}

export interface ThirdPartyDetailResponse {
  id: number;
  name: string;
  category: string[];
  tags: string[];
  officialSite: string | null;
  description: string;
  content: string;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}

export interface GetServiceDetailParams {
  serviceId: string;
  userId: number;
}

export interface ToggleServiceUnderstoodParams {
  userId: number;
  serviceId: string;
  currentStatus: boolean;
}

export interface AskServiceAIParams {
  serviceName: string;
  question: string;
}

export interface AddServiceTodoParams {
  userId: number;
  serviceName: string;
  type: string;
}
