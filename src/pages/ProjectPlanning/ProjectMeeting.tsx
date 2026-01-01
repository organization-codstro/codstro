import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, Calendar, ChevronRight } from "lucide-react";

interface MeetingListItem {
  meeting_id: number;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  type: "feature" | "free";
}

type MeetingType = "feature" | "free" | "all";

export default function ProjectMeeting() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<MeetingType>("all");

  const [meetings] = useState<MeetingListItem[]>([
    {
      meeting_id: 1,
      meeting_name: "2025-12-25 Project Planning",
      meeting_purpose:
        "Discuss authentication flow and user management features",
      meeting_created_date: "2025-12-25",
      type: "feature",
    },
    {
      meeting_id: 2,
      meeting_name: "2025-12-26 Chat Interface Design",
      meeting_purpose: "Design real-time messaging UI and features",
      meeting_created_date: "2025-12-26",
      type: "feature",
    },
    {
      meeting_id: 3,
      meeting_name: "2025-12-27 Database Schema Review",
      meeting_purpose: "Review and finalize database structure",
      meeting_created_date: "2025-12-27",
      type: "free",
    },
    {
      meeting_id: 4,
      meeting_name: "2025-12-20 Initial Planning",
      meeting_purpose: "Initial project setup and requirements gathering",
      meeting_created_date: "2025-12-20",
      type: "free",
    },
  ]);

  const ongoingMeetings = meetings.filter((m) => m.type === "feature");
  const completedMeetings = meetings.filter((m) => m.type === "free");

  // 선택된 타입에 따라 필터링
  const getFilteredMeetings = () => {
    switch (selectedType) {
      case "feature":
        return ongoingMeetings;
      case "free":
        return completedMeetings;
      case "all":
      default:
        return meetings;
    }
  };

  const filteredMeetings = getFilteredMeetings();

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

      {/* Meeting Type Tabs */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4 max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedType === "all"
                ? "text-white"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
            style={selectedType === "all" ? { backgroundColor: "#587CF0" } : {}}
          >
            All Meetings ({meetings.length})
          </button>
          <button
            onClick={() => setSelectedType("feature")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedType === "feature"
                ? "text-white"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
            style={
              selectedType === "feature" ? { backgroundColor: "#587CF0" } : {}
            }
          >
            Feature Meetings ({ongoingMeetings.length})
          </button>
          <button
            onClick={() => setSelectedType("free")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedType === "free"
                ? "text-white"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
            style={
              selectedType === "free" ? { backgroundColor: "#587CF0" } : {}
            }
          >
            Free Meetings ({completedMeetings.length})
          </button>
        </div>
      </div>

      <div className="max-w-6xl p-8 mx-auto">
        {filteredMeetings.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No meetings found
            </h3>
            <p className="text-gray-600">
              {(() => {
                if (selectedType === "feature") {
                  return "No ongoing feature meetings";
                }
                if (selectedType === "free") {
                  return "No completed free meetings";
                }
                return "No meetings available";
              })()}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMeetings.map((meeting) => {
              return (
                <div
                  key={meeting.meeting_id}
                  onClick={() => handleSelectMeeting(meeting.meeting_id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectMeeting(meeting.meeting_id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`p-6 bg-white border rounded-lg cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center mb-2 space-x-3">
                        <MessageSquare className={`w-5 h-5 `} />
                        <h3 className="text-lg font-semibold">
                          {meeting.meeting_name}
                        </h3>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
