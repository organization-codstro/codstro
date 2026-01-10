import { ArrowLeft, Edit2, Save } from "lucide-react";
import { MaterialsHeaderProps } from "../../../types/pages/ProjectPlanning/MeetingMaterialsPage/MaterialsHeader";


export const MaterialsHeader = ({
  meetingId,
  isEditing,
  onBack,
  onEdit,
  onSave,
}: MaterialsHeaderProps) => (
  <div className="px-8 py-6 bg-white border-b border-gray-200">
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center mb-4 space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Meeting</span>
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Meeting Materials
          </h1>
          <p className="mt-1 text-gray-600">
            View and edit meeting information (#{meetingId})
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 space-x-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        ) : (
          <button
            onClick={onSave}
            className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        )}
      </div>
    </div>
  </div>
);
