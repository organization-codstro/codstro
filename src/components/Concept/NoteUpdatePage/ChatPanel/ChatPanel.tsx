/**
 * ChatPanel.tsx
 *
 * AI와 대화하는 채팅 패널.
 *
 * 동작:
 *  - chatOpen이 true일 때 오른쪽에서 슬라이드인 (flex-1, max-width 트랜지션)
 *  - chatOpen이 false일 때 max-width: 0으로 슬라이드아웃 (overflow hidden)
 *  - 메시지 목록은 1회성(메모리 only). DB 저장 없음
 *  - 새 메시지 도착 시 자동 스크롤
 *  - isLoading 중: textarea + 전송버튼 disabled, 타이핑 인디케이터 표시
 *  - 입력창 최대 5줄 (max-height: 126px = 22px * 5줄 + 16px 패딩)
 *  - Enter → 전송 / Shift+Enter → 줄바꿈
 *
 * AI 수정 제안 (pendingNote):
 *  - pendingNote가 있으면 채팅창 상단에 diff 뷰 + 수락/거절 배너 표시
 *  - diff: 추가 줄(초록), 제거 줄(빨강), 변경 없는 줄(기본) 라인 단위 표시
 *  - 수락 → onAccept() 호출 → 에디터에 반영
 *  - 거절 → onReject() 호출 → 제안 폐기
 */

import { useEffect, useRef } from "react";
import { Send, MessageSquare } from "lucide-react";
import { ChatPanelProps } from "../../../../types/pages/Concept/NoteUpdatePage/ChatPanel/ChatPanel";
import {PendingNoteBanner} from "./PendingNoteBanner/PendingNoteBanner";

export const ChatPanel = ({
  chatOpen,
  messages,
  inputValue,
  setInputValue,
  isLoading,
  onSend,
  pendingNote,
  currentMarkdown,
  onAccept,
  onReject,
}: ChatPanelProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 새 메시지 도착 시 하단 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // textarea 높이 자동 조절 (최대 5줄)
  // 빈 값이면 38px로 명시 리셋하여 초기 5줄 문제 방지
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    if (!inputValue) {
      el.style.height = "38px";
      return;
    }
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 22 * 5 + 16) + "px";
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        chatOpen
          ? "flex-1 opacity-100 translate-x-0 pointer-events-auto"
          : "flex-[0] max-w-0 opacity-0 translate-x-10 pointer-events-none"
      }`}
    >
      {/* 패널 레이블 */}
      <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        CHAT
      </div>

      {/* 수락/거절 배너 — pendingNote 있을 때만 */}
      {pendingNote && (
        <PendingNoteBanner
          currentMarkdown={currentMarkdown}
          pendingNote={pendingNote}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}

      {/* 메시지 목록 */}
      <div className="flex flex-col flex-1 gap-3 px-5 pt-5 pb-2 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 px-5 py-10 text-center text-zinc-400">
            <div className="flex items-center justify-center rounded-full w-11 h-11 bg-zinc-100">
              <MessageSquare size={20} className="text-zinc-400" />
            </div>
            <p className="text-[13px] leading-relaxed max-w-[200px]">
              노트에 대해 질문하거나 수정을 요청해보세요.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 max-w-[82%] ${
              msg.role === "user"
                ? "self-end items-end"
                : "self-start items-start"
            }`}
          >
            {msg.role === "assistant" && (
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 px-0.5">
                AI
              </span>
            )}
            <div
              className={`text-[13.5px] leading-relaxed px-3.5 py-2.5 rounded-xl break-words whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col gap-1 max-w-[82%] self-start items-start">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 px-0.5">
              AI
            </span>
            <div className="flex items-center gap-1 px-4 py-3 border rounded-bl-sm rounded-xl bg-zinc-100 border-zinc-200">
              {[0, 200, 400].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                  style={{
                    animationDelay: `${delay}ms`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 입력창 */}
      <div
        className={`px-4 py-3 border-t border-zinc-100 flex items-end gap-2 bg-white transition-opacity ${
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <textarea
          ref={textareaRef}
          className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-[13.5px] leading-[22px] text-zinc-900 bg-zinc-50 resize-none outline-none overflow-y-auto transition-colors focus:border-indigo-500 focus:bg-white placeholder:text-zinc-400"
          style={{ height: "38px", maxHeight: "126px" }}
          placeholder="메시지를 입력하세요… (Shift+Enter: 줄바꿈)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
        />
        <button
          onClick={onSend}
          disabled={isLoading || !inputValue.trim()}
          className="flex items-center justify-center flex-shrink-0 text-white transition-all bg-indigo-600 rounded-md w-9 h-9 hover:bg-indigo-700 active:scale-95 disabled:bg-zinc-200 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
