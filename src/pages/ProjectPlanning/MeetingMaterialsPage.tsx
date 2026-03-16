import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MaterialsHeader } from "../../components/ProjectPlanning/MeetingMaterialsPage/MaterialsHeader";
import { EditableField } from "../../components/ProjectPlanning/MeetingMaterialsPage/EditableField";
// API Service 임포트
import { MeetingMaterialsService } from "../../api/ProjectPlanning/MeetingMaterialsPage";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function MeetingMaterialsPage() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리 (State Management)
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [summaryId, setSummaryId] = useState<string | null>(null);

  // DB 필드 매칭 상태
  const [meetingName, setMeetingName] = useState(""); // project_meeting_logs_created_date (날짜 기반 이름)
  const [meetingPurpose, setMeetingPurpose] = useState(""); // project__meeting_purpose
  const [meetingDetail, setMeetingDetail] = useState(""); // project_meeting_detail
  const [meetingSummary, setMeetingSummary] = useState(""); // project meeting summary (요약 테이블)

  // 2. 생명주기 (useEffect): 데이터 로드
  useEffect(() => {
    const fetchMeetingData = async () => {
      if (!meetingId) {
        toast.error("회의 ID가 유효하지 않습니다.");
        return;
      }

      try {
        setIsLoading(true);
        const { room, summary } =
          await MeetingMaterialsService.getMeetingDetails({
            roomId: meetingId,
          });

        if (room) {
          setMeetingName(room.project_meeting_logs_created_date || "");
          setMeetingPurpose(room.project__meeting_purpose || "");
          setMeetingDetail(room.project_meeting_detail || "");
        }

        if (summary) {
          setSummaryId(summary.project_meeting_summary_id);
          setMeetingSummary(summary["project meeting summary"] || "");
        }
      } catch (error) {
        console.error("Failed to fetch meeting data:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId, navigate]);

  // 3. 저장 로직 (API 연동)
  const handleSave = async () => {
    if (!meetingId) return;

    const toastId = toast.loading("변경 내용을 저장 중입니다...");
    try {
      // 1) 회의 기본 정보 업데이트
      await MeetingMaterialsService.updateMeetingRoom({
        roomId: meetingId,
        updates: {
          purpose: meetingPurpose,
          detail: meetingDetail,
          date: meetingName,
        },
      });

      // 2) 요약본 업데이트 (기존 요약본 ID가 있을 경우)
      if (summaryId) {
        await MeetingMaterialsService.updateMeetingSummary({
          summaryId: summaryId,
          summaryText: meetingSummary,
        });
      }

      toast.update(toastId, {
        render: "성공적으로 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      setIsEditing(false);
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  // 4. 로딩 UX 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-500">Meeting Materials Loading...</div>
      </div>
    );
  }

  if (!meetingId) {
    return <NotFoundPage />;
  }

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
        <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>
          <EditableField
            label="Meeting Date/Name"
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
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
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
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Meeting Summary
          </h2>
          <EditableField
            label=""
            isEditing={isEditing}
            type="textarea"
            rows={8}
            value={meetingSummary}
            onChange={setMeetingSummary}
          />
        </div>
      </div>
    </div>
  );
}
