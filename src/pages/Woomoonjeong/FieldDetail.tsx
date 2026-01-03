import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  ExternalLink,
  Tag,
  FileText,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { woomoonjeongData } from "../../data/woomoonjeong/woomoonjeongData";
import { Field, Pin } from "../../types/Woomoonjeong/woomoonjeong";
import { fieldTypeColors } from "../../data/woomoonjeong/woomoonjeongData";
import AddFieldModal from "../../components/Woomoonjeong/AddFieldModal";
import { RecommendedField } from "../../types/Woomoonjeong/woomoonjeong";

const FieldDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  // TODO: API 연동 - 실제 Field 데이터 가져오기
  const field: Field | undefined = woomoonjeongData.find(
    (f) => f.id === Number(fieldId)
  );

  if (!field) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Field not found</h2>
          <button
            onClick={() => navigate("/woomoonjeong/documents/recommended")}
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg"
            style={{ backgroundColor: "#587CF0" }}
          >
            Back to Recommended Documents
          </button>
        </div>
      </div>
    );
  }

  // TODO: API 연동 - 실제 Pins 데이터 가져오기
  // 현재는 Field의 groups 안에 있는 모든 pins를 가져옴
  const allPins: Pin[] = field.groups.flatMap((group) => group.pins);

  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleAddField = (fieldType: string) => {
    // TODO: API 연동 - Field 추가
    console.log("Add field:", {
      fieldId: field.id,
      fieldType,
    });
    alert(`Field가 ${fieldType} 타입으로 추가되었습니다.`);
  };

  // RecommendedField 형식으로 변환
  const recommendedField: RecommendedField = {
    id: field.id,
    name: field.name,
    type: field.type,
    description: field.description,
    image: field.image,
    created_at: field.created_at,
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/woomoonjeong/documents/recommended")}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {field.name}
                </h1>
                <span
                  className={`inline-block px-3 py-1 text-sm border rounded-full ${
                    fieldTypeColors[
                      field.type as keyof typeof fieldTypeColors
                    ] || "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {field.type}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{field.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Field</span>
          </button>
        </div>
      </div>

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Documents List by Group */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Documents by Group
                </h2>
                <span className="text-sm text-gray-500">
                  {allPins.length} total documents
                </span>
              </div>

              <div className="space-y-4">
                {field.groups.map((group) => (
                  <div
                    key={group.id}
                    className="overflow-hidden border border-gray-200 rounded-lg"
                  >
                    {/* Group Header */}
                    <div className="flex items-center justify-between p-4 transition-colors bg-gray-50 hover:bg-gray-100">
                      <div
                        className="flex items-center flex-1 gap-3 cursor-pointer"
                        onClick={() => toggleGroup(group.id)}
                      >
                        {expandedGroups.has(group.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        <h3 className="font-medium text-gray-800">
                          {group.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {group.pins.length} documents
                        </span>
                      </div>
                    </div>

                    {/* Group Pins */}
                    {expandedGroups.has(group.id) && (
                      <div className="p-4 space-y-3 bg-white">
                        {group.pins.map((pin) => (
                          <a
                            key={pin.id}
                            href={pin.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 transition-shadow bg-white border border-gray-100 rounded-lg cursor-pointer hover:shadow-sm"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <h5 className="font-medium text-gray-800">
                                  {pin.title}
                                </h5>
                              </div>
                              {pin.description && (
                                <p className="mb-2 text-sm text-gray-600">
                                  {pin.description}
                                </p>
                              )}
                              {pin.tags && pin.tags.length > 0 && (
                                <div className="flex items-center gap-2">
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

                            <div className="flex items-center gap-1 ml-4">
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </a>
                        ))}

                        {group.pins.length === 0 && (
                          <div className="py-6 text-center text-gray-500">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">
                              No documents in this group
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {field.groups.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-800">
                      No groups found
                    </h3>
                    <p className="text-gray-600">
                      This field doesn't have any groups yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Field Stats */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Groups</span>
                  <span className="font-medium text-gray-900">
                    {field.groups.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents</span>
                  <span className="font-medium text-gray-900">
                    {allPins.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Groups List */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Groups
              </h3>
              <div className="space-y-2">
                {field.groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-3 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <h4 className="font-medium text-gray-800">{group.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {group.pins.length} documents
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        field={recommendedField}
        onAdd={handleAddField}
      />
    </div>
  );
};

export default FieldDetail;
