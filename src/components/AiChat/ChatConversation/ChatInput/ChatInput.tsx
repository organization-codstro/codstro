import { useState, useEffect, useRef, useCallback } from "react";
import { Smile, File, Send } from "lucide-react";
import {
  ALLOWEDKEYS,
  EMOTICONS_PAGE_SIZE,
} from "../../../../constants/AiChat/AiChat";
import { getFirebaseImageUrl } from "../../../../db/firebase/firebase";
import { useEmoticonStore } from "../../../../store/emoticonStore";
import { useImageStore } from "../../../../store/ImageStore";
import { EmoticonPicker } from "./EmoticonPicker";
import { EmoticonPreview } from "./EmoticonPreview";
import { ImagePreview } from "./ImagePreview";
import { ReplyPreview } from "./ReplyPreview";
import { MessageModeToggle } from "./MessageModeToggle";
import { Emoticon, ChatRoomAI } from "../../../../types/common/AiChat";
import {
  ChatInputProps,
  EmoticonCache,
} from "../../../../types/pages/AiChat/ChatConversation/ChatInput/ChatInput";
import { ChatConversationService } from "../../../../api/AiChat/ChatConversationPage";

// contenteditable의 HTML을 plain text로 변환
const htmlToPlainText = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  // mention span을 @name 텍스트로 변환
  div.querySelectorAll("[data-mention]").forEach((el) => {
    el.replaceWith(`@${el.getAttribute("data-mention")}`);
  });
  return div.innerText ?? div.textContent ?? "";
};

// plain text를 HTML로 변환 (멘션 하이라이트 포함)
const plainTextToHtml = (text: string, personas: ChatRoomAI[]): string => {
  const personaNames = personas.map((p) => p.ai_persona_name);
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/@(\w+)/g, (match, name) => {
    if (personaNames.includes(name)) {
      return `<span data-mention="${name}" contenteditable="false" class="mention-chip">@${name}</span>`;
    }
    return match;
  });
};

// 커서를 contenteditable 끝으로 이동
const moveCursorToEnd = (el: HTMLElement) => {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel?.removeAllRanges();
  sel?.addRange(range);
};

