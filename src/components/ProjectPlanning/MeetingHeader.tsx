import { ArrowLeft, Plus } from "lucide-react";
import { MeetingHeaderProps } from "../../types/pages/ProjectPlanning/ProjectMeetingPage/MeetingHeader";

export const MeetingHeader = ({ onCreate, onBack }: MeetingHeaderProps) => (
  <div className="px-8 py-6 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      {/* 뒤로가기 + 타이틀 묶음 */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
      </div>

      {onCreate && (
        <button
          onClick={onCreate}
          className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg hover:opacity-90 bg-[#587CF0]"
        >
          <Plus className="w-5 h-5" />
          <span>New Meeting</span>
        </button>
      )}
    </div>
  </div>
);
