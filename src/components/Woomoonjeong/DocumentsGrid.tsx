import React from "react";
import {
  RecommendedPin,
  RecommendedField,
} from "../../types/Woomoonjeong/woomoonjeong";
import DocumentCard from "./DocumentCard";
import FieldCard from "./FieldCard";

interface DocumentsGridProps {
  contentType: "documents" | "fields";
  documents: RecommendedPin[];
  fields: RecommendedField[];
  savedPins: Set<number>;
  savedFields: Set<number>;
  onToggleSavePin: (id: number) => void;
  onToggleSaveField: (id: number) => void;
  onAddDocument?: (pin: RecommendedPin) => void;
  onAddField?: (field: RecommendedField) => void;
}

const DocumentsGrid: React.FC<DocumentsGridProps> = ({
  contentType,
  documents,
  fields,
  savedPins,
  savedFields,
  onToggleSavePin,
  onToggleSaveField,
  onAddDocument,
  onAddField,
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
              onAdd={onAddDocument ? () => onAddDocument(pin) : undefined}
            />
          ))
        : fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              isSaved={savedFields.has(field.id)}
              onToggleSave={() => onToggleSaveField(field.id)}
              onAdd={onAddField ? () => onAddField(field) : undefined}
            />
          ))}
    </div>
  );
};

export default DocumentsGrid;
