import { EmoticonPreviewProps } from "../../../../types/pages/AiChat/ChatConversation/ChatInput/EmoticonPreview";

export const EmoticonPreview = ({
  emoticon,
  emoticonUrl,
  onCancel,
}: EmoticonPreviewProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="relative shrink-0">
        {emoticonUrl ? (
          <img
            src={emoticonUrl}
            alt={emoticon.emoticon_name}
            className="object-cover w-24 h-24 border-2 border-blue-300 rounded-lg"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 border-2 border-blue-300 rounded-lg animate-pulse" />
        )}
        <button
          onClick={onCancel}
          className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full text-[10px] flex items-center justify-center hover:bg-red-500"
        >
          ✕
        </button>
      </div>
      <span className="text-xs text-gray-400">{emoticon.emoticon_name}</span>
    </div>
  );
};
