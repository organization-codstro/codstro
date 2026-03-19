import { useState, useEffect, useRef, useCallback } from "react";
import { Smile, File, Send } from "lucide-react";
import {
  ALLOWEDKEYS,
  EMOTICONS_PAGE_SIZE,
} from "../../../../constants/AiChat/aiChat";
import { getFirebaseImageUrl } from "../../../../db/firebase/firebase";
import { useEmoticonStore } from "../../../../store/emoticonStore";
import { EmoticonPicker } from "./EmoticonPicker";
import { EmoticonPreview } from "./EmoticonPreview";
import { ImagePreview } from "./ImagePreview";
import { ReplyPreview } from "./ReplyPreview";
import { MessageModeToggle } from "./MessageModeToggle";
import { Emoticon } from "../../../../types/common/aiChat";
import {
  ChatInputProps,
  EmoticonCache,
} from "../../../../types/pages/AiChat/ChatConversation/ChatInput/ChatInput";
import { ChatConversationService } from "../../../../api/AiChat/ChatConversationPage";

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
  const setEmoticonStore = useEmoticonStore((s) => s.setEmoticons);

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

  const totalPages = Math.ceil(totalCount / EMOTICONS_PAGE_SIZE);
  const emoticonCacheRef = useRef<EmoticonCache>({} as EmoticonCache);
  const hasPrefetchedRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isEmojiOpen) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
            className={`shrink-0 transition-colors ${isEmojiOpen ? "text-blue-500" : "text-gray-400 hover:text-gray-600"}`}
            title="이모티콘 (Alt+E)"
          >
            <Smile size={20} />
          </button>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            disabled={disabled}
            rows={1}
            className="flex-1 min-w-0 overflow-hidden text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none resize-none"
            style={{ maxHeight: "120px" }}
            ref={(el) => {
              if (el) {
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }
            }}
          />
          <div className="flex items-center gap-2 shrink-0">
            <MessageModeToggle mode={messageMode} onChange={setMessageMode} />
            <button
              onClick={handleSend}
              disabled={
                disabled ||
                (!value.trim() && images.length === 0 && !selectedEmoticon)
              }
              className="bg-blue-500 text-white px-3 py-[10px] rounded-lg hover:bg-blue-600 disabled:opacity-50 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
