import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { ProjectPage } from "../../types/ProjectPlanning/project";

export default function MeetingCreate() {
  const navigate = useNavigate();

  const [meetingType, setMeetingType] = useState<"feature" | "free" | null>(
    null
  );
  const [meetingName, setMeetingName] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const projectPages: ProjectPage[] = [
    {
      project_page_id: 1,
      project_page_name: "Authentication",
      project_page_role: "User Management",
      project_page_function: "Login, Signup, Password Reset",
      project_page_is_complete: false,
      project_id: 1,
    },
    {
      project_page_id: 2,
      project_page_name: "Chat Interface",
      project_page_role: "Messaging",
      project_page_function: "Send messages, display chat history",
      project_page_is_complete: false,
      project_id: 1,
    },
  ];

  const togglePageSelection = (pageId: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleCreate = () => {
    // meetingDetail 생성
    const meetingDetail =
      meetingType === "feature"
        ? `Project pages: ${selectedPages
            .map(
              (id) =>
                projectPages.find((p) => p.project_page_id === id)
                  ?.project_page_name
            )
            .join(", ")}`
        : "General project discussion";

    // TODO: 실제 API 호출 후 meetingId 받아오기
    const newMeetingId = Math.floor(Math.random() * 1000); // 임시

    // meeting 생성 후 회의 페이지로 이동
    navigate(`/projects/meetings/${newMeetingId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center max-w-4xl gap-4 mx-auto">
          <button
            onClick={() => navigate("/projects/meetings")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Meeting</h1>
            <p className="mt-1 text-gray-600">
              Discuss your project with AI assistance
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg">
          {/* Meeting Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Meeting Name
            </label>
            <input
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Meeting Type */}
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Meeting Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMeetingType("feature")}
                className={`p-6 border-2 rounded-lg transition-all ${
                  meetingType === "feature"
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CheckCircle
                  className={`w-8 h-8 mx-auto mb-3 ${
                    meetingType === "feature"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <h3 className="mb-1 font-semibold text-gray-900">
                  Feature Meeting
                </h3>
                <p className="text-sm text-gray-600">
                  Discuss specific project pages and features
                </p>
              </button>

              <button
                onClick={() => setMeetingType("free")}
                className={`p-6 border-2 rounded-lg transition-all ${
                  meetingType === "free"
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <MessageSquare
                  className={`w-8 h-8 mx-auto mb-3 ${
                    meetingType === "free" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <h3 className="mb-1 font-semibold text-gray-900">
                  Free Meeting
                </h3>
                <p className="text-sm text-gray-600">
                  Open discussion about your project
                </p>
              </button>
            </div>
          </div>

          {meetingType && (
            <>
              {/* Meeting Purpose */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meeting Purpose
                </label>
                <textarea
                  value={meetingPurpose}
                  onChange={(e) => setMeetingPurpose(e.target.value)}
                  placeholder="What do you want to discuss in this meeting?"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Feature Pages */}
              {meetingType === "feature" && (
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Select Pages to Discuss
                  </label>
                  <div className="space-y-2">
                    {projectPages.map((page) => (
                      <label
                        key={page.project_page_id}
                        className="flex items-start p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPages.includes(page.project_page_id)}
                          onChange={() =>
                            togglePageSelection(page.project_page_id)
                          }
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {page.project_page_name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {page.project_page_function}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!meetingType || !meetingPurpose.trim()}
            className="px-6 py-3 font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#587CF0" }}
          >
            Start Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
