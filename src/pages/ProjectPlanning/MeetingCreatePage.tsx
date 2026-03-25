import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MeetingHeader } from "../../components/ProjectPlanning/MeetingCreatePage/MeetingHeader";
import { MeetingTypeSelector } from "../../components/ProjectPlanning/MeetingCreatePage/MeetingTypeSelector";
import { ProjectPageItem } from "../../components/ProjectPlanning/MeetingCreatePage/ProjectPageItem";

// API Service 및 타입 임포트
import { MeetingCreateService } from "../../api/ProjectPlanning/MeetingCreatePage";
import { PROJECT_ROOM_TYPE } from "../../constants/ProjectPlanning/ProjectPlanning";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function MeetingCreatePage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>(); // URL에서 프로젝트 ID 추출

  console.log(projectId);

  // 1. 상태 관리 (State Management)
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [planningPages, setPlanningPages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [meetingType, setMeetingType] = useState<PROJECT_ROOM_TYPE | null>(
    null,
  );
  const [meetingName, setMeetingName] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  // 2. 생명주기 (useEffect): 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        return;
      }

      try {
        setIsLoading(true);
        // 기획 페이지 목록 조회 API 호출
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

  // 3. 회의 생성 로직 (API 연동)
  const handleCreate = async () => {
    if (!projectId || !meetingType) return;

    const toastId = toast.loading("회의실을 생성하고 있습니다...");
    setIsCreating(true);

    try {
      // 1) 회의실 생성
      const newRoom = await MeetingCreateService.createMeetingRoom({
        projectId: projectId,
        purpose: meetingName, // UI의 meetingName을 서비스의 purpose 컬럼으로 매칭
        detail: meetingPurpose,
        roomType: meetingType,
      });

      // 2) 초기 요약 레코드 생성
      await MeetingCreateService.createInitialSummary({
        roomId: newRoom.project_meeting_room_id,
      });

      toast.update(toastId, {
        render: "회의실이 성공적으로 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      navigate(`projects/${projectId}`);
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

  // 4. 로딩 및 에러 대응 UX
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading project data...
      </div>
    );
  }

  if (!projectId) {
    <NotFoundPage />;
  }

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

              {meetingType === "Feature" && (
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Select Pages
                  </label>
                  {planningPages.length === 0 ? (
                    <p className="text-sm italic text-gray-500">
                      선택 가능한 기획 페이지가 없습니다.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {planningPages.map((page) => (
                        <ProjectPageItem
                          key={page.project_planning_page_id} // 서비스 컬럼명에 맞춤
                          page={page}
                          isSelected={selectedPages.includes(
                            page.project_planning_page_id,
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
            onClick={() => navigate(-1)}
            className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!meetingType || !meetingPurpose.trim() || isCreating}
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
