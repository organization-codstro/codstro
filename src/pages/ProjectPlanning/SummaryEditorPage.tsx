// pages/ProjectPlanning/SummaryEditorPage.tsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SummaryEditorService } from "../../api/ProjectPlanning/SummaryEditorPage";
import SummaryEditorHeader from "../../components/Concepts/SummaryEditorPage/SummaryEditorHeader";
import MarkdownEditorPanel from "../../components/Concepts/SummaryEditorPage/MarkdownEditorPanel";
import MarkdownPreviewPanel from "../../components/Concepts/SummaryEditorPage/MarkdownPreviewPanel";

export default function SummaryEditorPage() {
  const { projectId, meetingId } = useParams<{
    projectId: string;
    meetingId: string;
  }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [summaryId, setSummaryId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState("");
  const [savedText, setSavedText] = useState(""); // 마지막 저장값
  const [isDirty, setIsDirty] = useState(false); // 변경 감지
  const [isWarning, setIsWarning] = useState(false); // 뒤로가기 경고
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 변경 감지
  useEffect(() => {
    setIsDirty(summaryText !== savedText);
  }, [summaryText, savedText]);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      if (!meetingId) return;
      try {
        setIsLoading(true);
        const { summary } = await SummaryEditorService.getMeetingSummary({
          roomId: meetingId,
        });

        if (summary) {
          setSummaryId(summary.project_meeting_summary_id);
          setSummaryText(summary.project_meeting_summary || "");
          setSavedText(summary.project_meeting_summary || "");
        }
      } catch (error) {
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [meetingId]);

  // Save 버튼
  const handleSave = async () => {
    if (!meetingId || !summaryId) return;

    const toastId = toast.loading("저장 중입니다...");
    try {
      await SummaryEditorService.updateMeetingSummary({
        summaryId,
        summaryText,
      });

      setSavedText(summaryText);
      setIsDirty(false);

      toast.update(toastId, {
        render: "성공적으로 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  // 뒤로가기 2단계 경고
  const clearWarning = () => {
    setIsWarning(false);
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  };

  const triggerWarning = () => {
    setIsWarning(true);
    warningTimerRef.current = setTimeout(() => {
      setIsWarning(false);
      warningTimerRef.current = null;
    }, 3000);
  };

  const handleBack = () => {
    if (!isDirty) {
      navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
      return;
    }

    if (isWarning) {
      clearWarning();
      navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
    } else {
      triggerWarning();
    }
  };

  // ESC → 뒤로가기 처리
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (!isDirty) {
        navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
        return;
      }

      if (isWarning) {
        clearWarning();
        navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
      } else {
        triggerWarning();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isDirty, isWarning, navigate, projectId, meetingId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-zinc-100">
      {/* Header */}
      <SummaryEditorHeader
        onBack={handleBack}
        onSave={handleSave}
        isDirty={isDirty}
        isWarning={isWarning}
      />

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        <MarkdownEditorPanel
          value={summaryText}
          onChange={setSummaryText}
          isLoading={isLoading}
        />
        <MarkdownPreviewPanel value={summaryText} isLoading={isLoading} />
      </div>
    </div>
  );
}
