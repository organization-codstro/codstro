interface RelatedConcept {
  id: string;
  name: string;
  type: string;
}

export interface GetConceptDetailParams {
  conceptId: string;
  userId: string;
}

export interface ToggleUnderstoodStatusParams {
  userId: string;
  conceptId: string;
  currentStatus: boolean;
}

export interface AskAIChatParams {
  conceptName: string;
  userQuestion: string;
}

export interface AddConceptTodoParams {
  userId: string;
  conceptId: string;
  type: string;
}

export interface ConceptDetailResponse {
  id: string;
  name: string;
  category: string;
  tags: string[];
  isUnderstood: boolean;
  description: string;
  content: string;
  relatedConcepts: RelatedConcept[];
}
