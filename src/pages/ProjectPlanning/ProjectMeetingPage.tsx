import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import {
  MeetingListItem,
  MeetingType,
} from "../../types/ProjectPlanning/ProjectMeetingPage/ProjectMeetingPage";
import { MeetingHeader } from "../../components/ProjectPlanning/ProjectMeetingPage/MeetingHeader";
import { MeetingTab } from "../../components/ProjectPlanning/ProjectMeetingPage/MeetingTab";
import { MeetingItemCard } from "../../components/ProjectPlanning/ProjectMeetingPage/MeetingItemCard";


export default function ProjectMeeting() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<MeetingType>("all");

  // Mock Data
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

  const featureMeetings = meetings.filter((m) => m.type === "feature");
  const freeMeetings = meetings.filter((m) => m.type === "free");

  const filteredMeetings = meetings.filter((m) => {
    if (selectedType === "all") return true;
    return m.type === selectedType;
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <MeetingHeader
        projectId={projectId}
        onCreate={() => navigate(`/projects/meetings/new`)}
      />

      {/* Tabs Section */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center max-w-6xl mx-auto space-x-4">
          <MeetingTab
            label="All Meetings"
            count={meetings.length}
            type="all"
            selectedType={selectedType}
            onClick={setSelectedType}
          />
          <MeetingTab
            label="Feature Meetings"
            count={featureMeetings.length}
            type="feature"
            selectedType={selectedType}
            onClick={setSelectedType}
          />
          <MeetingTab
            label="Free Meetings"
            count={freeMeetings.length}
            type="free"
            selectedType={selectedType}
            onClick={setSelectedType}
          />
        </div>
      </div>

      {/* List Section */}
      <div className="max-w-6xl p-8 mx-auto">
        {filteredMeetings.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No meetings found
            </h3>
            <p className="text-gray-600">
              {selectedType === "feature"
                ? "No ongoing feature meetings"
                : selectedType === "free"
                ? "No completed free meetings"
                : "No meetings available"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMeetings.map((meeting) => (
              <MeetingItemCard
                key={meeting.meeting_id}
                meeting={meeting}
                onClick={(id) => navigate(`/projects/meetings/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
