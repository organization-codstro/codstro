import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { MeetingListItem } from "../../types/pages/ProjectPlanning/ProjectMeetingPage/ProjectMeetingPage";
import { MeetingHeader } from "../../components/ProjectPlanning/MeetingHeader";
import { MeetingTab } from "../../components/ProjectPlanning/ProjectMeetingPage/MeetingTab";
import { MeetingItemCard } from "../../components/ProjectPlanning/ProjectMeetingPage/MeetingItemCard";
import { ProjectMeetingListService } from "../../api/ProjectPlanning/ProjectMeetingPage";
import { PROJECT_ROOM_TYPE } from "../../constants/ProjectPlanning/ProjectPlanning";
import { NotFoundPage } from "../NotFound/NotFoundPage";

export default function ProjectMeetingPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 상태 관리
  const [selectedType, setSelectedType] =
    useState<PROJECT_ROOM_TYPE>("Feature");
  const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ESC 키 핸들러 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/projects/${projectId}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, projectId]);

  // 데이터 로드
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);

        const data = await ProjectMeetingListService.getMeetingList({
          projectId,
        });

        setMeetings(data);
      } catch (error) {
        console.error(error);
        toast.error("회의 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [projectId]);

  // 카운트 계산
  const featureCount = meetings.filter((m) => m.type === "Feature").length;
  const freeCount = meetings.filter((m) => m.type === "Free").length;
  const filteredMeetings = meetings.filter((m) => m.type === selectedType);

  if (!meetings) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <MeetingHeader
        onBack={() => navigate(`/projects/${projectId}`)}
        onCreate={() => navigate(`/projects/${projectId}/meetings/new`)}
      />

      {/* Tabs Section */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center max-w-6xl mx-auto space-x-4">
          <MeetingTab
            label="Feature Meetings"
            count={featureCount}
            type="Feature"
            selectedType={selectedType}
            onClick={setSelectedType}
          />
          <MeetingTab
            label="Free Meetings"
            count={freeCount}
            type="Free"
            selectedType={selectedType}
            onClick={setSelectedType}
          />
        </div>
      </div>

      {/* List Section */}
      <div className="max-w-6xl p-8 mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="w-10 h-10 mb-4 text-blue-500 animate-spin" />
            <p className="text-gray-500">회의 목록을 불러오고 있습니다...</p>
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No meetings found
            </h3>
            <p className="text-gray-600">
              {selectedType === "Feature"
                ? "No ongoing feature meetings"
                : selectedType === "Free"
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
                onClick={(id) =>
                  navigate(`/projects/${projectId}/meetings/${id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
