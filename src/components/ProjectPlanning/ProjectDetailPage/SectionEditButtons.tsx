import { Edit, Save, X } from "lucide-react";

// ── 섹션 헤더 버튼 공통 컴포넌트 ─────────────────────────
export const SectionEditButtons = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="flex items-center gap-2">
    {isEditing ? (
      <>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-1 px-3 py-1 text-sm text-white rounded-lg bg-[#587CF0]"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </>
    ) : (
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Edit className="w-3.5 h-3.5" />
        Edit
      </button>
    )}
  </div>
);
