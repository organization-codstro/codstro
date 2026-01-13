import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MaterialsHeader } from "../../components/ProjectPlanning/MeetingMaterialsPage/MaterialsHeader";
import { EditableField } from "../../components/ProjectPlanning/MeetingMaterialsPage/EditableField";

export default function MeetingMaterialsPage() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [meetingName, setMeetingName] = useState("2025-12-25 Project Planning");
  const [meetingPurpose, setMeetingPurpose] = useState(
    "Discuss authentication flow and user management features"
  );
  const [meetingDetail, setMeetingDetail] = useState(
    "Project Name: AI Chat App\nProject Topic: Real-time messaging application..."
  );
  const [meetingSummary, setMeetingSummary] = useState(
    "Discussed the authentication flow implementation..."
  );

  const handleSave = () => {
    setIsEditing(false);
    // TODO: API Call
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <MaterialsHeader
        meetingId={meetingId}
        isEditing={isEditing}
        onBack={() => navigate(`/projects/meetings/${meetingId}`)}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="max-w-5xl p-8 mx-auto space-y-6">
        {/* Basic Info Section */}
        <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>
          <EditableField
            label="Meeting Name"
            isEditing={isEditing}
            value={meetingName}
            onChange={setMeetingName}
          />
          <EditableField
            label="Meeting Purpose"
            isEditing={isEditing}
            type="textarea"
            value={meetingPurpose}
            onChange={setMeetingPurpose}
          />
        </div>

        {/* Details Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Meeting Details
          </h2>
          <EditableField
            label=""
            isEditing={isEditing}
            type="textarea"
            rows={6}
            isMono={true}
            value={meetingDetail}
            onChange={setMeetingDetail}
          />
        </div>

        {/* Summary Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Meeting Summary
          </h2>
          <EditableField
            label=""
            isEditing={isEditing}
            type="textarea"
            rows={6}
            value={meetingSummary}
            onChange={setMeetingSummary}
          />
        </div>
      </div>
    </div>
  );
}
