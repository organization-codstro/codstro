interface RelatedConcept {
  id: string;
  name: string;
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
