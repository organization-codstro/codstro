export interface GetToolDetailParams {
  toolId: string;
  userId: string;
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
