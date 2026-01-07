// 메인 화면에서 추가하는 문서 생성 모달

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Group, GroupType } from "../../../../types/Woomoonjeong/woomoonjeong";
import { woomoonjeongData } from "../../../../data/woomoonjeong/woomoonjeongData";
import { DEFAULT_GROUP_TYPE } from "../../../../constants/Woomoonjeong/DocumentsManagementPage/CreateCustomFieldModal";
import { GroupTypes } from "../../../../constants/Woomoonjeong/Woomoonjeong";
import { CreateDocumentModalProps } from "../../../../types/Woomoonjeong/DocumentsManagementPage/Modal/CreateDocumentModal";

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [documentName, setDocumentName] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedGroupType, setSelectedGroupType] =
    useState<GroupType>(DEFAULT_GROUP_TYPE);
  const [fieldInfo, setFieldInfo] = useState("");
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);

  // 폼 검증 에러 상태
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // 선택된 그룹의 필드 옵션
  useEffect(() => {
    const selectedGroup: Group | undefined = woomoonjeongData.find(
      (group) => group.name === selectedGroupType
    );
    const options = selectedGroup?.fields.map((f) => f.name) ?? [];
    setFieldOptions(options);

    // 그룹이 바뀌면 분야 정보 초기화 및 에러 초기화
    setFieldInfo("");
    setErrors((prev) => ({ ...prev, fieldInfo: false }));
  }, [selectedGroupType]);

  /** ✅ 칩 추가 */
  const addCategory = () => {
    if (!categoryInput.trim()) return;
    if (categories.includes(categoryInput.trim())) return;
    setCategories((prev) => [...prev, categoryInput.trim()]);
    setCategoryInput("");
  };

  /** ✅ 칩 제거 */
  const removeCategory = (value: string) => {
    setCategories((prev) => prev.filter((c) => c !== value));
  };

  /** ✅ 폼 유효성 검사 (붉은 보더와 문구로만 강조) */
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
      fieldName: fieldInfo,
    });

    // 성공 시 초기화 후 닫기
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDocumentName("");
    setDocumentUrl("");
    setDescription("");
    setCategories([]);
    setCategoryInput("");
    setFieldInfo("");
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 duration-200 bg-white shadow-lg rounded-xl animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">문서 추가</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
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
              placeholder="문서의 제목을 입력하세요"
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
              placeholder="https://example.com"
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
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none transition-all"
              placeholder="문서에 대한 간단한 설명을 적어주세요"
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
                className="px-4 py-2 text-sm font-medium text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6cd8] transition-colors"
              >
                추가
              </button>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-50 text-[#587CF0] rounded-md border border-blue-100"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeCategory(c)}
                      className="ml-1 text-[#587CF0] hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 그룹 선택 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              그룹 선택
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GroupTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedGroupType(type)}
                  className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all ${
                    selectedGroupType === type
                      ? "bg-[#587CF0] text-white border-[#587CF0] shadow-sm"
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
              분야 세부 정보 <span className="text-red-500">*</span>
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
              <option value="">
                {selectedGroupType.toUpperCase()} 분야를 선택하세요
              </option>
              {fieldOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
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
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-bold text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6cd8] shadow-md transition-all active:scale-95"
            >
              문서 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocumentModal;