// 커서 위치 앞의 텍스트 반환
const getTextBeforeCursor = (el: HTMLElement): string => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return "";
  const range = sel.getRangeAt(0).cloneRange();
  range.selectNodeContents(el);
  range.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset);
  return range.toString();
};

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
  const editorRef = useRef<HTMLDivElement>(null);
  const setEmoticonStore = useEmoticonStore((s) => s.setEmoticons);
  const getUrl = useImageStore((s) => s.getUrl);

  const [messageMode, setMessageMode] = useState<"CASUAL" | "ACTION_REQUEST">(
    "CASUAL",
  );
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [emoticons, setEmoticons] = useState<Emoticon[]>([]);
  const [emoticonUrls, setEmoticonUrls] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoadingEmoticons, setIsLoadingEmoticons] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState<Emoticon | null>(
    null,
  );
  const [selectedEmoticonUrl, setSelectedEmoticonUrl] = useState<string | null>(
    null,
  );

  // -- 멘션 상태 --
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);
  const [personaImageUrls, setPersonaImageUrls] = useState<
    Record<string, string>
  >({});
  // 내부적으로 에디터 내용을 관리 (부모 onChange는 plain text로만 전달)
  const isComposingRef = useRef(false);

  const totalPages = Math.ceil(totalCount / EMOTICONS_PAGE_SIZE);
  const emoticonCacheRef = useRef<EmoticonCache>({} as EmoticonCache);
  const hasPrefetchedRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // -- 페르소나 프로필 이미지 프리로드 --
  useEffect(() => {
    personas.forEach(async (p) => {
      if (p.ai_persona_profile_image_path) {
        const url = await getUrl(p.ai_persona_profile_image_path);
        if (url) {
          setPersonaImageUrls((prev) => ({
            ...prev,
            [p.chat_room_ai_id]: url,
          }));
        }
      }
    });
  }, [personas]);

  // -- 부모 value가 "" 되면 에디터 초기화 (전송 후) --
  useEffect(() => {
    if (value === "" && editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  // -- 멘션 필터링 --
  const filteredPersonas: ChatRoomAI[] =
    mentionQuery !== null
      ? personas.filter((p) =>
          p.ai_persona_name.toLowerCase().includes(mentionQuery.toLowerCase()),
        )
      : [];

  // -- 멘션 선택 → 칩으로 교체 --
  const selectMention = (persona: ChatRoomAI) => {
    const editor = editorRef.current;
    if (!editor) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);

    // @ 위치부터 현재 커서까지 삭제
    const textBeforeCursor = getTextBeforeCursor(editor);
    const atIndex = textBeforeCursor.lastIndexOf("@");
    if (atIndex === -1) return;

    // 현재 커서에서 (mentionQuery.length + 1)만큼 뒤로 이동해서 @ 포함 삭제
    range.setStart(
      range.startContainer,
      range.startOffset - (mentionQuery?.length ?? 0) - 1,
    );
    range.deleteContents();

    // 멘션 칩 삽입
    const chip = document.createElement("span");
    chip.setAttribute("data-mention", persona.ai_persona_name);
    chip.setAttribute("contenteditable", "false");
    chip.className = "mention-chip";
    chip.textContent = `@${persona.ai_persona_name}`;
    range.insertNode(chip);

    // 칩 뒤에 공백 추가 후 커서 이동
    const space = document.createTextNode("\u00A0");
    chip.after(space);
    const newRange = document.createRange();
    newRange.setStartAfter(space);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);

    // 부모에 plain text 전달
    onChange(htmlToPlainText(editor.innerHTML));
    setMentionQuery(null);
  };

  // -- 에디터 입력 처리 --
  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const plainText = htmlToPlainText(editor.innerHTML);
    onChange(plainText);

    // @ 감지
    const textBeforeCursor = getTextBeforeCursor(editor);
    const match = textBeforeCursor.match(/@(\w*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setMentionIndex(0);
    } else {
      setMentionQuery(null);
    }
  };

  // -- 붙여넣기: plain text만 허용 --
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const resolveUrls = useCallback(async (data: Emoticon[]) => {
    const urlMap: Record<string, string> = {};
    await Promise.all(
      data.map(async (e) => {
        const url = await getFirebaseImageUrl(e.emoticon_img_path);
        if (url) urlMap[e.emoticon_id] = url;
      }),
    );
    return urlMap;
  }, []);

  useEffect(() => {
    if (hasPrefetchedRef.current) return;
    hasPrefetchedRef.current = true;

    const prefetchAll = async () => {
      try {
        const first = await ChatConversationService.getEmoticons({
          page: 1,
          limit: EMOTICONS_PAGE_SIZE,
          keyword: "",
        });
        const firstUrls = await resolveUrls(first.data);
        emoticonCacheRef.current[1] = {
          data: first.data,
          urls: firstUrls,
          count: first.count,
        };
        setTotalCount(first.count);
        setEmoticons(first.data);
        setEmoticonStore(first.data);

        const total = Math.ceil(first.count / EMOTICONS_PAGE_SIZE);
        for (let p = 2; p <= total; p++) {
          const result = await ChatConversationService.getEmoticons({
            page: p,
            limit: EMOTICONS_PAGE_SIZE,
            keyword: "",
          });
          const urls = await resolveUrls(result.data);
          emoticonCacheRef.current[p] = {
            data: result.data,
            urls,
            count: result.count,
          };
          setEmoticonStore(result.data);
        }
      } catch (err) {
        console.error("이모티콘 프리패치 실패", err);
      }
    };
    prefetchAll();
  }, [resolveUrls]);

  const fetchEmoticons = useCallback(async (p: number, kw: string) => {
    if (!kw && emoticonCacheRef.current[p]) {
      const cached = emoticonCacheRef.current[p];
      setEmoticons(cached.data);
      setEmoticonUrls(cached.urls);
      setTotalCount(cached.count);
      return;
    }
    setIsLoadingEmoticons(true);
    try {
      const result = await ChatConversationService.getEmoticons({
        page: p,
        limit: EMOTICONS_PAGE_SIZE,
        keyword: kw,
      });
      const urlMap: Record<string, string> = {};
      await Promise.all(
        result.data.map(async (e) => {
          const url = await getFirebaseImageUrl(e.emoticon_img_path);
          if (url) urlMap[e.emoticon_id] = url;
        }),
      );
      setEmoticons(result.data);
      setEmoticonUrls(urlMap);
      setTotalCount(result.count);
      setEmoticonStore(result.data);
      if (!kw)
        emoticonCacheRef.current[p] = {
          data: result.data,
          urls: urlMap,
          count: result.count,
        };
    } catch (err) {
      console.error("이모티콘 로드 실패", err);
    } finally {
      setIsLoadingEmoticons(false);
    }
  }, []);

  useEffect(() => {
    if (!isEmojiOpen) return;
    fetchEmoticons(page, keyword);
  }, [page, keyword]);

  const openPicker = () => {
    const cached = emoticonCacheRef.current[1];
    if (cached) {
      setEmoticons(cached.data);
      setEmoticonUrls(cached.urls);
      setTotalCount(cached.count);
    }
    setIsEmojiOpen(true);
    setPage(1);
    setSelectedIndex(null);
  };

  const closePicker = () => {
    setIsEmojiOpen(false);
    setSelectedIndex(null);
  };

  const handleEmoticonSelect = async (emoticon: Emoticon) => {
    setSelectedEmoticon(emoticon);
    const url =
      emoticonUrls[emoticon.emoticon_id] ||
      (await getFirebaseImageUrl(emoticon.emoticon_img_path)) ||
      null;
    setSelectedEmoticonUrl(url);
    closePicker();
  };

  const handleSend = () => {
    onSend(selectedEmoticon?.emoticon_id, messageMode);
    setSelectedEmoticon(null);
    setSelectedEmoticonUrl(null);
    // 에디터 초기화는 value === "" useEffect에서 처리
  };

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (v: string) => {
    setSearchInput(v);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      if (v !== keyword) {
        emoticonCacheRef.current = {} as EmoticonCache;
        setKeyword(v);
        setPage(1);
      }
    }, 300);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "KeyE") {
        e.preventDefault();
        isEmojiOpen ? closePicker() : openPicker();
        return;
      }
      if (e.altKey && e.code === "KeyM") {
        e.preventDefault();
        setMessageMode((prev) =>
          prev === "CASUAL" ? "ACTION_REQUEST" : "CASUAL",
        );
        return;
      }
      if (!isEmojiOpen) return;
      if (!ALLOWEDKEYS.includes(e.key) && !e.altKey) {
        if (document.activeElement === searchInputRef.current) return;
        e.preventDefault();
        e.stopPropagation();
      }
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closePicker();
          break;
        case "<":
        case ",":
        case "ArrowLeft":
          e.preventDefault();
          setPage((p) => Math.max(1, p - 1));
          setSelectedIndex(null);
          break;
        case ">":
        case ".":
        case "ArrowRight":
          e.preventDefault();
          setPage((p) => Math.min(totalPages || 1, p + 1));
          setSelectedIndex(null);
          break;
        default:
          if (/^[1-9]$/.test(e.key)) {
            e.preventDefault();
            const idx = parseInt(e.key) - 1;
            if (idx < emoticons.length) handleEmoticonSelect(emoticons[idx]);
          }
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isEmojiOpen, emoticons, totalPages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages([...images, ...files]);
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 멘션 팝업 키보드 처리
    if (mentionQuery !== null && filteredPersonas.length > 0) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMentionIndex(
          (i) => (i - 1 + filteredPersonas.length) % filteredPersonas.length,
        );
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMentionIndex((i) => (i + 1) % filteredPersonas.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        selectMention(filteredPersonas[mentionIndex]);
        return;
      }
      if (e.key === "Escape") {
        setMentionQuery(null);
        return;
      }
    }

    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !isEmojiOpen &&
      !isComposingRef.current
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = !value.trim() && images.length === 0 && !selectedEmoticon;

  return (
    <>
      {/* 멘션 칩 스타일 */}
      <style>{`
        .mention-chip {
          display: inline-block;
          background-color: #dbeafe;
          color: #2563eb;
          border-radius: 4px;
          padding: 0 4px;
          font-weight: 600;
          font-size: 0.875rem;
          line-height: 1.4;
          cursor: default;
          user-select: none;
        }
        .chat-editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .chat-editor {
          outline: none;
          min-height: 24px;
          max-height: 120px;
          overflow-y: auto;
          word-break: break-word;
          white-space: pre-wrap;
        }
      `}</style>

      <div className="relative">
        {isEmojiOpen && (
          <EmoticonPicker
            emoticons={emoticons}
            emoticonUrls={emoticonUrls}
            isLoading={isLoadingEmoticons}
            page={page}
            totalPages={totalPages}
            searchInput={searchInput}
            selectedIndex={selectedIndex}
            onSelect={handleEmoticonSelect}
            onClose={closePicker}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
            searchInputRef={searchInputRef}
          />
        )}

        {/* 멘션 팝업 */}
        {mentionQuery !== null && filteredPersonas.length > 0 && (
          <div className="absolute z-50 mb-2 overflow-hidden bg-white border border-gray-200 shadow-lg bottom-full left-4 w-52 rounded-xl">
            <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-50 border-b border-gray-100">
              멤버 멘션
            </div>
            {filteredPersonas.map((persona, i) => (
              <button
                key={persona.chat_room_ai_id}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  i === mentionIndex
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectMention(persona);
                }}
                onMouseEnter={() => setMentionIndex(i)}
              >
                <div className="flex-shrink-0 overflow-hidden bg-gray-200 rounded-full w-7 h-7">
                  {personaImageUrls[persona.chat_room_ai_id] ? (
                    <img
                      src={personaImageUrls[persona.chat_room_ai_id]}
                      alt={persona.ai_persona_name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-xs font-bold text-gray-500">
                      {persona.ai_persona_name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium truncate">
                  {persona.ai_persona_name}
                </span>
                {i === mentionIndex && (
                  <span className="flex-shrink-0 ml-auto text-xs text-blue-400">
                    ↵
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="px-4 py-3 bg-white border-t border-gray-200">
          {replyingTo && (
            <ReplyPreview
              replyingTo={replyingTo}
              onCancel={() => setReplyingTo(null)}
            />
          )}
          {selectedEmoticon && (
            <EmoticonPreview
              emoticon={selectedEmoticon}
              emoticonUrl={selectedEmoticonUrl}
              onCancel={() => {
                setSelectedEmoticon(null);
                setSelectedEmoticonUrl(null);
              }}
            />
          )}
          <ImagePreview
            images={images}
            onRemove={(i) => setImages(images.filter((_, idx) => idx !== i))}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-gray-600 shrink-0"
            >
              <File size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              onClick={() => (isEmojiOpen ? closePicker() : openPicker())}
              className={`shrink-0 transition-colors ${
                isEmojiOpen
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="이모티콘 (Alt+E)"
            >
              <Smile size={20} />
            </button>

            {/* contenteditable 에디터 */}
            <div
              ref={editorRef}
              contentEditable={!disabled}
              suppressContentEditableWarning
              className="flex-1 min-w-0 text-sm text-gray-700 chat-editor"
              data-placeholder="메시지를 입력하세요... (@로 멘션)"
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onCompositionStart={() => {
                isComposingRef.current = true;
              }}
              onCompositionEnd={() => {
                isComposingRef.current = false;
              }}
            />

            <div className="flex items-center gap-2 shrink-0">
              <MessageModeToggle mode={messageMode} onChange={setMessageMode} />
              <button
                onClick={handleSend}
                disabled={disabled || isEmpty}
                className="bg-blue-500 text-white px-3 py-[10px] rounded-lg hover:bg-blue-600 disabled:opacity-50 shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
