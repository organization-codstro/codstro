import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit2, Save, ArrowLeft } from "lucide-react";

export default function MeetingMaterials() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [meetingName, setMeetingName] = useState("2025-12-25 Project Planning");
  const [meetingPurpose, setMeetingPurpose] = useState(
    "Discuss authentication flow and user management features"
  );
  const [meetingDetail, setMeetingDetail] = useState(
    "Project Name: AI Chat App\nProject Topic: Real-time messaging application\nProject pages: Authentication, Chat Interface\nFeatures to discuss: Login flow, Session management"
  );
  const [meetingSummary, setMeetingSummary] = useState(
    "Discussed the authentication flow implementation. Decided to use JWT tokens for session management. Agreed on OAuth integration for social logins. Next steps: Design the login UI and implement the backend authentication service."
  );

  const handleSave = () => {
    // TODO: 저장 API
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate(`/projects/meetings/${meetingId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleBack}
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
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 space-x-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
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

      {/* Content */}
      <div className="max-w-5xl p-8 mx-auto space-y-6">
        {/* Basic Info */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Meeting Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              ) : (
                <p className="px-4 py-2 rounded-lg bg-gray-50">{meetingName}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Meeting Purpose
              </label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={meetingPurpose}
                  onChange={(e) => setMeetingPurpose(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              ) : (
                <p className="px-4 py-2 rounded-lg bg-gray-50">
                  {meetingPurpose}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Meeting Details
          </h2>
          {isEditing ? (
            <textarea
              rows={6}
              value={meetingDetail}
              onChange={(e) => setMeetingDetail(e.target.value)}
              className="w-full px-4 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          ) : (
            <pre className="px-4 py-2 font-mono text-sm whitespace-pre-wrap rounded-lg bg-gray-50">
              {meetingDetail}
            </pre>
          )}
        </div>

        {/* Summary */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Meeting Summary
          </h2>
          {isEditing ? (
            <textarea
              rows={6}
              value={meetingSummary}
              onChange={(e) => setMeetingSummary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          ) : (
            <p className="px-4 py-2 whitespace-pre-wrap rounded-lg bg-gray-50">
              {meetingSummary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
