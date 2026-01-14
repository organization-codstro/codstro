export interface GetToolDetailParams {
  toolId: string;
  userId: number;
}

interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "package_manager" | "third_party";
}

export interface ToolDetailResponse {
  id: string;
  name: string;
  category: string[];
  tags: string[]; // category 데이터를 tags로 활용
  description: string;
  content: string;
  officialSite: string | null;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}

export interface ToggleToolUnderstoodParams {
  userId: string;
  toolId: string;
  currentStatus: boolean;
}

export interface GetToolAIAdviceParams {
  toolName: string;
  prompt: string;
}

export interface AddToolTodoParams {
  userId: string;
  toolName: string;
  type: string;
}
