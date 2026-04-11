import { useState } from "react";
import { X, Send, Loader2, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { ConceptsService } from "../../../api/Concept/Concepts";
import { CompanyInformationAIChatMessage } from "../../../types/common/CompanyInformation";
import { CompanyInformationAIChatProps } from "../../../types/pages/CompanyInformation/CompanyInformationAIChat";

export default function CompanyInformationAIChat({
  isOpen,
  onClose,
  conceptName,
  conceptId,
}: CompanyInformationAIChatProps) {
  const [messages, setMessages] = useState<CompanyInformationAIChatMessage[]>([
    {
      id: "1",
      sender: "AI",
      text: `안녕하세요! ${conceptName}에 대해 궁금한 점이 있으신가요? 무엇이든 물어보세요.`,
      timestamp: new Date(),
      sources: [],
    },
  ]);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userQuestion = inputValue.trim();

    const userMessage: CompanyInformationAIChatMessage = {
      id: Date.now().toString(),
      sender: "USER",
      text: userQuestion,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const updatedHistory: { role: "user" | "assistant"; content: string }[] = [
      ...chatHistory,
      { role: "user", content: userQuestion },
    ];

    try {
      const { reply, sources } = await ConceptsService.askChat({
        concept_id: conceptId,
        messages: updatedHistory,
      });

      setChatHistory([
        ...updatedHistory,
        { role: "assistant", content: reply },
      ]);

      const aiMessage: CompanyInformationAIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "AI",
        text: reply,
        timestamp: new Date(),
        sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("AI 응답을 가져오지 못했습니다.");
      const errorMessage: CompanyInformationAIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "AI",
        text: "죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.",
        timestamp: new Date(),
        sources: [],
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
          {/* 헤더 */}
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

          {/* 메시지 목록 */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === "USER" ? "items-end" : "items-start"
                }`}
              >
                {/* 말풍선 */}
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.sender === "USER"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "USER"
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

                {/* 소스 카드 - AI 메시지이고 sources가 있을 때만 렌더링 */}
                {message.sender === "AI" &&
                  message.sources &&
                  message.sources.length > 0 && (
                    <div className="w-full max-w-xs mt-2 space-y-2">
                      {message.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 group"
                        >
                          {/* 파비콘 */}
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${new URL(source.url).hostname}&sz=32`}
                            alt=""
                            className="flex-shrink-0 w-5 h-5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate transition-colors group-hover:text-blue-600">
                              {source.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {new URL(source.url).hostname}
                            </p>
                          </div>
                          <ExternalLink className="flex-shrink-0 w-3 h-3 text-gray-400 transition-colors group-hover:text-blue-500" />
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* 로딩 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-gray-100 rounded-lg rounded-bl-none">
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* 입력창 */}
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
