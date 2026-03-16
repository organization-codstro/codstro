import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectBasicInfo } from "../../types/common/projectPlanning";
import { ProjectChatHeader } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatHeader";
import { ProjectChatMessage } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatMessage";
import { ProjectChatInput } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatInput";
import { ProjectCreateChatService } from "../../api/ProjectPlanning/ProjectCreateChatPage";

export default function ProjectCreateChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. 초기 데이터 및 상태 설정
  const { basicInfo, projectId } = (location.state ?? {}) as {
    basicInfo?: ProjectBasicInfo;
    projectId?: string;
  };

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 스크롤 하단 이동 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 2. 생명주기 (useEffect): 초기 데이터 로드 및 첫 인사 생성
  useEffect(() => {
    if (!projectId || !basicInfo) {
      toast.error("필수 정보가 누락되었습니다.");
      navigate("/projects/new", { replace: true });
      return;
    }

    const initChat = async () => {
      try {
        setIsLoading(true);
        // 1) 기존 대화 내역 확인
        const history = await ProjectCreateChatService.getChatHistory({
          projectId,
        });

        if (history && history.length > 0) {
          setMessages(history);
        } else {
          // 2) 내역이 없으면 기초 정보를 바탕으로 첫 AI 메시지 생성 및 저장
          const topic = basicInfo.project_topic || "your idea";
          const features = basicInfo.desired_features
            ? `You mentioned: ${basicInfo.desired_features}. `
            : "";
          const initialMessage = `I see you want to create a project about "${topic}". ${features}Let's discuss this further!`;

          const savedMsg = await ProjectCreateChatService.saveChatMessage({
            projectId,
            sender: "AI",
            message: initialMessage,
            meetingIndex: 1,
          });
          setMessages([savedMsg]);
        }
      } catch (error) {
        toast.error("채팅 내역을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    initChat();
  }, [projectId, basicInfo, navigate]);

  // 3. 메시지 전송 및 AI 응답 처리
  const handleSend = async () => {
    if (!input.trim() || isSending || !projectId) return;

    const userText = input;
    setInput("");
    setIsSending(true);

    try {
      // 1) 유저 메시지 DB 저장 및 UI 반영
      const savedUserMsg = await ProjectCreateChatService.saveChatMessage({
        projectId,
        sender: "USER",
        message: userText,
        meetingIndex: 1,
      });
      setMessages((prev) => [...prev, savedUserMsg]);
      setTimeout(scrollToBottom, 50);

      // 2) AI 응답 생성 (Toast 연동)
      const toastId = toast.loading("AI가 기획안을 분석 중입니다...");

      const aiResponse = await ProjectCreateChatService.getAiResponse({
        projectId,
        userMessage: userText,
        history: messages, // 맥락 전달
      });

      // 3) AI 메시지 UI 반영
      setMessages((prev) => [...prev, aiResponse]);

      toast.update(toastId, {
        render: "분석 완료!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    } catch (error) {
      toast.error("응답 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSending(false);
      setTimeout(scrollToBottom, 50);
    }
  };

  const handleNext = () => {
    navigate("/projects/new/info", {
      state: { basicInfo, projectId },
      replace: true,
    });
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
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
      <ProjectChatHeader />

      <div className="flex-1 overflow-auto" ref={scrollRef}>
        <div className="max-w-4xl p-8 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <ProjectChatMessage
              key={msg.project_planning_log_id || idx}
              sender={msg.project_meeting_log_sender}
              message={msg.project_meeting_log_message}
            />
          ))}
        </div>
      </div>

      <ProjectChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        onNext={handleNext}
        onBack={handleBack}
        disabled={isSending} // 전송 중 비활성화 추가
      />
    </div>
  );
}
