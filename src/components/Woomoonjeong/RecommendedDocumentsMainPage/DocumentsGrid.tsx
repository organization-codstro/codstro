import React from "react";
import DocumentCard from "./DocumentCard";
import FieldCard from "./FieldCard";
import { DocumentsGridProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/DocumentsGrid";

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
              key={pin.pin_id}
              pin={pin}
              isSaved={savedPins.has(pin.pin_id)}
              onToggleSave={() => onToggleSavePin(pin.pin_id)}
              onAdd={onAddDocument ? () => onAddDocument(pin) : undefined}
            />
          ))
        : fields.map((field) => (
            <FieldCard
              key={field.field_id}
              field={field}
              isSaved={savedFields.has(field.field_id)}
              onToggleSave={() => onToggleSaveField(field.field_id)}
              onAdd={onAddField ? () => onAddField(field) : undefined}
            />
          ))}
    </div>
  );
};

export default DocumentsGrid;
