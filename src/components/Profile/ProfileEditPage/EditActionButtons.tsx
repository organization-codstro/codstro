import { Save, Loader2 } from "lucide-react";
import { EditActionButtonsProps } from "../../../types/pages/Profile/ProfileEditPage/EditActionButtons";

export default function EditActionButtons({
  onCancel,
  onSave,
  disabled = false,
  saveLabel = "Save Changes",
  cancelLabel = "Cancel",
}: EditActionButtonsProps) {
  return (
    <div className="flex gap-3 pt-4">
      {/* 1. 취소 버튼: 저장 중에는 클릭 방지 및 시각적 비활성화 */}
      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className={`flex-1 px-4 py-2 font-medium transition-colors border border-gray-300 rounded-lg 
          ${
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50 text-gray-700"
          }`}
      >
        {cancelLabel}
      </button>

      {/* 2. 저장 버튼: 저장 중에는 로딩 아이콘 표시 및 비활성화 */}
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-medium transition-all
          ${
            disabled
              ? "bg-[#587CF0] opacity-70 cursor-not-allowed"
              : "bg-[#587CF0] hover:bg-[#4a68d9]"
          }`}
      >
        {disabled ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>{saveLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}
