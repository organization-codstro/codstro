import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeetingHeader } from "../../components/ProjectPlanning/MeetingCreatePage/MeetingHeader";
import { MeetingTypeSelector } from "../../components/ProjectPlanning/MeetingCreatePage/MeetingTypeSelector";
import { ProjectPageItem } from "../../components/ProjectPlanning/MeetingCreatePage/ProjectPageItem";
import { projectPages } from "../../data/ProjectPlanning/projectPages";

export default function MeetingCreatePage() {
  const navigate = useNavigate();
  const [meetingType, setMeetingType] = useState<"feature" | "free" | null>(
    null
  );
  const [meetingName, setMeetingName] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const togglePageSelection = (id: number) => {
    setSelectedPages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    const newMeetingId = Math.floor(Math.random() * 1000);
    navigate(`/projects/meetings/${newMeetingId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <MeetingHeader />
      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg">
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

          <MeetingTypeSelector
            selectedType={meetingType}
            onSelect={setMeetingType}
          />

          {meetingType && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meeting Purpose
                </label>
                <textarea
                  value={meetingPurpose}
                  onChange={(e) => setMeetingPurpose(e.target.value)}
                  placeholder="What do you want to discuss?"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              {meetingType === "feature" && (
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Select Pages
                  </label>
                  <div className="space-y-2">
                    {projectPages.map((page) => (
                      <ProjectPageItem
                        key={page.project_page_id}
                        page={page}
                        isSelected={selectedPages.includes(
                          page.project_page_id
                        )}
                        onToggle={togglePageSelection}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

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
