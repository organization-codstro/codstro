// 시스템 추천 → 그룹 선택 항때 나오는 모달
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { RecommendedField } from "../../types/Woomoonjeong/woomoonjeong";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: RecommendedField;
  onAdd: (fieldType: string) => void;
}

type FieldGroupType =
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

const fieldTypes: FieldGroupType[] = [
  "web",
  "app",
  "server",
  "game",
  "security",
  "work",
  "other",
];

const DEFAULT_GROUP_TYPE: FieldGroupType = "web";

const AssignRecommendedFieldModal: React.FC<AddFieldModalProps> = ({
  isOpen,
  onClose,
  field,
  onAdd,
}) => {
  const [selectedGroupType, setSelectedGroupType] =
    useState<FieldGroupType>(DEFAULT_GROUP_TYPE);

  // 모달 열릴 때마다 초기값 리셋
  useEffect(() => {
    if (isOpen) {
      setSelectedGroupType(DEFAULT_GROUP_TYPE);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(selectedGroupType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Field 추가</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors rounded hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Field Info */}
        <div className="p-4 mb-4 rounded-lg bg-gray-50">
          <h3 className="mb-1 font-medium text-gray-800">{field.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {field.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Group Type Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Group Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedGroupType(type)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedGroupType === type
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6de8]"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignRecommendedFieldModal;
