import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Pin, Field, Group } from "../../../types/Woomoonjeong/woomoonjeong";
import { woomoonjeongData } from "../../../data/woomoonjeong/woomoonjeongData";

export interface AddDocumentPayload {
  groupType: string;
  fieldName: string;
  documentName: string;
  documentUrl: string;
  documentCategory: string;
  documentNameDescription: string;
}

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: Pin; // 수정 대상 핀
  onAdd: (payload: AddDocumentPayload) => void;
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

const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  isOpen,
  onClose,
  pin,
  onAdd,
}) => {
  const [documentName, setDocumentName] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [description, setDescription] = useState("");

  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedGroupType, setSelectedGroupType] =
    useState<FieldGroupType>(DEFAULT_GROUP_TYPE);

  const [fieldInfo, setFieldInfo] = useState("");
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);

  // pin.id 기준으로 그룹과 필드 찾기
  const findPinDetails = (pinId: number) => {
    for (const group of woomoonjeongData) {
      for (const field of group.fields) {
        const foundPin = field.pins.find((p) => p.id === pinId);
        if (foundPin) {
          return {
            groupType: group.name as FieldGroupType,
            fieldName: field.name,
            fieldOptions: group.fields.map((f) => f.name),
            pin: foundPin,
          };
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (isOpen && pin) {
      const result = findPinDetails(pin.id);
      if (result) {
        setDocumentName(result.pin.title);
        setDocumentUrl(result.pin.url);
        setDescription(result.pin.description);
        setCategories(result.pin.tags ?? []);
        setSelectedGroupType(result.groupType ?? DEFAULT_GROUP_TYPE);
        setFieldInfo(result.fieldName ?? "");
        setFieldOptions(result.fieldOptions ?? []);
        setCategoryInput("");
      }
    }
  }, [isOpen, pin]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName.trim()) return;

    onAdd({
      documentName: documentName.trim(),
      documentUrl: documentUrl.trim(),
      documentNameDescription: description.trim(),
      documentCategory: categories.join(", "),
      groupType: selectedGroupType,
      fieldName: fieldInfo,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">문서 수정</h2>
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
              문서 이름
            </label>
            <input
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg"
              required
            />
          </div>

          {/* 문서 URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              문서 URL
            </label>
            <input
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg"
              placeholder="https://..."
            />
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
              className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
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
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-3 py-2 text-sm text-white bg-[#587CF0] rounded-lg"
              >
                추가
              </button>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeCategory(c)}
                      className="text-gray-400 hover:text-gray-600"
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
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedGroupType(type)}
                  className={`px-3 py-2 text-sm rounded-lg border ${
                    selectedGroupType === type
                      ? "bg-[#587CF0] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 분야 정보 (fieldOptions 기반으로 선택) */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              분야 정보
            </label>
            <select
              value={fieldInfo}
              onChange={(e) => setFieldInfo(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg"
            >
              <option value="">선택하세요</option>
              {fieldOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-[#587CF0] rounded-lg"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocumentModal;
