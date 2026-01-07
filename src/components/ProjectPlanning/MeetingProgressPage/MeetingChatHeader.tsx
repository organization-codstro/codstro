import { ArrowLeft, FileText, Save, LogOut } from "lucide-react";
import { MeetingChatHeaderProps } from "../../../types/ProjectPlanning/MeetingProgressPage/MeetingChatHeader";

export const MeetingChatHeader = ({
  meetingId,
  onBack,
  onViewMaterials,
  onSave,
  onEnd,
}: MeetingChatHeaderProps) => (
  <div className="px-8 py-4 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Project Meeting</h1>
          <p className="text-sm text-gray-600">Meeting #{meetingId}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onViewMaterials}
          className="flex items-center px-4 py-2 space-x-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FileText className="w-4 h-4" />
          <span>Materials</span>
        </button>
        <button
          onClick={onSave}
          className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-[#587CF0]"
        >
          <Save className="w-4 h-4" />
          <span>Save Meeting</span>
        </button>
        <button
          onClick={onEnd}
          className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-[#587CF0]"
        >
          <LogOut className="w-4 h-4" />
          <span>End Meeting</span>
        </button>
      </div>
    </div>
  </div>
);
