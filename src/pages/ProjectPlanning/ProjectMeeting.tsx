import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, Calendar, ChevronRight } from "lucide-react";

interface MeetingListItem {
  meeting_id: number;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  status: "ongoing" | "completed";
}

export default function ProjectMeeting() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [meetings] = useState<MeetingListItem[]>([
    {
      meeting_id: 1,
      meeting_name: "2025-12-25 Project Planning",
      meeting_purpose:
        "Discuss authentication flow and user management features",
      meeting_created_date: "2025-12-25",
      status: "completed",
    },
    {
      meeting_id: 2,
      meeting_name: "2025-12-26 Chat Interface Design",
      meeting_purpose: "Design real-time messaging UI and features",
      meeting_created_date: "2025-12-26",
      status: "ongoing",
    },
  ]);

  const ongoingMeetings = meetings.filter((m) => m.status === "ongoing");
  const completedMeetings = meetings.filter((m) => m.status === "completed");

  const handleCreateMeeting = () => {
    navigate(`/projects/meetings/new`);
  };

  const handleSelectMeeting = (meetingId: number) => {
    navigate(`/projects/meetings/${meetingId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
            <p className="mt-1 text-gray-600">
              Project #{projectId} · Manage meetings
            </p>
          </div>
          <button
            onClick={handleCreateMeeting}
            className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Plus className="w-5 h-5" />
            <span>New Meeting</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl p-8 mx-auto">
        {ongoingMeetings.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Feature Meetings</h2>
            <div className="space-y-3">
              {ongoingMeetings.map((meeting) => (
                <div
                  key={meeting.meeting_id}
                  onClick={() => handleSelectMeeting(meeting.meeting_id)}
                  className="p-6 bg-white border border-blue-200 rounded-lg cursor-pointer hover:shadow-md"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center mb-2 space-x-3">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">
                          {meeting.meeting_name}
                        </h3>
                        <span className="px-3 py-1 text-xs text-blue-600 rounded-full bg-blue-50">
                          Ongoing
                        </span>
                      </div>
                      <p className="mb-2 text-gray-600">
                        {meeting.meeting_purpose}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {meeting.meeting_created_date}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 mt-1 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {completedMeetings.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold">Free Meetings</h2>
            <div className="space-y-3">
              {completedMeetings.map((meeting) => (
                <div
                  key={meeting.meeting_id}
                  onClick={() => handleSelectMeeting(meeting.meeting_id)}
                  className="p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center mb-2 space-x-3">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold">
                          {meeting.meeting_name}
                        </h3>
                        <span className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                          Completed
                        </span>
                      </div>
                      <p className="mb-2 text-gray-600">
                        {meeting.meeting_purpose}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {meeting.meeting_created_date}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 mt-1 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
