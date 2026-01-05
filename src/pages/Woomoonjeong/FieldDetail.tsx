import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, ExternalLink, Tag, FileText } from "lucide-react";
import {
  woomoonjeongData,
  fieldTypeColors,
} from "../../data/woomoonjeong/woomoonjeongData";
import {
  Field,
  Pin,
  RecommendedField,
} from "../../types/Woomoonjeong/woomoonjeong";
import AssignRecommendedFieldModal from "../../components/Woomoonjeong/DocumentsManagement/RecommendedCreateFieldModal";

const FieldDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const result = woomoonjeongData
    .map((group) => {
      const field = group.fields.find((f) => f.id === Number(fieldId));
      return field ? { group, field } : null;
    })
    .find(Boolean);

  const group = result?.group;
  const field = result?.field;

  if (!group || !field) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Field not found</h2>
          <button
            onClick={() => navigate("/woomoonjeong/documents/recommended")}
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg bg-[#587CF0]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const allPins: Pin[] = field.pins;

  const recommendedField: RecommendedField = {
    id: field.id,
    name: field.name,
    description: field.description,
    created_at: field.created_at,
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/woomoonjeong/documents/recommended")}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {field.name}
                </h1>
                <span
                  className={`inline-block px-3 py-1 text-sm border rounded-full ${
                    fieldTypeColors[group.name]
                  }`}
                >
                  {group.name}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{field.description}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 gap-2 font-medium text-white rounded-lg bg-[#587CF0]"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 mx-auto max-w-7xl">
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
            <span className="text-sm text-gray-500">
              {allPins.length} total documents
            </span>
          </div>

          <div className="space-y-3">
            {allPins.map((pin) => (
              <a
                key={pin.id}
                href={pin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <h5 className="font-medium text-gray-800">{pin.title}</h5>
                  </div>
                  {pin.description && (
                    <p className="mb-2 text-sm text-gray-600">
                      {pin.description}
                    </p>
                  )}
                  {pin.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {pin.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                        >
                          <Tag className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ExternalLink className="w-3 h-3 ml-4 text-gray-400" />
              </a>
            ))}

            {allPins.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No documents in this field</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AssignRecommendedFieldModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        field={recommendedField}
        onAdd={() => {}}
      />
    </div>
  );
};

export default FieldDetail;
