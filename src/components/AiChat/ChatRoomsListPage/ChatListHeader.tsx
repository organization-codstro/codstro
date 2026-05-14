import { Plus, Search } from "lucide-react";
import { ChatListHeaderProps } from "../../../types/pages/AiChat/ChatRoomsListPage/ChatListHeader";

export const ChatListHeader = ({
  onSearchChange,
  onCreateRoom,
}: ChatListHeaderProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <button
          onClick={onCreateRoom}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
          style={{ color: "#587CF0" }}
          aria-label="Create new room"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="relative">
        <Search
          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
          size={20}
        />
        <input
          type="text"
          placeholder="Search conversations..."
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
