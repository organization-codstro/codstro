import { File, Send } from "lucide-react";
import { ChatInputProps } from "../../../types/pages/AiChat/ChatConversation/ChatInput";
import { useRef, useState } from "react";

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  replyingTo,
  setReplyingTo,
  images,
  setImages,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const personas = ["Luna", "Atlas", "Nova"];

  const [showMention, setShowMention] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPersonas = personas.filter((p) =>
    p.toLowerCase().includes(mentionQuery.toLowerCase()),
  );

  // textarea 자동 높이
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    const maxHeight = 24 * 7; // lineHeight * 7줄

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

    // TODO: 서버 업로드 연결
  };

  return (
    <div className="border-t bg-white relative flex-shrink-0">
      {/* Reply preview */}
      {replyingTo && (
        <div className="px-4 py-2 bg-gray-100 border-l-4 border-blue-500 flex justify-between items-start">
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
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-100 rounded-lg text-gray-600 p-2">
                    <span className="text-2xl">📄</span>

                    <span className="truncate w-full text-center text-xs mt-1">
                      {file.name}
                    </span>
                  </div>
                )}

                <button
                  className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded"
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
        <div className="absolute bottom-16 left-3 bg-white border rounded-lg shadow-lg w-40 z-10">
          {filteredPersonas.map((p, index) => (
            <div
              key={p}
              className={`px-3 py-2 cursor-pointer ${
                index === selectedIndex ? "bg-blue-100" : ""
              }`}
              onClick={() => selectMention(p)}
            >
              @{p}
            </div>
          ))}
        </div>
      )}

      {/* Input 영역 */}
      <div className="flex items-end gap-2 p-3 mb-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          className="text-gray-500 hover:text-gray-700 mt-2"
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

        <button
          onClick={onSend}
          disabled={disabled}
          className="bg-blue-500 text-white px-3 py-[10px] rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
