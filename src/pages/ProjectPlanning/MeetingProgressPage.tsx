import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectMessage } from "../../types/common/projectPlanning";
import { MeetingChatHeader } from "../../components/ProjectPlanning/MeetingProgressPage/MeetingChatHeader";
import { ChatMessage } from "../../components/ProjectPlanning/MeetingProgressPage/ChatMessage";
import { MeetingProgressService } from "../../api/ProjectPlanning/MeetingProgressPage";
import { ChatInput } from "../../components/ProjectPlanning/MeetingProgressPage/ChatInput";

export default function MeetingProgressPage() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. 상태 관리
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [meetingIndex, setMeetingIndex] = useState(1); // 회차 관리

  // 스크롤 하단 이동
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 2. 초기 데이터 로드 (useEffect)
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!meetingId) return;
      try {
        setIsLoading(true);
        const data = await MeetingProgressService.getChatMessages({
          roomId: meetingId,
        });

        // DB 데이터를 UI 메시지 포맷으로 변환
        const formattedMessages: ProjectMessage[] = data.map((log: any) => ({
          sender: log.project_tasks_log_sender,
          message: log.project_tasks_log_message,
          create_at: new Date(
            log.project_tasks_log_created_at,
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formattedMessages);
        if (data.length > 0) {
          setMeetingIndex(data[0].project_tasks_log_meeting_index || 1);
        }
      } catch (error) {
        toast.error("대화 내역을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchChatHistory();
  }, [meetingId]);

  // 3. 메시지 전송 및 AI 응답 처리
  const handleSend = async () => {
    if (!input.trim() || isSending || !meetingId) return;

    setIsSending(true);
    const userText = input;
    setInput("");

    try {
      // 1) 유저 메시지 저장
      await MeetingProgressService.saveMessage({
        roomId: meetingId,
        sender: "USER",
        message: userText,
        meetingIndex: meetingIndex,
      });

      // UI 즉시 반영
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { sender: "USER", message: userText, create_at: now },
      ]);
      setTimeout(scrollToBottom, 50);

      // 2) AI 응답 대기 (Toast Loading)
      const toastId = toast.loading("AI가 답변을 생각하고 있습니다...");

      const aiResponse = await MeetingProgressService.getAiResponse({
        roomId: meetingId,
        userMessage: userText,
        meetingIndex: meetingIndex,
      });

      // UI에 AI 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          message: aiResponse.project_tasks_log_message,
          create_at: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      toast.update(toastId, {
        render: "답변이 도착했습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    } catch (error) {
      toast.error("메시지 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
      setTimeout(scrollToBottom, 50);
    }
  };

  const handleViewMaterials = () => {
    navigate(`/projects/meetings/${meetingId}/materials`);
  };

  const handleSaveMeeting = async () => {
    if (!meetingId) return;
    try {
      await MeetingProgressService.incrementMeetingIndex({
        roomId: meetingId,
        currentIndex: meetingIndex,
      });
      toast.success("회의 상태가 저장되었습니다.");
    } catch (error) {
      toast.error("저장 중 오류가 발생했습니다.");
    }
  };

  // 4. 회의 삭제 (Pending UI 적용)
  const handleEndMeeting = () => {
    toast(
      ({ closeToast }) => (
        <div className="p-1">
          <p className="mb-2 font-bold text-gray-800">
            회의를 완전히 삭제할까요?
          </p>
          <p className="mb-4 text-xs text-gray-500">
            이 작업은 되돌릴 수 없으며 모든 로그가 삭제됩니다.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="px-3 py-1.5 text-xs font-medium border rounded-md hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={async () => {
                closeToast();
                if (!meetingId) return;
                const tid = toast.loading("회의 정보를 삭제 중...");
                try {
                  await MeetingProgressService.deleteMeeting({
                    roomId: meetingId,
                  });
                  toast.update(tid, {
                    render: "회의가 삭제되었습니다.",
                    type: "success",
                    isLoading: false,
                    autoClose: 500,
                  });
                  navigate("/projects/meetings");
                } catch (e) {
                  toast.update(tid, {
                    render: "삭제 실패",
                    type: "error",
                    isLoading: false,
                    autoClose: 500,
                  });
                }
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              삭제 확정
            </button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, closeOnClick: false },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Chat...
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-50">
      <MeetingChatHeader
        meetingId={meetingId}
        onBack={() => navigate("/projects/meetings")}
        onViewMaterials={handleViewMaterials}
        onSave={handleSaveMeeting}
        onEnd={handleEndMeeting}
      />

      <div className="flex-1 overflow-auto" ref={scrollRef}>
        <div className="max-w-6xl p-6 mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="mt-20 text-center text-gray-400">
              대화 내용이 없습니다. 먼저 인사를 건네보세요!
            </div>
          ) : (
            messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
          )}
        </div>
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isSending}
      />
    </div>
  );
}
