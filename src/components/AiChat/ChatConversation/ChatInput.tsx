import { File, Send } from "lucide-react";
import { ChatInputProps } from "../../../types/pages/AiChat/ChatConversation/ChatInput";
import { useRef, useState } from "react";
import { MessageMode } from "../../../constants/AiChat/aiChat";

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  replyingTo,
  setReplyingTo,
  images,
  setImages,
  personas,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [messageMode, setMessageMode] = useState<MessageMode>("CASUAL");

  const [showMention, setShowMention] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPersonas = personas
    .map((p) => p.ai_persona_name)
    .filter((name) => name.toLowerCase().includes(mentionQuery.toLowerCase()));

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    const maxHeight = 24 * 7;
    el.style.height = "auto";
    if (el.scrollHeight > maxHeight) {
      el.style.height = maxHeight + "px";
      el.style.overflowY = "auto";
    } else {
      el.style.height = el.scrollHeight + "px";
      el.style.overflowY = "hidden";
    }
  };

  const handleChange = (text: string) => {
    onChange(text);
    resizeTextarea();
    const match = text.match(/@(\w*)$/);
    if (match) {
      setShowMention(true);
      setMentionQuery(match[1]);
    } else {
      setShowMention(false);
    }
  };

  const selectMention = (name: string) => {
    const newText = value.replace(/@\w*$/, `@${name} `);
    onChange(newText);
    setShowMention(false);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.altKey && e.key === "m") {
      e.preventDefault();
      setMessageMode((prev) =>
        prev === "CASUAL" ? "ACTION_REQUEST" : "CASUAL",
      );
      return;
    }

    // 멘션 자동완성 키 처리
    if (showMention && filteredPersonas.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredPersonas.length - 1),
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        selectMention(filteredPersonas[selectedIndex]);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSend = () => {
    //onSend(messageMode);  messageMode를 같이 넘겨줌
  };

  return (
    <div className="relative flex-shrink-0 bg-white border-t">
      {/* Reply preview */}
      {replyingTo && (
        <div className="flex items-start justify-between px-4 py-2 bg-gray-100 border-l-4 border-blue-500">
          <div>
            <p className="text-xs text-gray-500">Replying to:</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {replyingTo.chat_message_content}
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setReplyingTo(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* 파일 preview */}
      {images.length > 0 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {images.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            return (
              <div key={index} className="relative">
                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-20 h-20 p-2 text-gray-600 bg-gray-100 rounded-lg">
                    <span className="text-2xl">📄</span>
                    <span className="w-full mt-1 text-xs text-center truncate">
                      {file.name}
                    </span>
                  </div>
                )}
                <button
                  className="absolute top-0 right-0 px-1 text-xs text-white bg-black bg-opacity-50 rounded"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 멘션 자동완성 */}
      {showMention && filteredPersonas.length > 0 && (
        <div className="absolute z-10 w-40 bg-white border rounded-lg shadow-lg bottom-16 left-3">
          {filteredPersonas.map((p, index) => (
            <div
              key={p}
              className={`px-3 py-2 cursor-pointer ${index === selectedIndex ? "bg-blue-100" : ""}`}
              onClick={() => selectMention(p)}
            >
              @{p}
            </div>
          ))}
        </div>
      )}

      {/* Input 영역 */}
      <div className="flex items-end gap-2 p-3 mb-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          className="mt-2 mt-3 mb-3 text-gray-500 hover:text-gray-700"
          onClick={() => fileInputRef.current?.click()}
        >
          <File className="w-5 h-5" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="메시지를 입력하세요..."
          className="flex-1 resize-none border rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            min-h-[40px] max-h-[168px] overflow-y-auto leading-6"
          rows={1}
        />

        <div
          className="relative flex items-center rounded-full border-2 border-blue-500 cursor-pointer select-none overflow-hidden shrink-0"
          style={{ height: "40px" }}
          onClick={() =>
            setMessageMode((prev) =>
              prev === "CASUAL" ? "ACTION_REQUEST" : "CASUAL",
            )
          }
        >
          {/* 슬라이딩 배경 */}
          <div
            className="absolute top-0 bottom-0 rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{
              left: messageMode === "CASUAL" ? "0%" : "35%",
              width: messageMode === "CASUAL" ? "35%" : "100%",
            }}
          />

          {/* CASUAL 탭 */}
          <span
            className="relative z-10 px-4 py-1 text-xs font-bold transition-colors duration-300 whitespace-nowrap"
            style={{
              color: messageMode === "CASUAL" ? "white" : "#3B82F6",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            CASUAL
          </span>

          {/* ACTION_REQUEST 탭 */}
          <span
            className="relative z-10 px-4 py-1 text-xs font-bold transition-colors duration-300 whitespace-nowrap"
            style={{
              color: messageMode === "ACTION_REQUEST" ? "white" : "#3B82F6",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            ACTION_REQUEST
          </span>
        </div>
        <button
          onClick={handleSend}
          disabled={disabled}
          className="bg-blue-500 text-white px-3 py-[10px] rounded-lg hover:bg-blue-600 disabled:opacity-50 shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
