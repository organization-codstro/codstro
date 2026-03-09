import { ChatRoom } from "../../../types/common/aiChat";
import { RoomInfoFormProps } from "../../../types/pages/AiChat/CreateChatRoomPage/RoomInfoForm";

export function RoomInfoForm({ data, onChange }: RoomInfoFormProps) {
  const updateField = (field: keyof ChatRoom, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Room Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.chat_room_name}
          onChange={(e) => updateField("chat_room_name", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:border-transparent"
          style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
          placeholder="Enter room name"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Room Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["DAILY", "PROJECT"] as const).map((type) => (
            <button
              key={type}
              onClick={() => updateField("chat_room_type", type)}
              className={`p-4 border-2 rounded-lg font-medium transition-all capitalize ${
                data.chat_room_type === type
                  ? "text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
              style={
                data.chat_room_type === type
                  ? { backgroundColor: "#587CF0", borderColor: "#587CF0" }
                  : {}
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Topics <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.chat_room_topics}
          onChange={(e) => updateField("chat_room_topics", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:border-transparent"
          style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
          placeholder="e.g., React, TypeScript, Daily Life"
        />
      </div>

      {data.chat_room_type === "DAILY" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
          <input
            type="checkbox"
            id="isMain"
            checked={data.chat_room_daily_is_main}
            onChange={(e) =>
              updateField("chat_room_daily_is_main", e.target.checked)
            }
            className="w-5 h-5 rounded cursor-pointer"
            style={{ accentColor: "#587CF0" }}
          />
          <label
            htmlFor="isMain"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Set as main chat room (only one main room allowed)
          </label>
        </div>
      )}
    </div>
  );
}
