// components/SummaryEditor/Header.tsx
import { ArrowLeft, Save } from "lucide-react";
import { SummaryEditorHeaderProps } from "../../../types/pages/ProjectPlanning/SummaryEditorPage/SummaryEditorHeader";

export const SummaryEditorHeader = ({
  onBack,
  onSave,
  isDirty = false,
  isWarning = false,
}: SummaryEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* 왼쪽: 뒤로가기 + 타이틀 */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200
    ${isWarning ? "bg-red-500 text-white" : "text-gray-400 hover:text-gray-900"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Summary Editor
          </h1>
          <p className="text-sm text-gray-500">Edit meeting summary</p>
        </div>
      </div>

      {/* 오른쪽: Save 버튼 + 미저장 Dot */}
      <div className="flex items-center gap-2.5">
        {isDirty && (
          <span
            className="w-2 h-2 rounded-full bg-amber-400"
            title="저장되지 않은 변경 사항"
          />
        )}
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 rounded-lg"
          style={{ backgroundColor: isDirty ? "#587CF0" : "#d1d5db" }}
          disabled={!isDirty}
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
