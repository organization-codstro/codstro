import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mockAIPersonas } from "../../data/AiChat/mockData";
import { useNavigate } from "react-router-dom";

export default function CreateChatRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "daily" as "daily" | "project",
    topics: "",
    isMain: false,
  });
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // 새로운 채팅방 생성 후 ai-chat로 이동 (임시 roomId는 Date.now())
      const newRoomId = Date.now();
      navigate(`/ai-chat/${newRoomId}`);
    }
  };

  const toggleFriend = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const isStep1Valid = roomData.name.trim() && roomData.topics.trim();
  const isStep2Valid = selectedFriends.length > 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => (step === 1 ? navigate("/ai-chat") : setStep(1))}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Create Chat Room</h1>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex-1 h-1 rounded-full ${step >= 1 ? "opacity-100" : "opacity-30"}`}
            style={{ backgroundColor: "#587CF0" }}
          ></div>
          <div
            className={`flex-1 h-1 rounded-full ${step >= 2 ? "opacity-100" : "opacity-30"}`}
            style={{ backgroundColor: "#587CF0" }}
          ></div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {step === 1 ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={roomData.name}
                onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
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
                <button
                  onClick={() => setRoomData({ ...roomData, type: "daily" })}
                  className={`p-4 border-2 rounded-lg font-medium transition-all ${
                    roomData.type === "daily"
                      ? "text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={
                    roomData.type === "daily"
                      ? { backgroundColor: "#587CF0", borderColor: "#587CF0" }
                      : {}
                  }
                >
                  Daily
                </button>
                <button
                  onClick={() => setRoomData({ ...roomData, type: "project" })}
                  className={`p-4 border-2 rounded-lg font-medium transition-all ${
                    roomData.type === "project"
                      ? "text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={
                    roomData.type === "project"
                      ? { backgroundColor: "#587CF0", borderColor: "#587CF0" }
                      : {}
                  }
                >
                  Project
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Topics <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={roomData.topics}
                onChange={(e) => setRoomData({ ...roomData, topics: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
                placeholder="e.g., React, TypeScript, Daily Life"
              />
            </div>

            {roomData.type === "daily" && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
                <input
                  type="checkbox"
                  id="isMain"
                  checked={roomData.isMain}
                  onChange={(e) => setRoomData({ ...roomData, isMain: e.target.checked })}
                  className="w-5 h-5 rounded cursor-pointer"
                  style={{ accentColor: "#587CF0" }}
                />
                <label htmlFor="isMain" className="text-sm text-gray-700 cursor-pointer">
                  Set as main chat room (only one main room allowed)
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Add Friends to Room</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockAIPersonas.map((friend) => (
                <div
                  key={friend.ai_persona_id}
                  onClick={() => toggleFriend(friend.ai_persona_id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedFriends.includes(friend.ai_persona_id)
                      ? "text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={
                    selectedFriends.includes(friend.ai_persona_id)
                      ? { backgroundColor: "#587CF0", borderColor: "#587CF0" }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        selectedFriends.includes(friend.ai_persona_id)
                          ? "bg-white/20"
                          : "text-white"
                      }`}
                      style={
                        !selectedFriends.includes(friend.ai_persona_id)
                          ? { backgroundColor: "#587CF0" }
                          : {}
                      }
                    >
                      {friend.ai_persona_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{friend.ai_persona_name}</h3>
                      <p
                        className={`text-sm ${
                          selectedFriends.includes(friend.ai_persona_id)
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {friend.ai_persona_personality}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
          className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-opacity rounded-lg disabled:opacity-50 hover:opacity-90"
          style={{ backgroundColor: "#587CF0" }}
        >
          {step === 1 ? "Next" : "Create Room"}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}