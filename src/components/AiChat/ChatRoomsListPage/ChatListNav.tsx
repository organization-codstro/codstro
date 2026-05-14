import { ChatListNavProps } from "../../../types/pages/AiChat/ChatRoomsListPage/ChatListNav";

export const ChatListNav = ({ buttons }: ChatListNavProps) => {
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-gray-100 no-scrollbar">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={btn.onClick}
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 whitespace-nowrap"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
