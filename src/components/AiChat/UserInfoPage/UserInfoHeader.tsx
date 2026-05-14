import { ArrowLeft, Save, Edit2 } from "lucide-react";
import { UserInfoHeaderProps } from "../../../types/pages/AiChat/UserInfoPage/UserInfoHeader";

export const UserInfoHeader = ({
  lastUpdated,
  isEditing,
  onBack,
  onEdit,
  onSave,
}: UserInfoHeaderProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              User Information
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={isEditing ? onSave : onEdit}
          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-opacity rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#587CF0" }}
        >
          {isEditing ? (
            <>
              <Save size={18} /> Save
            </>
          ) : (
            <>
              <Edit2 size={18} /> Edit
            </>
          )}
        </button>
      </div>
    </div>
  );
};
