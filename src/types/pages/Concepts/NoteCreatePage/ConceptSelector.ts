import { Concept } from "../../../common/concepts";

export interface ConceptSelectorProps {
  availableConcepts: Concept[];
  selectedConcepts: string[];
  onToggle: (name: string) => void;
  onHide: () => void;
  onGenerateAI: () => void;
  isGenerating?: boolean;
}
