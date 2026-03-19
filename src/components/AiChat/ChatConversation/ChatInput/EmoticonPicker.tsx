import { EmoticonPickerProps } from "../../../../types/pages/AiChat/ChatConversation/ChatInput/EmoticonPicker";

export function EmoticonPicker({
  emoticons,
  emoticonUrls,
  isLoading,
  page,
  totalPages,
  searchInput,
  selectedIndex,
  onSelect,
  onClose,
  onPageChange,
  onSearchChange,
  searchInputRef,
}: EmoticonPickerProps) {
  return (
    <div className="absolute left-0 z-50 mb-2 ml-2 overflow-hidden bg-white border border-gray-200 shadow-xl bottom-full w-72 rounded-xl">
      {/* 검색 + 닫기 */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        <input
          ref={searchInputRef}
          autoFocus
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="이름으로 검색"
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
        />
        <button
          onClick={onClose}
          className="text-base font-bold leading-none text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* 이모지 그리드 */}
      <div className="p-3">
        {isLoading ? (
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
            {Array.from({ length: 9 }).map((_, i) => {
              const emoticon = emoticons[i];
              if (!emoticon) return <div key={i} className="aspect-square" />;
              const url = emoticonUrls[emoticon.emoticon_id];
              return (
                <button
                  key={emoticon.emoticon_id}
                  onClick={() => onSelect(emoticon)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-md ${
                    selectedIndex === i
                      ? "border-blue-400 shadow-md"
                      : "border-transparent hover:border-blue-200"
                  }`}
                  title={`${emoticon.emoticon_name} (${i + 1})`}
                >
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
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-2 text-lg font-bold text-gray-400 hover:text-gray-700 disabled:opacity-30"
        >
          {"<"}
        </button>
        <span className="text-xs text-gray-400">
          {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages || 1, page + 1))}
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
  );
}
