import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchForm } from "../../components/AiChat/AddFriendPage/SearchForm";
import { PersonaCard } from "../../components/AiChat/AddFriendPage/PersonaCard";
import { AddFriendHeader } from "../../components/AiChat/AddFriendPage/AddFriendHeader";
import { AddFriendService } from "../../api/AiChat/AddFriendPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { AIPersona } from "../../types/pages/AiChat/aiChat";

export default function AddFriendPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [view, setView] = useState<"my-friends" | "browse" | "search">(
    "my-friends"
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [myFriends, setMyFriends] = useState<AIPersona[]>([]); // 내 친구 목록 데이터
  const [allPersonas, setAllPersonas] = useState<AIPersona[]>([]); // 탐색용 전체 데이터
  const [searchResults, setSearchResults] = useState<AIPersona[]>([]); // 검색 결과 데이터

  const [searchForm, setSearchForm] = useState({
    personality: "",
    gender: "",
    conversationStyle: "friend",
    topics: "",
    age: "",
  });

  // -- 데이터 초기화 (Lifecycle) --
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const currentUserId = await LoginService.getCurrentUserId();
        if (!currentUserId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }
        setUserId(currentUserId);

        // 내 친구 목록과 전체 페르소나 목록 병렬 로드
        const [friends, browseList] = await Promise.all([
          AddFriendService.getMyFriends({ userId: currentUserId }),
          AddFriendService.searchPersonas({}), // 인자 없이 전체 호출
        ]);

        setMyFriends(friends as unknown as AIPersona[]);
        setAllPersonas(browseList as unknown as AIPersona[]);
      } catch (error) {
        console.error(error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [navigate]);

  // -- 친구 추가/삭제 로직 (Toggle) --
  const toggleFriend = async (personaId: string) => {
    if (!userId) return;

    const isFriend = myFriends.some((f) => f.ai_persona_id === personaId);

    try {
      if (isFriend) {
        await AddFriendService.removeFriend({ userId, personaId });
        setMyFriends((prev) =>
          prev.filter((f) => f.ai_persona_id !== personaId)
        );
        toast.success("친구 목록에서 삭제되었습니다.");
      } else {
        //todo 하위 컴포넌트에서 모달 띄우고 수정한 값이 여기 들어갈수 있도록 수정
        await AddFriendService.addFriend({
          userId,
          personaId,
          callMeName: "사용자",
          aiSelfAwareness: false,
          serviceIntegration: false,
        });

        const target = allPersonas.find((p) => p.ai_persona_id === personaId);
        if (target) setMyFriends((prev) => [...prev, target]);

        toast.success("새로운 AI 친구가 추가되었습니다!");
      }
    } catch (error) {
      toast.error("작업 처리에 실패했습니다.");
    }
  };

  // -- 검색 로직 --
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await AddFriendService.searchPersonas({
        personality: searchForm.personality,
        gender: searchForm.gender,
        topics: searchForm.topics,
        age: searchForm.age,
      });
      setSearchResults(results as unknown as AIPersona[]);
      if (results.length === 0) toast.info("검색 결과가 없습니다.");
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAlreadyFriend = (personaId: string) =>
    myFriends.some((f) => f.ai_persona_id === personaId);

  // -- 로딩 뷰 --
  if (isLoading && myFriends.length === 0 && allPersonas.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        데이터를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AddFriendHeader
        view={view}
        setView={setView}
        onBack={() => navigate("/ai-chat")}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* 내 친구 목록 탭 */}
          {view === "my-friends" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {myFriends.length > 0 ? (
                myFriends.map((friend) => (
                  <PersonaCard
                    key={friend.ai_persona_id}
                    persona={friend}
                    isFriend={true}
                    onToggleFriend={toggleFriend}
                    onViewProfile={(id) => navigate(`/ai-chat/persona/${id}`)}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  아직 추가된 친구가 없습니다.
                </div>
              )}
            </div>
          )}

          {/* 둘러보기 탭 */}
          {view === "browse" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {allPersonas.map((persona) => (
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

          {/* 검색 탭 */}
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
