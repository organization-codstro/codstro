import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MeetingTypeSelector } from "../../components/ProjectPlanning/MeetingCreatePage/MeetingTypeSelector";
import { ProjectPageItem } from "../../components/ProjectPlanning/MeetingCreatePage/ProjectPageItem";

import { MeetingCreateService } from "../../api/ProjectPlanning/MeetingCreatePage";
import { PROJECT_ROOM_TYPE } from "../../constants/ProjectPlanning/ProjectPlanning";
import NotFoundPage from "../NotFound/NotFoundPage";
import { MeetingHeader } from "../../components/ProjectPlanning/MeetingHeader";
import { ProjectPage } from "../../types/common/ProjectPlanning";

export default function MeetingCreatePage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [planningPages, setPlanningPages] = useState<ProjectPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [meetingName, setMeetingName] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [meetingDetail, setMeetingDetail] = useState("");
  const [meetingType, setMeetingType] = useState<PROJECT_ROOM_TYPE | null>(
    null,
  );
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  // ESC 키 핸들러 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/projects/${projectId}/meetings`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, projectId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        const pages = await MeetingCreateService.getPlanningPages({
          projectId,
        });
        setPlanningPages(pages);
      } catch (err: any) {
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const togglePageSelection = (id: string) => {
    setSelectedPages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleCreate = async () => {
    if (!projectId || !meetingType) return;

    const toastId = toast.loading("회의실을 생성하고 있습니다...");
    setIsCreating(true);

    try {
      // 1. 회의방 생성
      const newRoom = await MeetingCreateService.createMeetingRoom({
        projectId,
        name: meetingName,
        purpose: meetingPurpose,
        detail: meetingDetail,
        roomType: meetingType,
      });

      // 2. 기능 회의 + 페이지 선택한 경우 → project_meeting_room_pages에 관계 저장
      if (meetingType === "Feature" && selectedPages.length > 0) {
        await MeetingCreateService.createMeetingRoomPages({
          roomId: newRoom.project_meeting_room_id,
          pageIds: selectedPages,
        });
      }

      // 3. 초기 요약 레코드 생성
      await MeetingCreateService.createInitialSummary({
        roomId: newRoom.project_meeting_room_id,
      });

      toast.update(toastId, {
        render: "회의실이 성공적으로 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      navigate(`/projects/${projectId}/meetings`);
    } catch (err: any) {
      toast.update(toastId, {
        render: "생성에 실패했습니다. 다시 시도해주세요.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-16 bg-white border-b border-gray-200" />

        <div className="max-w-4xl p-8 mx-auto">
          <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg">
            {/* Meeting Name */}
            <div>
              <div className="w-32 h-4 mb-2 bg-gray-200 rounded" />
              <div className="w-full h-10 bg-gray-200 rounded-lg" />
            </div>

            {/* Meeting Type */}
            <div className="space-y-2">
              <div className="w-40 h-4 bg-gray-200 rounded" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-12 bg-gray-200 rounded-lg" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <div className="w-40 h-4 mb-2 bg-gray-200 rounded" />
              <div className="w-full h-10 bg-gray-200 rounded-lg" />
            </div>

            {/* Detail */}
            <div>
              <div className="w-40 h-4 mb-2 bg-gray-200 rounded" />
              <div className="w-full h-24 bg-gray-200 rounded-lg" />
            </div>

            {/* Pages */}
            <div className="space-y-3">
              <div className="w-32 h-4 bg-gray-200 rounded" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                >
                  <div className="w-40 h-4 bg-gray-200 rounded" />
                  <div className="w-6 h-6 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <div className="w-24 h-10 bg-gray-200 rounded-lg" />
            <div className="w-32 h-10 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!projectId) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <MeetingHeader
        onBack={() => navigate(`/projects/${projectId}/meetings`)}
      />
      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg">
          {/* project_meeting_name */}
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

          {/* project_meeting_room_type */}
          <MeetingTypeSelector
            selectedType={meetingType}
            onSelect={setMeetingType}
          />

          {meetingType && (
            <>
              {/* project_meeting_purpose */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meeting Purpose
                </label>
                <input
                  type="text"
                  value={meetingPurpose}
                  onChange={(e) => setMeetingPurpose(e.target.value)}
                  placeholder="회의 목적을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* project_meeting_detail */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meeting Detail
                </label>
                <textarea
                  value={meetingDetail}
                  onChange={(e) => setMeetingDetail(e.target.value)}
                  placeholder="회의의 상세 내용을 입력하여 주세요"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Feature 타입일 때만 페이지 선택 표시 */}
              {meetingType === "Feature" && (
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Select Pages
                    {selectedPages.length > 0 && (
                      <span className="ml-2 text-blue-500">
                        ({selectedPages.length}개 선택됨)
                      </span>
                    )}
                  </label>
                  {planningPages.length === 0 ? (
                    <p className="text-sm italic text-gray-500">
                      선택 가능한 기획 페이지가 없습니다.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {planningPages.map((page) => (
                        <ProjectPageItem
                          key={page.project_page_id}
                          page={page}
                          isSelected={selectedPages.includes(
                            page.project_page_id,
                          )}
                          onToggle={togglePageSelection}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate(`/projects/${projectId}/meetings`)}
            className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={
              !meetingType ||
              !meetingPurpose.trim() ||
              !meetingDetail.trim() ||
              isCreating
            }
            className="px-6 py-3 font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#587CF0" }}
          >
            {isCreating ? "Creating..." : "Start Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}
