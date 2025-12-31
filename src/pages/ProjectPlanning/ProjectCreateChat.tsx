import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectCreateChat() {
  const navigate = useNavigate();

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

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "USER", message: input }];

    setMessages(newMessages);
    setInput("");

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
        chatHistory: messages,
      },
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Project
          </h1>
          <p className="mt-1 text-gray-600">
            Step 1: Discuss your project idea with AI
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl p-8 mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl ${
                  msg.sender === "USER"
                    ? "text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
                style={
                  msg.sender === "USER" ? { backgroundColor: "#587CF0" } : {}
                }
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4 space-x-4">
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
              className="p-3 text-white transition-all rounded-full hover:opacity-90"
              style={{ backgroundColor: "#587CF0" }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/projects")}
              className="px-6 py-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 space-x-2 font-medium text-white rounded-lg"
              style={{ backgroundColor: "#587CF0" }}
            >
              <span>Next: Generate Project Info</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
