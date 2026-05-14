import { ImagePreviewProps } from "../../../../types/pages/AiChat/ChatConversation/ChatInput/ImagePreview";

export const ImagePreview = ({ images, onRemove }: ImagePreviewProps) => {
  if (images.length === 0) return null;

  return (
    <div className="flex gap-2 pb-1 mb-2 overflow-x-auto">
      {images.map((file, i) => (
        <div key={i} className="relative shrink-0">
          <img
            src={URL.createObjectURL(file)}
            alt="첨부"
            className="object-cover border border-gray-200 rounded-lg w-14 h-14"
          />
          <button
            onClick={() => onRemove(i)}
            className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full text-[10px] flex items-center justify-center hover:bg-red-500"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
