import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { NoteListService } from "../../api/Concept/NotesListPage";
import { NoteSummaryResponse } from "../../types/api/Concept/NotesListPage";
import { LoginService } from "../../api/Auth/LoginPage";

// 컴포넌트
import NotesListHeader from "../../components/Concept/NotesListPage/NotesListHeader";
import ConceptGrid from "../../components/Concept/ConceptGrid";
import NoteCard from "../../components/Concept/NotesListPage/NoteCard";
import EmptyNotesState from "../../components/Concept/NotesListPage/EmptyNotesState";
import NoteSearchBar from "../../components/Concept/NotesListPage/noteSearchBar";

export default function NotesListPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [notes, setNotes] = useState<NoteSummaryResponse[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 초기 데이터 로딩 (유저 ID 및 전체 노트)
  useEffect(() => {
    const initNotes = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        setUserId(currentUserId);

        const data = await NoteListService.getUserNotes({
          userId: currentUserId,
        });
        setNotes(data);
      } catch (error) {
        toast.error("노트 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initNotes();
  }, []);

  // 3. 엔터 검색 핸들러
  const handleSearch = async (keyword: string) => {
    if (!userId ) return;

    try {
      const data = keyword.trim()
        ? await NoteListService.searchUserNotes({ userId, keyword })
        : await NoteListService.getUserNotes({ userId });
      setNotes(data);
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

  // 4. 핸들러
  const handleCreateClick = () => navigate("/notes/create");
  const handleNoteClick = (id: string) => navigate(`/notes/${id}`);

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 상단 헤더 및 생성 버튼 */}
      <NotesListHeader
        title="My Notes"
        description="Personal concept notes organized by you"
        onCreateClick={handleCreateClick}
      />

      {/* 2. 검색 바 - onSearch로 변경 (엔터 시 실행) */}
      <NoteSearchBar onSearch={handleSearch} />

      {/* 3. 리스트 표시 영역 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 mb-4 text-blue-500 animate-spin" />
          <p className="text-gray-500">Bringing your notes...</p>
        </div>
      ) : notes.length > 0 ? (
        <ConceptGrid>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id.toString()}
              title={note.title}
              concepts={note.concepts}
              lastUpdated={note.lastUpdated}
              description={note.description}
              onClick={handleNoteClick}
            />
          ))}
        </ConceptGrid>
      ) : (
        <EmptyNotesState onCreateClick={handleCreateClick} />
      )}
    </div>
  );
}
