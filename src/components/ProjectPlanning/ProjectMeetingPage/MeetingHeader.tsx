import { Plus } from "lucide-react";
import { MeetingHeaderProps } from "../../../types/ProjectPlanning/ProjectMeetingPage/MeetingHeader";


export const MeetingHeader = ({ projectId, onCreate }: MeetingHeaderProps) => (
  <div className="px-8 py-6 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
        <p className="mt-1 text-gray-600">
          Project #{projectId} · Manage meetings
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg hover:opacity-90 bg-[#587CF0]"
      >
        <Plus className="w-5 h-5" />
        <span>New Meeting</span>
      </button>
    </div>
  </div>
);
