import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import {
  extendedRecommendedPins,
  woomoonjeongData,
} from "../../data/woomoonjeong/woomoonjeongData";
import SearchInput from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/SearchInput";
import ContentTypeFilter from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/ContentTypeFilter";
import FilterSection from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/FilterSection";
import DocumentsGrid from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/DocumentsGrid";
//시스템이 추천하는 필드 추가하는 모달
import AssignRecommendedFieldModal from "../../components/Woomoonjeong/RecommendedCreateFieldModal";
import RecommendedCreateDocumentModal from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/RecommendedCreateDocumentModal";
import { GroupType, RecommendedField, RecommendedPin } from "../../types/pages/Woomoonjeong/woomoonjeong";

const RecommendedDocumentsMain: React.FC = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<
    "all" | "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >("all");
  const [contentType, setContentType] = useState<"documents" | "fields">(
    "documents"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPins, setSavedPins] = useState<Set<number>>(new Set());
  const [savedFields, setSavedFields] = useState<Set<number>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState<RecommendedPin | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<RecommendedField | null>(
    null
  );

  const recommendedFields: RecommendedField[] = woomoonjeongData.flatMap(
    (group) =>
      group.fields.map((field) => ({
        id: field.id,
        name: field.name,
        description: field.description,
        created_at: field.created_at,
      }))
  );

  const filteredPins = extendedRecommendedPins.filter((pin) => {
    if (
      searchQuery &&
      !pin.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  const filteredFields = recommendedFields.filter((field) => {
    if (
      searchQuery &&
      !field.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !field.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  const currentFilteredData =
    contentType === "documents" ? filteredPins : filteredFields;

  const toggleSavePin = (pinId: number) => {
    const next = new Set(savedPins);
    next.has(pinId) ? next.delete(pinId) : next.add(pinId);
    setSavedPins(next);
  };

  const toggleSaveField = (fieldId: number) => {
    const next = new Set(savedFields);
    next.has(fieldId) ? next.delete(fieldId) : next.add(fieldId);
    setSavedFields(next);
  };

  const handleAddDocument = (pin: RecommendedPin) => {
    setSelectedPin(pin);
    setIsAddModalOpen(true);
  };

  const handleAddDocumentSubmit = (payload: {
    groupName: GroupType;
    fieldName: string;
    documentName: string;
    documentUrl: string;
    documentDescription: string;
    documentCategory: string;
  }) => {
    console.log(payload);
  };

  const handleAddField = (field: RecommendedField) => {
    setSelectedField(field);
    setIsAddFieldModalOpen(true);
  };

  const handleAddFieldSubmit = (fieldType: string) => {
    console.log({ selectedField, fieldType });
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Documents
            </h1>
            <p className="text-gray-600">
              Discover curated learning resources and fields
            </p>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search documents..."
          />
        </div>

        <FilterSection>
          <ContentTypeFilter
            contentType={contentType}
            onChange={setContentType}
          />
        </FilterSection>

        <DocumentsGrid
          key={contentType}
          contentType={contentType}
          documents={filteredPins}
          fields={filteredFields}
          savedPins={savedPins}
          savedFields={savedFields}
          onToggleSavePin={toggleSavePin}
          onToggleSaveField={toggleSaveField}
          onAddDocument={handleAddDocument}
          onAddField={handleAddField}
        />

        {currentFilteredData.length === 0 && (
          <div className="p-12 text-center bg-white border border-purple-100 rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-800">
              No {contentType} found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {selectedPin && (
        <RecommendedCreateDocumentModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedPin(null);
          }}
          pin={selectedPin}
          onAdd={handleAddDocumentSubmit}
        />
      )}

      {selectedField && (
        <AssignRecommendedFieldModal
          isOpen={isAddFieldModalOpen}
          onClose={() => {
            setIsAddFieldModalOpen(false);
            setSelectedField(null);
          }}
          field={selectedField}
          onAdd={handleAddFieldSubmit}
        />
      )}
    </div>
  );
};

export default RecommendedDocumentsMain;
