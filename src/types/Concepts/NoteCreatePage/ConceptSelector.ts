interface Concept {
  id: string;
  name: string;
  type: string;
}

export interface ConceptSelectorProps {
  availableConcepts: Concept[];
  selectedConcepts: string[];
  onToggle: (name: string) => void;
  onHide: () => void;
  onGenerateAI: () => void;
}
