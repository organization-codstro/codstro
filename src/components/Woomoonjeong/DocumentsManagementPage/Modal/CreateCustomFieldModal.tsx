// 사용자 직접 생성하는 필드
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CreateCustomFieldModalProps } from "../../../../types/pages/Woomoonjeong/DocumentsManagementPage/Modal/CreateCustomFieldModal";
import {
  DEFAULT_GROUP_NAME,
  GROUP_NAME,
  GROUP_NAME_TYPE,
} from "../../../../constants/Woomoonjeong/Woomoonjeong";

export const CreateCustomFieldModal: React.FC<CreateCustomFieldModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  groupMap,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroupType, setSelectedGroupType] =
    useState<GROUP_NAME_TYPE>(DEFAULT_GROUP_NAME);

  // 폼 검증 에러 상태
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // 모달 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setSelectedGroupType(DEFAULT_GROUP_NAME);
      setErrors({});
    }
  }, [isOpen]);

  /** 폼 유효성 검사 */
  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    if (!name.trim()) {
      newErrors.name = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAdd({
      field_name: name.trim(),
      field_description: description.trim(),
      group_id: groupMap[selectedGroupType],
      field_is_recommendation: false,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 duration-200 bg-white shadow-lg rounded-xl animate-in fade-in zoom-in">
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
              Field 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name)
                  setErrors((prev) => ({ ...prev, name: false }));
              }}
              placeholder="예: React Ecosystem"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                Field 이름을 입력해주세요.
              </p>
            )}
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none transition-all"
            />
          </div>

          {/* Group Type Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              그룹
            </label>
            <div className="grid grid-cols-2 gap-2">
              {GROUP_NAME.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedGroupType(type)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                    selectedGroupType === type
                      ? "bg-[#587CF0] text-white border-[#587CF0] shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-bold text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6de8] shadow-md transition-all active:scale-95"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
