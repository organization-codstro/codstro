import React from "react";
import { RecommendedPin } from "../../types/Woomoonjeong/woomoonjeong";
import { RecommendedField } from "../../types/Woomoonjeong/woomoonjeong";
import DocumentCard from "./DocumentCard";
import FieldCard from "./FieldCard";

interface DocumentsGridProps {
  contentType: "documents" | "fields";
  documents: RecommendedPin[];
  fields: RecommendedField[];
  savedPins: Set<string>;
  savedFields: Set<number>;
  onToggleSavePin: (id: string) => void;
  onToggleSaveField: (id: number) => void;
}

const DocumentsGrid: React.FC<DocumentsGridProps> = ({
  contentType,
  documents,
  fields,
  savedPins,
  savedFields,
  onToggleSavePin,
  onToggleSaveField,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contentType === "documents"
        ? documents.map((pin) => (
            <DocumentCard
              key={pin.id}
              pin={pin}
              isSaved={savedPins.has(pin.id)}
              onToggleSave={() => onToggleSavePin(pin.id)}
            />
          ))
        : fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              isSaved={savedFields.has(field.id)}
              onToggleSave={() => onToggleSaveField(field.id)}
            />
          ))}
    </div>
  );
};

export default DocumentsGrid;
