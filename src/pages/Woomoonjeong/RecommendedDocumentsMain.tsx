import React, { useState } from "react";
import {
  Star,
  BookOpen,
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import {
  extendedRecommendedPins,
  woomoonjeongData,
} from "../../data/woomoonjeong/woomoonjeongData";
import { RecommendedField } from "../../types/Woomoonjeong/woomoonjeong";
import SearchInput from "../../components/Woomoonjeong/SearchInput";
import ContentTypeFilter from "../../components/Woomoonjeong/ContentTypeFilter";
import FilterSection from "../../components/Woomoonjeong/FilterSection";
import FieldTypeFilter from "../../components/Woomoonjeong/FieldTypeFilter";
import DocumentsGrid from "../../components/Woomoonjeong/DocumentsGrid";

const RecommendedDocumentsMain: React.FC = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<
    "all" | "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >("all");
  const [contentType, setContentType] = useState<"documents" | "fields">(
    "documents"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPins, setSavedPins] = useState<Set<string>>(new Set());
  const [savedFields, setSavedFields] = useState<Set<number>>(new Set());

  // Convert existing fields to recommended fields format
  const recommendedFields: RecommendedField[] = woomoonjeongData.map(
    (field) => ({
      id: field.id,
      name: field.name,
      type: field.type,
      description: field.description,
      image: field.image,
      created_at: field.created_at,
    })
  );

  const filteredPins = extendedRecommendedPins.filter((pin) => {
    // Filter by field type
    if (selectedFieldType !== "all" && pin.field_type !== selectedFieldType)
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !pin.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    return true;
  });

  const filteredFields = recommendedFields.filter((field) => {
    // Filter by field type
    if (selectedFieldType !== "all" && field.type !== selectedFieldType)
      return false;

    // Filter by search query
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

  const toggleSavePin = (pinId: string) => {
    const newSavedPins = new Set(savedPins);
    if (newSavedPins.has(pinId)) {
      newSavedPins.delete(pinId);
    } else {
      newSavedPins.add(pinId);
    }
    setSavedPins(newSavedPins);

    // In real app, this would make an API call to save/unsave the pin
    console.log(
      "Toggle save pin:",
      pinId,
      newSavedPins.has(pinId) ? "saved" : "unsaved"
    );
  };

  
  const toggleSaveField = (fieldId: number) => {
    const newSavedFields = new Set(savedFields);
    if (newSavedFields.has(fieldId)) {
      newSavedFields.delete(fieldId);
    } else {
      newSavedFields.add(fieldId);
    }
    setSavedFields(newSavedFields);

    // In real app, this would make an API call to save/unsave the field
    console.log(
      "Toggle save field:",
      fieldId,
      newSavedFields.has(fieldId) ? "saved" : "unsaved"
    );
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Documents
            </h1>
            <p className="text-gray-600">
              Discover curated learning resources and fields, save them to your
              collection
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search documents..."
            />
          </div>
        </div>

        {/* Filters */}
        <FilterSection>
          <ContentTypeFilter
            contentType={contentType}
            onChange={setContentType}
          />
          <FieldTypeFilter
            selectedFieldType={selectedFieldType}
            onChange={setSelectedFieldType}
          />
        </FilterSection>

        {/* Documents Grid */}
        <DocumentsGrid
          contentType={contentType}
          documents={filteredPins}
          fields={filteredFields}
          savedPins={savedPins}
          savedFields={savedFields}
          onToggleSavePin={toggleSavePin}
          onToggleSaveField={toggleSaveField}
        />

        {currentFilteredData.length === 0 && (
          <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              No {contentType} found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedDocumentsMain;
