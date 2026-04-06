import { useEffect, useRef, useState } from "react";
import { X, Plus } from "lucide-react";
import { ConceptEditMetaModalProps } from "../../../types/pages/Concept/ConceptDetailPage/ConceptEditMetaModal";

export default function ConceptEditMetaModal({
  isOpen,
  onClose,
  onSave,
  initialTitle,
  initialDescription,
  initialLabels,
  isSaving = false,
}: ConceptEditMetaModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [labels, setLabels] = useState<string[]>(initialLabels);
  const [labelInput, setLabelInput] = useState("");
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setLabels(initialLabels);
      setLabelInput("");
    }
  }, [isOpen]);

  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addLabel();
    }
  };

  const addLabel = () => {
    const trimmed = labelInput.trim().replace(/,$/, "");
    if (trimmed && !labels.includes(trimmed)) {
      setLabels((prev) => [...prev, trimmed]);
    }
    setLabelInput("");
  };

  const removeLabel = (target: string) => {
    setLabels((prev) => prev.filter((l) => l !== target));
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    await onSave({
      title: title.trim(),
      description: description.trim(),
      labels,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md p-6 mx-4 bg-white shadow-xl rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            개념 정보 수정
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors rounded hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="개념 제목"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="개념 설명 (선택)"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            라벨
          </label>

          <div className="flex gap-2">
            <input
              ref={labelInputRef}
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              onKeyDown={handleLabelKeyDown}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="라벨 입력 후 엔터 또는 쉼표"
            />
            <button
              onClick={addLabel}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" />
              추가
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
          {labels.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-blue-600 bg-blue-50 rounded-full"
            >
              {label}
              <button
                onClick={() => removeLabel(label)}
                className="text-blue-400 transition-colors hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="px-4 py-2 text-sm text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}