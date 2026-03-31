import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectMessage } from "../../types/common/ProjectPlanning";
import { MeetingChatHeader } from "../../components/ProjectPlanning/MeetingProgressPage/MeetingChatHeader";
import { ChatMessage } from "../../components/ProjectPlanning/MeetingProgressPage/ChatMessage";
import { MeetingProgressService } from "../../api/ProjectPlanning/MeetingProgressPage";
import { ChatInput } from "../../components/ProjectPlanning/MeetingProgressPage/ChatInput";
import { supabase } from "../../db/supabase/supabase";

export default function MeetingProgressPage() {
  const { projectId, meetingId } = useParams<{
    projectId: string;
    meetingId: string;
  }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [meetingIndex, setMeetingIndex] = useState(1);

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

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 초기 데이터 로드 + 구독
  useEffect(() => {
    if (!meetingId) return;
    let cancelled = false;
    let subscription: ReturnType<typeof supabase.channel> | null = null;
    let typingSubscription: ReturnType<typeof supabase.channel> | null = null;

    const initChat = async () => {
      setIsLoading(true);
      try {
        const data = await MeetingProgressService.getChatMessages({
          roomId: meetingId,
        });

        const formattedMessages: ProjectMessage[] = data.map((log: any) => ({
          sender: log.project_meeting_log_sender,
          message: log.project_meeting_log_message,
          create_at: new Date(log.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        if (data.length > 0) {
          setMeetingIndex(data[0].project_meeting_log_meeting_index || 1);
        }

        if (cancelled) return;

        setMessages(formattedMessages);
        setTimeout(scrollToBottom, 100);

        subscription = supabase
          .channel(`room_messages_${meetingId}_${Date.now()}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "project_meeting_logs",
              filter: `project_meeting_room_id=eq.${meetingId}`,
            },
            (payload) => {
              const log = payload.new;
              if (log.project_meeting_log_sender !== "AI") return;

              const newMessage: ProjectMessage = {
                sender: log.project_meeting_log_sender,
                message: log.project_meeting_log_message,
                create_at: new Date(log.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              setMessages((prev) => [...prev, newMessage]);
              setTimeout(scrollToBottom, 50);
            },
          )
          .subscribe((status, err) => {
            if (err) console.error("[messages] error:", err);
          });

        typingSubscription = supabase
          .channel(`room_typing_${meetingId}`)
          .on("broadcast", { event: "typing_start" }, () => {
            setIsAiTyping(true);
            setTimeout(scrollToBottom, 50);
          })
          .on("broadcast", { event: "typing_end" }, () => {
            setIsAiTyping(false);
          })
          .subscribe((_, err) => {
            if (err) console.error("[typing] error:", err);
          });
      } catch {
        toast.error("대화 내역을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
      typingSubscription?.unsubscribe();
    };
  }, [meetingId]);

  const handleSend = async () => {
    if (!input.trim() || isSending || !meetingId) return;

    setIsSending(true);
    const userText = input;
    setInput("");

    try {
      // 1. 유저 메시지 DB 저장
      await MeetingProgressService.saveMessage({
        roomId: meetingId,
        sender: "USER",
        message: userText,
        meetingIndex,
      });

      // 2. UI 즉시 반영
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { sender: "USER", message: userText, create_at: now },
      ]);
      setTimeout(scrollToBottom, 50);

      // 3. Edge Function 호출 (fire & forget)
      MeetingProgressService.requestAiResponse({ roomId: meetingId });
    } catch {
      toast.error("메시지 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  const handleViewMaterials = () => {
    navigate(`/projects/${projectId}/meetings/${meetingId}/materials`);
  };

  const handleSaveMeeting = async () => {
    if (!meetingId) return;
    const tid = toast.loading("회의를 요약하고 저장 중입니다...");
    try {
      const result = await MeetingProgressService.saveMeetingSummary({
        roomId: meetingId,
      });

      // Edge Function이 index를 올렸으니 로컬 상태도 동기화
      setMeetingIndex(result.new_index);

      toast.update(tid, {
        render: "회의가 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err: any) {
      toast.update(tid, {
        render: err?.message ?? "저장 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleEndMeeting = async () => {
    if (!meetingId) return;
    const tid = toast.loading("회의 정보를 삭제 중...");
    try {
      await MeetingProgressService.deleteMeeting({ roomId: meetingId });
      toast.update(tid, {
        render: "회의가 삭제되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      navigate(`/projects/${projectId}/meetings`);
    } catch {
      toast.update(tid, {
        render: "삭제 실패",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
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
        onBack={() => navigate(`/projects/${projectId}/meetings`)}
        onViewMaterials={handleViewMaterials}
        onSave={handleSaveMeeting}
        onEnd={handleEndMeeting}
      />

      <div className="flex-1 overflow-auto" ref={scrollRef}>
        <div className="max-w-6xl p-6 mx-auto space-y-4">
          {messages.length === 0 && !isAiTyping ? (
            <div className="mt-20 text-center text-gray-400">
              대화 내용이 없습니다.
            </div>
          ) : (
            messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
          )}
          {isAiTyping && (
            <div className="flex items-center px-2 space-x-2 text-sm text-gray-400">
              <span className="animate-bounce">●</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                ●
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ●
              </span>
              <span className="ml-2">AI가 입력 중...</span>
            </div>
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
