import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectBasicInfo } from "../../types/pages/ProjectPlanning/project";
import { ProjectChatHeader } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatHeader";
import { ProjectChatMessage } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatMessage";
import { ProjectChatInput } from "../../components/ProjectPlanning/ProjectCreateChatPage/ProjectChatInput";

export default function ProjectCreateChat() {
  const navigate = useNavigate();
  const location = useLocation();

  const basicInfo = (location.state as { basicInfo?: ProjectBasicInfo })
    ?.basicInfo;

  const [messages, setMessages] = useState<
    Array<{ sender: string; message: string }>
  >([
    {
      sender: "AI",
      message:
        "Hello! I'm here to help you plan your project. What kind of project do you want to create?",
    },
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    // 기초 정보가 없으면 첫 단계로 리다이렉트
    if (!basicInfo) {
      navigate("/projects/new", { replace: true });
      return;
    }

    // 기초 정보를 바탕으로 초기 메시지 설정
    if (basicInfo.project_topic || basicInfo.desired_features) {
      const topic = basicInfo.project_topic || "your idea";
      const features = basicInfo.desired_features
        ? `You mentioned features like: ${basicInfo.desired_features}. `
        : "";
      const initialMessage = `I see you want to create a project about "${topic}". ${features}Let's discuss this further and refine your project plan!`;

      setMessages([
        {
          sender: "AI",
          message: initialMessage,
        },
      ]);
    }
  }, [basicInfo, navigate]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "USER", message: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // AI 응답 시뮬레이션
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          message:
            "That sounds interesting! Can you tell me more about the main features you envision?",
        },
      ]);
    }, 500);
  };

  const handleNext = () => {
    navigate("/projects/new/info", {
      state: {
        basicInfo,
        chatHistory: messages,
      },
      replace: true,
    });
  };

  const handleBack = () => {
    // todo: 단계 저장 API 연결
    navigate("/projects");
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
      <ProjectChatHeader />

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl p-8 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <ProjectChatMessage
              key={`msg-${idx}-${msg.sender}`}
              sender={msg.sender}
              message={msg.message}
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
      />
    </div>
  );
}
