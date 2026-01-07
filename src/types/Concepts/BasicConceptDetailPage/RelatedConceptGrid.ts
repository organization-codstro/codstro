interface RelatedConcept {
  id: string;
  name: string;
  type: string;
}

export interface RelatedConceptGridProps {
  relatedConcepts?: RelatedConcept[];
}
