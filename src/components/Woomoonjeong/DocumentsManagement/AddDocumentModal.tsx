import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  RecommendedPin,
  Group,
  Field,
} from "../../../types/Woomoonjeong/woomoonjeong";
import { woomoonjeongData } from "../../../data/woomoonjeong/woomoonjeongData";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: RecommendedPin;
  onAdd: (params: {
    groupName: Group["name"];
    fieldId?: number | null;
    newFieldName?: string;
    documentId: number;
  }) => void;
}

const GROUP_NAMES: Group["name"][] = [
  "web",
  "app",
  "server",
  "game",
  "security",
  "work",
  "other",
];

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  pin,
  onAdd,
}) => {
  const [selectedGroupName, setSelectedGroupName] =
    useState<Group["name"]>("web");

  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [isNewField, setIsNewField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");

  /** 선택된 그룹 */
  const selectedGroup: Group | undefined = woomoonjeongData.find(
    (group) => group.name === selectedGroupName
  );

  /** 선택된 그룹의 필드 목록 */
  const availableFields: Field[] = selectedGroup?.fields ?? [];

  useEffect(() => {
    if (isOpen) {
      setSelectedGroupName("web");
      setSelectedFieldId(null);
      setIsNewField(false);
      setNewFieldName("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewField) {
      if (!newFieldName.trim()) {
        alert("새 분야 이름을 입력해주세요.");
        return;
      }

      onAdd({
        groupName: selectedGroupName,
        newFieldName: newFieldName.trim(),
        documentId: pin.id,
      });
    } else {
      if (!selectedFieldId) {
        alert("분야를 선택해주세요.");
        return;
      }

      onAdd({
        groupName: selectedGroupName,
        fieldId: selectedFieldId,
        documentId: pin.id,
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">문서 추가</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Document Preview */}
        <div className="p-4 mb-4 rounded-lg bg-gray-50">
          <h3 className="font-medium">{pin.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {pin.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Group */}
          <div>
            <label className="block mb-2 text-sm font-medium">그룹</label>
            <div className="grid grid-cols-2 gap-2">
              {GROUP_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setSelectedGroupName(name);
                    setSelectedFieldId(null);
                    setIsNewField(false);
                    setNewFieldName("");
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border ${
                    selectedGroupName === name
                      ? "bg-[#587CF0] text-white"
                      : "bg-white"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">분야</label>

            {availableFields.length > 0 && (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={!isNewField}
                  onChange={() => setIsNewField(false)}
                />
                기존 분야 선택
              </label>
            )}

            {!isNewField && availableFields.length > 0 && (
              <select
                value={selectedFieldId ?? ""}
                onChange={(e) => setSelectedFieldId(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">분야 선택</option>
                {availableFields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={isNewField}
                onChange={() => {
                  setIsNewField(true);
                  setSelectedFieldId(null);
                }}
              />
              새 분야 생성
            </label>

            {isNewField && (
              <input
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="새 분야 이름"
                className="w-full px-3 py-2 border rounded-lg"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#587CF0] rounded-lg"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;
