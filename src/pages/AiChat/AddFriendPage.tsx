import { useState } from "react";
import { mockAIPersonas } from "../../data/AiChat/mockData";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../../components/AiChat/AddFriendPage/SearchForm";
import { PersonaCard } from "../../components/AiChat/AddFriendPage/PersonaCard";
import { AddFriendHeader } from "../../components/AiChat/AddFriendPage/AddFriendHeader";

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
      <AddFriendHeader
        view={view}
        setView={setView}
        onBack={() => navigate("/ai-chat")}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {view === "my-friends" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockAIPersonas
                .filter((p) => myFriends.includes(p.ai_persona_id))
                .map((friend) => (
                  <PersonaCard
                    key={friend.ai_persona_id}
                    persona={friend}
                    isFriend={true}
                    onViewProfile={(id) => navigate(`/ai-chat/persona/${id}`)}
                  />
                ))}
            </div>
          )}

          {view === "browse" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockAIPersonas.map((persona) => (
                <PersonaCard
                  key={persona.ai_persona_id}
                  persona={persona}
                  isFriend={isAlreadyFriend(persona.ai_persona_id)}
                  onToggleFriend={toggleFriend}
                  onViewProfile={(id) => navigate(`/ai-chat/persona/${id}`)}
                />
              ))}
            </div>
          )}

          {view === "search" && (
            <div className="max-w-2xl mx-auto">
              <SearchForm
                form={searchForm}
                setForm={setSearchForm}
                onSearch={handleSearch}
              />
              <div className="flex flex-col gap-3">
                {searchResults.map((persona) => (
                  <PersonaCard
                    key={persona.ai_persona_id}
                    persona={persona}
                    variant="horizontal"
                    isFriend={isAlreadyFriend(persona.ai_persona_id)}
                    onToggleFriend={toggleFriend}
                    onViewProfile={(id) => navigate(`/ai-chat/persona/${id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
