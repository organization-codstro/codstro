import { MessageSquare, Calendar, ChevronRight } from "lucide-react";
import { MeetingItemCardProps } from "../../../types/pages/ProjectPlanning/ProjectMeetingPage/MeetingItemCard";

export const MeetingItemCard = ({ meeting, onClick }: MeetingItemCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(meeting.meeting_id);
    }
  };

  return (
    <div
      onClick={() => onClick(meeting.meeting_id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center mb-2 space-x-3">
            <MessageSquare
              className={`w-5 h-5 ${
                meeting.type === "Feature" ? "text-[#587CF0]" : "text-gray-400"
              }`}
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {meeting.meeting_name}
            </h3>
          </div>
          <p className="mb-2 text-gray-600">{meeting.meeting_purpose}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {meeting.meeting_created_date}
          </div>
        </div>
        <ChevronRight className="w-6 h-6 mt-1 text-gray-400" />
      </div>
    </div>
  );
};
