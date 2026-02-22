// 시스템이 추천하는 문서 추가 모달

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  DEFAULT_GROUP_TYPE,
  GROUP_TYPE,
  GROUP_TYPES,
} from "../../../constants/Woomoonjeong/woomoonjeong";
import { RecommendedCreateDocumentModalProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/RecommendedCreateDocumentModal";

const RecommendedCreateDocumentModal: React.FC<
  RecommendedCreateDocumentModalProps
> = ({ isOpen, onClose, pin, onAdd, groups }) => {
  const [documentName, setDocumentName] = useState(pin.pin_title);
  const [documentUrl, setDocumentUrl] = useState(pin.pin_url);
  const [description, setDescription] = useState(pin.pin_description);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>(pin.pin_label);
  const [selectedGroupType, setSelectedGroupType] =
    useState<GROUP_TYPE>(DEFAULT_GROUP_TYPE);
  const [fieldInfo, setFieldInfo] = useState("");
  const [fieldOptions, setFieldOptions] = useState<
    { field_id: string; field_name: string }[]
  >([]);

  // 폼 검증 에러 상태
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const selectedGroup = groups.find(
      (group) => group.group_name === selectedGroupType,
    );

    setFieldOptions(
      selectedGroup?.fields.map((f) => ({
        field_id: f.field_id,
        field_name: f.field_name,
      })) ?? [],
    );
  }, [selectedGroupType, groups]);

  const addCategory = () => {
    if (!categoryInput.trim()) return;
    if (categories.includes(categoryInput.trim())) return;
    setCategories((prev) => [...prev, categoryInput.trim()]);
    setCategoryInput("");
  };

  const removeCategory = (value: string) => {
    setCategories((prev) => prev.filter((c) => c !== value));
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    if (!documentName.trim()) newErrors.documentName = true;
    if (!documentUrl.trim()) newErrors.documentUrl = true;
    if (!fieldInfo) newErrors.fieldInfo = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAdd({
      documentName: documentName.trim(),
      documentUrl: documentUrl.trim(),
      documentDescription: description.trim(),
      documentCategory: categories.join(", "),
      groupName: selectedGroupType,
      fieldId: fieldInfo,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">문서 추가</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 문서 이름 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              문서 이름 <span className="text-red-500">*</span>
            </label>
            <input
              value={documentName}
              onChange={(e) => {
                setDocumentName(e.target.value);
                if (errors.documentName)
                  setErrors((prev) => ({ ...prev, documentName: false }));
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.documentName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#587CF0]"
              }`}
            />
            {errors.documentName && (
              <p className="mt-1 text-xs text-red-500">
                문서 이름을 입력해주세요.
              </p>
            )}
          </div>

          {/* 문서 URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              문서 URL <span className="text-red-500">*</span>
            </label>
            <input
              value={documentUrl}
              onChange={(e) => {
                setDocumentUrl(e.target.value);
                if (errors.documentUrl)
                  setErrors((prev) => ({ ...prev, documentUrl: false }));
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.documentUrl
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#587CF0]"
              }`}
              placeholder="https://..."
            />
            {errors.documentUrl && (
              <p className="mt-1 text-xs text-red-500">
                문서 URL을 입력해주세요.
              </p>
            )}
          </div>

          {/* 문서 설명 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              문서 설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none"
            />
          </div>

          {/* 문서 카테고리 (칩 UI) */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              문서 카테고리
            </label>
            <div className="flex gap-2">
              <input
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
                placeholder="키워드 입력 후 엔터"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-3 py-2 text-sm text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6cd8] transition-colors"
              >
                추가
              </button>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeCategory(c)}
                      className="ml-1 font-bold text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 그룹 선택 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              그룹
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GROUP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedGroupType(type)}
                  className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all ${
                    selectedGroupType === type
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 분야 정보 (fieldOptions 기반으로 선택) */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              분야 정보 <span className="text-red-500">*</span>
            </label>
            <select
              value={fieldInfo}
              onChange={(e) => {
                setFieldInfo(e.target.value);
                if (errors.fieldInfo)
                  setErrors((prev) => ({ ...prev, fieldInfo: false }));
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.fieldInfo
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#587CF0]"
              }`}
            >
              <option value="">분야를 선택하세요</option>
              {fieldOptions.map((field) => (
                <option key={field.field_id} value={field.field_id}>
                  {field.field_name}
                </option>
              ))}
            </select>
            {errors.fieldInfo && (
              <p className="mt-1 text-xs text-red-500">
                해당 그룹의 분야를 선택해주세요.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-bold text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6cd8] shadow-md transition-all active:scale-95"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecommendedCreateDocumentModal;
