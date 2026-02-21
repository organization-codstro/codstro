import { RelatedConcept } from "../../common/concepts";

export interface GetToolDetailParams {
  toolId: string;
  userId: string;
}

export interface ToolDetailResponse {
  id: string;
  name: string;
  category: string[];
  description: string;
  content: string;
  officialSite: string | null;
  isUnderstood: boolean;
  relatedConcepts: RelatedConcept[];
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
