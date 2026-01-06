import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Save, FileText, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Message {
  sender: "AI" | "USER";
  message: string;
  timestamp: string;
}

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
    // TODO: 회의 저장 API
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
              className="px-3 py-1 text-sm border rounded"
            >
              취소
            </button>
            <button
              onClick={() => {
                closeToast();
                // TODO: 회의 삭제 API
                toast.success("회의가 삭제되었습니다.", {
                  position: "top-right",
                });
                navigate("/projects/meetings");
              }}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded"
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
      {/* Header */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/projects/meetings")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Project Meeting
              </h1>
              <p className="text-sm text-gray-600">Meeting #{meetingId}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleViewMaterials}
              className="flex items-center px-4 py-2 space-x-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" />
              <span>Materials</span>
            </button>
            <button
              onClick={handleSaveMeeting}
              className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg"
              style={{ backgroundColor: "#587CF0" }}
            >
              <Save className="w-4 h-4" />
              <span>Save Meeting</span>
            </button>
            <button
              onClick={handleEndMeeting}
              className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg"
              style={{ backgroundColor: "#587CF0" }}
            >
              <LogOut className="w-4 h-4" />
              <span>End Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl p-6 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl ${
                  msg.sender === "USER" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block px-6 py-4 rounded-2xl ${
                    msg.sender === "USER"
                      ? "text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                  style={
                    msg.sender === "USER" ? { backgroundColor: "#587CF0" } : {}
                  }
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <p className="px-2 mt-1 text-xs text-gray-500">
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex items-center max-w-6xl mx-auto space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleSend}
            className="p-3 text-white rounded-full hover:opacity-90"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
