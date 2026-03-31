import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../db/supabase/supabase";
import { ProjectBasicInfo } from "../../types/common/ProjectPlanning";
import { ProjectChatHeader } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatHeader";
import { ProjectChatMessage } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatMessage";
import { ProjectChatInput } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatInput";
import { ProjectCreateChatService } from "../../api/ProjectPlanning/ProjectCreateChatPage";

export default function ProjectCreateChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { basicInfo, projectId } = (location.state ?? {}) as {
    basicInfo?: ProjectBasicInfo;
    projectId?: string;
  };

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // ─── 초기 로드 + 실시간 구독 ──────────────────────────────────────────────
  useEffect(() => {
    if (!projectId) {
      toast.error("필수 정보가 누락되었습니다.");
      navigate("/projects/new", { replace: true });
      return;
    }

    let cancelled = false;
    let subscription: ReturnType<typeof supabase.channel> | null = null;

    const initChat = async () => {
      try {
        setIsLoading(true);
        const history = await ProjectCreateChatService.getChatHistory({
          projectId,
        });

        if (cancelled) return;

        setMessages(history);
      } catch {
        toast.error("채팅 내역을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setTimeout(scrollToBottom, 100);
        }
      }
    };

    const subscribeToMessages = () => {
      const channel = supabase
        .channel(`room_messages_${projectId}_${Date.now()}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "project_planning_logs",
          },
          (payload) => {
            const newMsg = payload.new as any;

            if (newMsg.project_id !== projectId) return;

            if (newMsg.project_planning_log_sender !== "USER") {
              setIsAiTyping(false);
              setIsSending(false);
            }

            setMessages((prev) => {
              const exists = prev.some(
                (m) =>
                  m.project_planning_log_id === newMsg.project_planning_log_id,
              );
              if (exists) return prev;
              return [...prev, newMsg];
            });

            setTimeout(scrollToBottom, 50);
          },
        )
        .subscribe();

      return channel;
    };

    initChat().then(() => {
      if (!cancelled) {
        subscription = subscribeToMessages();
      }
    });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [projectId, navigate]);

  // ─── 메시지 전송 ──────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || isSending || !projectId) return;

    const userText = input.trim();
    setInput("");
    setIsSending(true);
    setIsAiTyping(true);

    try {
      await ProjectCreateChatService.saveChatMessage({
        projectId,
        sender: "USER",
        message: userText,
        meetingIndex: messages.length + 1,
      });

      ProjectCreateChatService.requestAiResponse({ projectId });
    } catch {
      toast.error("메시지 전송 중 오류가 발생했습니다.");
      setIsSending(false);
      setIsAiTyping(false);
    }
  };

  const handleNext = async () => {
    if (!projectId || isGenerating) return;

    setIsGenerating(true);

    const toastId = toast.loading("프로젝트 정보를 생성 중입니다...");

    try {
      const result = await ProjectCreateChatService.generateProjectInfo({
        projectId,
      });

      toast.update(toastId, {
        render: "프로젝트 정보 생성 완료",
        type: "success",
        isLoading: false,
        autoClose: 800,
      });

      navigate("/projects/new/info", {
        state: {
          projectId,
          todos: result.todos,
        },
        replace: true,
      });
    } catch (e) {
      toast.update(toastId, {
        render: "프로젝트 정보 생성 실패",
        type: "error",
        isLoading: false,
        autoClose: 800,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = async () => {
    if (projectId) {
      await ProjectCreateChatService.pausePlanning({ projectId });
    }
    navigate("/projects");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Chat...
      </div>
    );
  }

  return (
    // ★ h-screen + overflow-hidden 으로 전체 높이를 화면에 고정
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <ProjectChatHeader />

      {/* ★ flex-1 + overflow-y-auto 로 이 영역만 스크롤 */}
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="max-w-4xl p-8 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <ProjectChatMessage
              key={msg.project_planning_log_id || idx}
              sender={msg.project_planning_log_sender}
              message={msg.project_planning_log_message}
            />
          ))}

          {/* AI 입력 중 표시 */}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="px-6 py-4 bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ★ 하단 입력 영역은 flex-shrink-0 으로 고정 */}
      <div className="flex-shrink-0">
        <ProjectChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onNext={handleNext}
          onBack={handleBack}
          disabled={isSending || isGenerating}
        />
      </div>
    </div>
  );
}
