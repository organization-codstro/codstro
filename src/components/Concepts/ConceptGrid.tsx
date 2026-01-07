import { ReactNode } from "react";

interface ConceptGridProps {
  children: ReactNode;
}

export default function ConceptGrid({ children }: ConceptGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
