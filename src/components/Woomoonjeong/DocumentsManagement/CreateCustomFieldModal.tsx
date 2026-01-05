// 사용자 직접 생성하는 필드
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: {
    name: string;
    description: string;
    type: FieldGroupType;
  }) => void;
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

const CreateCustomFieldModal: React.FC<AddFieldModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroupType, setSelectedGroupType] =
    useState<FieldGroupType>(DEFAULT_GROUP_TYPE);

  // 모달 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setSelectedGroupType(DEFAULT_GROUP_TYPE);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      description: description.trim(),
      type: selectedGroupType,
    });

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Field 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: React Ecosystem"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
              required
            />
          </div>

          {/* Field Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="이 Field에 대한 간단한 설명을 입력하세요"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
            />
          </div>

          {/* Group Type Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
             그룹
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

export default CreateCustomFieldModal;
