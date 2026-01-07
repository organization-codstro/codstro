import { Save } from "lucide-react";

interface EditActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
}

export default function EditActionButtons({
  onCancel,
  onSave,
  saveLabel = "Save Changes",
  cancelLabel = "Cancel",
}: EditActionButtonsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        {cancelLabel}
      </button>

      <button
        onClick={onSave}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a68d9] font-medium transition-colors"
      >
        <Save className="w-4 h-4" />
        {saveLabel}
      </button>
    </div>
  );
}
