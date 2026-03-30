import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MaterialsHeader } from "../../components/ProjectPlanning/MeetingMaterialsPage/MaterialsHeader";
import { EditableField } from "../../components/ProjectPlanning/MeetingMaterialsPage/EditableField";
import { MeetingMaterialsService } from "../../api/ProjectPlanning/MeetingMaterialsPage";
import NotFoundPage from "../NotFound/NotFoundPage";
import { Edit2, X } from "lucide-react";

export default function MeetingMaterialsPage() {
  const { projectId, meetingId } = useParams<{
    projectId: string;
    meetingId: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/projects/${projectId}/meetings/${meetingId}`);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [navigate, projectId, meetingId]);

  // 1. 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [summaryId, setSummaryId] = useState<string | null>(null);
  const [isSummaryEditing, setIsSummaryEditing] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState("");

  // DB 필드 매칭 상태
  const [meetingName, setMeetingName] = useState("");
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [meetingDetail, setMeetingDetail] = useState("");
  const [meetingSummary, setMeetingSummary] = useState("");

  // 원본값 스냅샷
  const [originalData, setOriginalData] = useState({
    meetingName: "",
    meetingPurpose: "",
    meetingDetail: "",
  });

  // 2. 데이터 로드
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
          setMeetingName(room.project_meeting_name || "");
          setMeetingPurpose(room.project_meeting_purpose || "");
          setMeetingDetail(room.project_meeting_detail || "");
        }

        if (summary) {
          setSummaryId(summary.project_meeting_summary_id);
          setMeetingSummary(summary.project_meeting_summary || "");
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

  // 3. 저장 로직
  const handleSave = async () => {
    if (!meetingId) return;

    const toastId = toast.loading("변경 내용을 저장 중입니다...");
    try {
      await MeetingMaterialsService.updateMeetingRoom({
        roomId: meetingId,
        updates: {
          name: meetingName,
          purpose: meetingPurpose,
          detail: meetingDetail,
        },
      });

      const finalSummary = isSummaryEditing ? summaryDraft : meetingSummary;
      setMeetingSummary(finalSummary);
      setIsSummaryEditing(false);

      if (summaryId) {
        await MeetingMaterialsService.updateMeetingSummary({
          summaryId,
          summaryText: finalSummary,
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

  // 4. 취소 로직
  const handleCancel = () => {
    setMeetingName(originalData.meetingName);
    setMeetingPurpose(originalData.meetingPurpose);
    setMeetingDetail(originalData.meetingDetail);
    setIsEditing(false);
    setIsSummaryEditing(false);
  };

  // 5. 로딩 UX
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
        isEditing={isEditing}
        onBack={() => navigate(`/projects/${projectId}/meetings/${meetingId}`)}
        onEdit={() => {
          setOriginalData({ meetingName, meetingPurpose, meetingDetail });
          setIsEditing(true);
        }}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="max-w-5xl p-8 mx-auto space-y-6">
        {/* Basic Info Section */}
        <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>
          <EditableField
            label="Name"
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
          {isEditing && !isSummaryEditing && (
            <div className="flex justify-end mb-2">
              <button
                onClick={() =>
                  navigate(
                    `/projects/${projectId}/meetings/${meetingId}/materials/summary/edit`,
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          )}
          {isEditing && isSummaryEditing && (
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsSummaryEditing(false)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {isSummaryEditing ? (
            <textarea
              className="w-full p-3 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
              value={summaryDraft}
              onChange={(e) => setSummaryDraft(e.target.value)}
            />
          ) : meetingSummary ? (
            <div className="prose-sm prose text-gray-700 max-w-none">
              <ReactMarkdown>{meetingSummary}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              아직 저장된 요약이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
