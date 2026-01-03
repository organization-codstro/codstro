import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { RecommendedPin } from "../../types/Woomoonjeong/woomoonjeong";
import { woomoonjeongData } from "../../data/woomoonjeong/woomoonjeongData";
import { Field, Group } from "../../types/Woomoonjeong/woomoonjeong";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: RecommendedPin;
  onAdd: (fieldType: string, groupId: number | null, groupName: string) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  pin,
  onAdd,
}) => {
  const [selectedFieldType, setSelectedFieldType] = useState<
    "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >(pin.field_type);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [isNewGroup, setIsNewGroup] = useState(false);

  const fieldTypes: Array<
    "web" | "app" | "server" | "game" | "security" | "work" | "other"
  > = ["web", "app", "server", "game", "security", "work", "other"];

  // 선택한 Field Type에 해당하는 Field 찾기
  const selectedField = woomoonjeongData.find(
    (field) => field.type === selectedFieldType
  );

  // 선택한 Field의 Groups 목록
  const availableGroups: Group[] = selectedField?.groups || [];

  useEffect(() => {
    if (isOpen) {
      setSelectedFieldType(pin.field_type);
      setSelectedGroupId(null);
      setNewGroupName("");
      setIsNewGroup(false);
    }
  }, [isOpen, pin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewGroup) {
      if (!newGroupName.trim()) {
        alert("분야 이름을 입력해주세요.");
        return;
      }
      onAdd(selectedFieldType, null, newGroupName.trim());
    } else {
      if (!selectedGroupId) {
        alert("분야를 선택해주세요.");
        return;
      }
      onAdd(selectedFieldType, selectedGroupId, "");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">문서 추가</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors rounded hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Info */}
        <div className="p-4 mb-4 rounded-lg bg-gray-50">
          <h3 className="mb-1 font-medium text-gray-800">{pin.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {pin.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Group Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              그룹 타입
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedFieldType(type);
                    setSelectedGroupId(null);
                    setIsNewGroup(false);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedFieldType === type
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Field Type Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              분야
            </label>
            <div className="space-y-2">
              {/* 기존 분야 선택 */}
              {availableGroups.length > 0 && (
                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="fieldOption"
                      checked={!isNewGroup}
                      onChange={() => {
                        setIsNewGroup(false);
                        setNewGroupName("");
                      }}
                      className="mr-2 text-[#587CF0] focus:ring-[#587CF0]"
                    />
                    <span className="text-sm text-gray-700">
                      기존 분야 선택
                    </span>
                  </label>
                  {!isNewGroup && (
                    <select
                      value={selectedGroupId || ""}
                      onChange={(e) =>
                        setSelectedGroupId(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
                    >
                      <option value="">분야를 선택하세요</option>
                      {availableGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* 새 분야 생성 */}
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="fieldOption"
                    checked={isNewGroup}
                    onChange={() => {
                      setIsNewGroup(true);
                      setSelectedGroupId(null);
                    }}
                    className="mr-2 text-[#587CF0] focus:ring-[#587CF0]"
                  />
                  <span className="text-sm text-gray-700">새 분야 생성</span>
                </label>
                {isNewGroup && (
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="분야 이름을 입력하세요"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
                  />
                )}
              </div>
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

export default AddDocumentModal;
