import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { NoteListService } from "../../api/Concepts/NotesListPage";
import { NoteSummaryResponse } from "../../types/api/Concepts/NotesListPage";
import { LoginService } from "../../api/Auth/LoginPage";

// 컴포넌트
import NotesListHeader from "../../components/Concepts/NotesListPage/NotesListHeader";
import ConceptSearchBar from "../../components/Concepts/LibraryDetailPage/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import NoteCard from "../../components/Concepts/NotesListPage/NoteCard";
import EmptyNotesState from "../../components/Concepts/NotesListPage/EmptyNotesState";

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
        setUserId(currentUserId);

        if (currentUserId) {
          const data = await NoteListService.getUserNotes({
            userId: currentUserId,
          });
          setNotes(data);
        }
      } catch (error) {
        toast.error("노트 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initNotes();
  }, []);

  // 3. 검색 로직 (Debounce 500ms 적용)
  useEffect(() => {
    // 초기 로딩 중이거나 유저 ID가 없을 때는 실행 방지
    if (isLoading || !userId) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = searchTerm.trim()
          ? await NoteListService.searchUserNotes({
              userId,
              keyword: searchTerm,
            })
          : await NoteListService.getUserNotes({ userId });
        setNotes(data);
      } catch (error) {
        console.error("Search Error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, userId]);

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

      {/* 2. 검색 바 */}
      <ConceptSearchBar onSearchChange={(val) => setSearchTerm(val)} />

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
              id={note.id.toString()} // NoteCard가 string ID를 기대할 경우
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
