import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../../types/AiChat/aiChat";
import { mockChatRooms } from "../../data/AiChat/mockData";

interface ChatRoomsListProps {
  chatRooms: ChatRoom[];
}

export default function ChatRoomsList() {
  const navigate = useNavigate();
  // For now, using mock data
  const chatRooms = mockChatRooms;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <button
            onClick={() => navigate("/ai-chat/create-room")}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
            style={{ color: "#587CF0" }}
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
            className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-gray-100">
        <button
          onClick={() => navigate("/ai-chat/friends")}
          className="px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap"
          style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
        >
          Friend Collection
        </button>
        <button
          onClick={() => navigate("/ai-chat/add-friend")}
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 whitespace-nowrap"
        >
          Add Friend
        </button>
        <button
          onClick={() => navigate("/ai-chat/user-info")}
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 whitespace-nowrap"
        >
          My Info
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((room) => (
          <div
            key={room.chat_room_id}
            onClick={() => navigate(`/ai-chat/${room.chat_room_id}`)}
            className="flex items-center gap-3 p-4 transition-colors bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          >
            <div
              className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full"
              style={{ backgroundColor: "#587CF0" }}
            >
              {room.chat_room_name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {room.chat_room_name}
                </h3>
                {room.chat_rooms_unconfirmed > 0 && (
                  <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                    {room.chat_rooms_unconfirmed}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {room.chat_room_topics}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
                >
                  {room.chat_room_type}
                </span>
                {room.chat_room_daily_is_main && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                    Main
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
