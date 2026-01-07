import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Message } from "../../types/ProjectPlanning/project";
import { MeetingChatHeader } from "../../components/ProjectPlanning/MeetingProgressPage/MeetingChatHeader";
import { ChatMessage } from "../../components/ProjectPlanning/MeetingProgressPage/ChatMessage";
import { ChatInput } from "../../components/AiChat/ChatConversation/ChatInput";

export default function MeetingProgress() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      message:
        "Hello! Let's discuss your project. What would you like to talk about?",
      timestamp: "10:00",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) {
      toast.warning("메시지를 입력해주세요.", { position: "top-right" });
      return;
    }

    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      sender: "USER",
      message: input,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // AI 응답 시뮬레이션
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          message:
            "That's an interesting point. Let me help you explore this further.",
          timestamp: now,
        },
      ]);
    }, 500);
  };

  const handleViewMaterials = () => {
    navigate(`/projects/meetings/${meetingId}/materials`);
  };

  const handleSaveMeeting = () => {
    // TODO: 회의 저장 API 호출 로직
    toast.success("회의가 저장되었습니다.", {
      position: "top-right",
    });
  };

  const handleEndMeeting = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-3 font-semibold">회의를 삭제하시겠습니까?</p>
          <p className="mb-4 text-sm text-gray-600">
            관련된 모든 정보가 삭제됩니다.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                closeToast();
                toast.info("회의 삭제가 취소되었습니다.", {
                  position: "top-right",
                });
              }}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={() => {
                closeToast();
                // TODO: 회의 삭제 API 호출 로직
                toast.success("회의가 삭제되었습니다.", {
                  position: "top-right",
                });
                navigate("/projects/meetings");
              }}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-50">
      <MeetingChatHeader
        meetingId={meetingId}
        onBack={() => navigate("/projects/meetings")}
        onViewMaterials={handleViewMaterials}
        onSave={handleSaveMeeting}
        onEnd={handleEndMeeting}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl p-6 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
        </div>
      </div>

      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
