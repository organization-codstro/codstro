import { useState } from "react";
import { ArrowLeft, Search, UserPlus } from "lucide-react";
import { mockAIPersonas } from "../../data/AiChat/mockData";
import { useNavigate } from "react-router-dom";

export default function AddFriend() {
  const navigate = useNavigate();
  const [view, setView] = useState<"my-friends" | "browse" | "search">(
    "my-friends"
  );
  const [myFriends, setMyFriends] = useState<number[]>([]); // 친구 ID 목록
  const [searchForm, setSearchForm] = useState({
    personality: "",
    gender: "",
    conversationStyle: "friend",
    topics: "",
    age: "",
  });
  const [searchResults, setSearchResults] = useState<typeof mockAIPersonas>([]);

  const handleSearch = () => {
    const results = mockAIPersonas.filter((persona) => {
      let matches = true;
      if (
        searchForm.personality &&
        !persona.ai_persona_personality
          .toLowerCase()
          .includes(searchForm.personality.toLowerCase())
      )
        matches = false;
      if (
        searchForm.gender &&
        persona.ai_persona_gender.toLowerCase() !==
          searchForm.gender.toLowerCase()
      )
        matches = false;
      if (
        searchForm.topics &&
        !persona.ai_persona_preferred_features
          .toLowerCase()
          .includes(searchForm.topics.toLowerCase())
      )
        matches = false;
      if (searchForm.age && persona.ai_persona_age !== parseInt(searchForm.age))
        matches = false;
      return matches;
    });
    setSearchResults(results);
  };

  const toggleFriend = (personaId: number) => {
    setMyFriends((prev) =>
      prev.includes(personaId)
        ? prev.filter((id) => id !== personaId)
        : [...prev, personaId]
    );
  };

  const isAlreadyFriend = (personaId: number) => myFriends.includes(personaId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/ai-chat")}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add Friend</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("my-friends")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "my-friends"
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={view === "my-friends" ? { backgroundColor: "#587CF0" } : {}}
          >
            My Friends
          </button>
          <button
            onClick={() => setView("browse")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "browse"
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={view === "browse" ? { backgroundColor: "#587CF0" } : {}}
          >
            Browse All
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {view === "my-friends" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              My Friends ({myFriends.length})
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockAIPersonas
                .filter((p) => myFriends.includes(p.ai_persona_id))
                .map((friend) => (
                  <div
                    key={friend.ai_persona_id}
                    className="p-4 transition-all bg-white border border-gray-200 cursor-pointer rounded-xl hover:shadow-md"
                    onClick={() =>
                      navigate(`/ai-chat/persona/${friend.ai_persona_id}`)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center text-xl font-bold text-white rounded-full w-14 h-14"
                        style={{ backgroundColor: "#587CF0" }}
                      >
                        {friend.ai_persona_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {friend.ai_persona_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {friend.ai_persona_personality}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {myFriends.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  <p>No friends added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === "browse" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              All Available Friends ({mockAIPersonas.length})
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockAIPersonas.map((persona) => (
                <div
                  key={persona.ai_persona_id}
                  className="p-4 transition-all bg-white border border-gray-200 rounded-xl hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center text-xl font-bold text-white rounded-full w-14 h-14"
                      style={{ backgroundColor: "#587CF0" }}
                    >
                      {persona.ai_persona_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {persona.ai_persona_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {persona.ai_persona_personality}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/ai-chat/persona/${persona.ai_persona_id}`)
                      }
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      View Profile
                    </button>
                    {!isAlreadyFriend(persona.ai_persona_id) && (
                      <button
                        onClick={() => toggleFriend(persona.ai_persona_id)}
                        className="px-4 py-2 text-sm font-medium text-white transition-opacity rounded-lg hover:opacity-90"
                        style={{ backgroundColor: "#587CF0" }}
                      >
                        <UserPlus size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "search" && (
          <div className="max-w-2xl mx-auto">
            {/* 검색폼 + 검색결과 렌더링 로직 */}
            {/* handleSearch 로 searchResults 업데이트 */}
          </div>
        )}
      </div>
    </div>
  );
}
