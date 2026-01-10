import { X } from "lucide-react";
import { EditHeaderProps } from "../../../types/pages/Profile/ProfileEditPage/EditHeader";

export default function EditHeader({ title, onClose }: EditHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <button
        onClick={onClose}
        className="p-2 transition-colors rounded-lg hover:bg-gray-100"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
