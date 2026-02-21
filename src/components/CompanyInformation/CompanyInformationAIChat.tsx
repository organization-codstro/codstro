import { X, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CompanyInformationAIChatProps } from "../../types/pages/CompanyInformation/CompanyInformationAIChat";
import { BasicConceptDetailService } from "../../api/Concepts/BasicConceptDetailPage";
import { CompanyInformationAIChatMessage } from "../../types/common/companyInformation";

export default function CompanyInformationAIChat({
  isOpen,
  onClose,
  conceptName,
}: CompanyInformationAIChatProps) {
  const [messages, setMessages] = useState<CompanyInformationAIChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: `안녕하세요! ${conceptName}에 대해 궁금한 점이 있으신가요? 무엇이든 물어보세요.`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userQuestion = inputValue.trim();
    const userMessage: CompanyInformationAIChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userQuestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // API 호출: Gemini Assistant 연동
      const aiResponse = await BasicConceptDetailService.askAIChat({
        conceptName,
        userQuestion,
      });

      const aiMessage: CompanyInformationAIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("AI 응답을 가져오지 못했습니다.");
      const errorMessage: CompanyInformationAIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-black bg-opacity-30"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
              <p className="mt-1 text-sm text-gray-600">
                Learning about {conceptName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-gray-100 rounded-lg rounded-bl-none">
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="질문을 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="flex items-center justify-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
