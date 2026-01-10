import { FriendSelectorProps } from "../../../types/pages/AiChat/CreateChatRoomPage/FriendSelector";

export function FriendSelector({
  friends,
  selectedIds,
  onToggle,
}: FriendSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Add Friends to Room
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {friends.map((friend) => {
          const isSelected = selectedIds.includes(friend.ai_persona_id);
          return (
            <div
              key={friend.ai_persona_id}
              onClick={() => onToggle(friend.ai_persona_id)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? "text-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={
                isSelected
                  ? { backgroundColor: "#587CF0", borderColor: "#587CF0" }
                  : {}
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isSelected ? "bg-white/20" : "text-white"
                  }`}
                  style={!isSelected ? { backgroundColor: "#587CF0" } : {}}
                >
                  {friend.ai_persona_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">
                    {friend.ai_persona_name}
                  </h3>
                  <p
                    className={`text-sm truncate ${
                      isSelected ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {friend.ai_persona_personality}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
