import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { ArrowLeft, Save } from "lucide-react";
import { SummaryEditorService } from "../../api/ProjectPlanning/SummaryEditorPage";

export default function SummaryEditorPage() {
  const { projectId, meetingId } = useParams<{
    projectId: string;
    meetingId: string;
  }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [summaryId, setSummaryId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState("");

  // ESC 누르면 뒤로
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate, projectId, meetingId]);

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
        }
      } catch (error) {
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [meetingId]);

  // 저장
  const handleSave = async () => {
    if (!meetingId || !summaryId) return;

    const toastId = toast.loading("저장 중입니다...");
    try {
      await SummaryEditorService.updateMeetingSummary({
        summaryId,
        summaryText,
      });
      toast.update(toastId, {
        render: "성공적으로 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      navigate(`/projects/${projectId}/meetings/${meetingId}`);
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate(`/projects/${projectId}/meetings/${meetingId}/materials`)
            }
            className="text-gray-400 hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Summary Editor
            </h1>
            <p className="text-sm text-gray-500">Edit meeting summary</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "#587CF0" }}
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Monaco Editor */}
        <div className="flex flex-col w-1/2 border-r border-gray-200">
          <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Markdown
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={summaryText}
              onChange={(value) => setSummaryText(value || "")}
              theme="vs" // ← vs-dark → vs (흰색 테마)
              options={{
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col w-1/2 bg-white border-l border-gray-200">
          <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Preview
          </div>
          <div className="flex-1 p-8 overflow-auto">
            {summaryText ? (
              <div className="prose-sm prose text-gray-700 max-w-none">
                <ReactMarkdown>{summaryText}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                마크다운을 입력하면 미리보기가 표시됩니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
