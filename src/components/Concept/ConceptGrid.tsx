import { ConceptGridProps } from "../../types/pages/Concept/ConceptGrid";

export default function ConceptGrid({ children }: ConceptGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
