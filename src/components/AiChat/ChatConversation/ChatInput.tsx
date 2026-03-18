import { useState, useEffect, useRef, useCallback } from "react";
import { Smile, File, Send } from "lucide-react";
import { Emoticon } from "../../../types/common/aiChat";
import { ChatConversationService } from "../../../api/AiChat/ChatConversationPage"; // getEmoticons 있는 곳
import { ChatInputProps } from "../../../types/pages/AiChat/ChatConversation/ChatInput";
import {
  ALLOWEDKEYS,
  EMOTICONS_PAGE_SIZE,
} from "../../../constants/AiChat/aiChat";
import { getFirebaseImageUrl } from "../../../db/firebase/firebase";
import { useEmoticonStore } from "../../../store/emoticonStore";

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
  const setEmoticonStore = useEmoticonStore((s) => s.setEmoticons); // 상단에 추가

  // -- 이모지 피커 상태 --
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

  const totalPages = Math.ceil(totalCount / EMOTICONS_PAGE_SIZE);

  // ── 이모티콘 페이지 캐시 (페이지 번호 → 결과) ──

  const emoticonCacheRef = useRef<
    Record<
      number,
      {
        data: Emoticon[];
        urls: Record<string, string>;
        count: number;
      }
    >
  >({});
  const hasPrefetchedRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null); // ref 추가

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

  // -- 이모지 fetch --
  const fetchEmoticons = useCallback(async (p: number, kw: string) => {
    // 검색어가 있으면 캐시 무효화
    const cacheKey = p;
    if (!kw && emoticonCacheRef.current[cacheKey]) {
      const cached = emoticonCacheRef.current[cacheKey];
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

      // 검색어 없을 때만 캐싱
      if (!kw) {
        emoticonCacheRef.current[cacheKey] = {
          data: result.data,
          urls: urlMap,
          count: result.count,
        };
      }
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

  // -- 피커 열기/닫기 --
  const openPicker = () => {
    const cached = emoticonCacheRef.current[1]; // 1페이지부터 시작
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

  // -- 이모지 선택 --
  const handleEmoticonSelect = (emoticon: Emoticon) => {
    onSend(emoticon.emoticon_id, messageMode);
    closePicker();
  };

  // -- 검색 debounce --
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (v: string) => {
    setSearchInput(v);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      if (v !== keyword) {
        emoticonCacheRef.current = {}; // 검색어 바뀌면 캐시 초기화
        setKeyword(v);
        setPage(1);
      }
    }, 300);
  };

  // -- 키보드 단축키 --
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+E (Mac: Option+E) → 열기/닫기
      if (e.altKey && e.code === "KeyE") {
        e.preventDefault();
        isEmojiOpen ? closePicker() : openPicker();
        return;
      }

      // Alt+M → 메세지 모드 전환 (이모지 피커와 무관하게 항상 동작)
      if (e.altKey && e.code === "KeyM") {
        e.preventDefault();
        setMessageMode((prev) =>
          prev === "CASUAL" ? "ACTION_REQUEST" : "CASUAL",
        );
        return;
      }

      // 이모지 피커 열려있을 때만 아래 단축키 처리
      if (!isEmojiOpen) return;

      if (!ALLOWEDKEYS.includes(e.key) && !e.altKey) {
        // 검색 input에 포커스 있으면 차단하지 않음
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

  // -- 이미지 첨부 --
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages([...images, ...files]);
    e.target.value = "";
  };

  // -- Enter 전송 --
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isEmojiOpen) {
      e.preventDefault();
      onSend(undefined, messageMode);
    }
  };

  return (
    <div className="relative">
      {/* ── 이모지 피커 팝업 ── */}
      {isEmojiOpen && (
        <div className="absolute left-0 z-50 mb-2 ml-2 overflow-hidden bg-white border border-gray-200 shadow-xl bottom-full w-72 rounded-xl">
          {/* 검색 + 닫기 */}
          <div className="flex items-center gap-2 p-3 border-b border-gray-100">
            <input
              ref={searchInputRef}
              autoFocus
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="이름으로 검색"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
            <button
              onClick={closePicker}
              className="text-base font-bold leading-none text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* 이모지 그리드 */}
          <div className="p-3">
            {isLoadingEmoticons ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-lg aspect-square animate-pulse"
                  />
                ))}
              </div>
            ) : emoticons.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-gray-400">
                이모티콘이 없습니다
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {/* 9칸 고정 */}
                {Array.from({ length: 9 }).map((_, i) => {
                  const emoticon = emoticons[i];
                  if (!emoticon) {
                    return <div key={i} className="aspect-square" />;
                  }
                  const url = emoticonUrls[emoticon.emoticon_id];
                  return (
                    <button
                      key={emoticon.emoticon_id}
                      onClick={() => handleEmoticonSelect(emoticon)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-md ${
                        selectedIndex === i
                          ? "border-blue-400 shadow-md"
                          : "border-transparent hover:border-blue-200"
                      }`}
                      title={`${emoticon.emoticon_name} (${i + 1})`}
                    >
                      {/* 단축키 번호 뱃지 */}
                      <span className="absolute top-1 left-1 text-[10px] font-bold text-white bg-black/40 rounded px-1 z-10 leading-tight">
                        {i + 1}
                      </span>
                      {url ? (
                        <img
                          src={url}
                          alt={emoticon.emoticon_name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
            <button
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                setSelectedIndex(null);
              }}
              disabled={page <= 1}
              className="px-2 text-lg font-bold text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              {"<"}
            </button>
            <span className="text-xs text-gray-400">
              {page} / {totalPages || 1}
            </span>
            <button
              onClick={() => {
                setPage((p) => Math.min(totalPages || 1, p + 1));
                setSelectedIndex(null);
              }}
              disabled={page >= totalPages}
              className="px-2 text-lg font-bold text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              {">"}
            </button>
          </div>

          {/* 단축키 힌트 */}
          <div className="px-4 pb-2 text-[10px] text-gray-300 text-center">
            숫자키로 선택 · {"< >"} 페이지 이동 · Esc 닫기
          </div>
        </div>
      )}

      {/* ── 입력창 영역 ── */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        {/* 답장 미리보기 */}
        {replyingTo && (
          <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <span className="flex-1 text-xs text-gray-600 truncate">
              {replyingTo.chat_message_content ?? "(이모티콘 메시지)"}
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* 이미지 미리보기 */}
        {images.length > 0 && (
          <div className="flex gap-2 pb-1 mb-2 overflow-x-auto">
            {images.map((file, i) => (
              <div key={i} className="relative shrink-0">
                <img
                  src={URL.createObjectURL(file)}
                  alt="첨부"
                  className="object-cover border border-gray-200 rounded-lg w-14 h-14"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full text-[10px] flex items-center justify-center hover:bg-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 메인 입력 행 */}
        <div className="flex items-center gap-2">
          {/* 파일 첨부 */}
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
          {/* 이모지 버튼 */}
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
          {/* 텍스트 입력 */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            disabled={disabled}
            className="flex-1 min-w-0 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
          {/* 전송 타입 토글 + 전송 버튼 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="relative flex items-center overflow-hidden border border-blue-500 rounded-full cursor-pointer select-none"
              onClick={() =>
                setMessageMode((prev) =>
                  prev === "CASUAL" ? "ACTION_REQUEST" : "CASUAL",
                )
              }
            >
              {/* 슬라이딩 배경 */}
              <div
                className="absolute top-0 bottom-0 transition-all duration-300 ease-in-out bg-blue-500 rounded-full"
                style={{
                  left: messageMode === "CASUAL" ? "0%" : "40%",
                  width: messageMode === "CASUAL" ? "40%" : "100%",
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
              onClick={() => onSend(undefined, messageMode)}
              disabled={disabled || (!value.trim() && images.length === 0)}
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
