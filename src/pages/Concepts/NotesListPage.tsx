import { useNavigate } from "react-router-dom";
import { notes } from "../../data/Concepts/notes";
import NotesListHeader from "../../components/Concepts/NotesListPage/NotesListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import NoteCard from "../../components/Concepts/NotesListPage/NoteCard";
import EmptyNotesState from "../../components/Concepts/NotesListPage/EmptyNotesState";

export default function NotesList() {
  const navigate = useNavigate();

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

      {/* 2. 검색 바 (재사용) */}
      <ConceptSearchBar onSearchChange={(val) => console.log("Search:", val)} />

      {/* 3. 리스트 표시 (Empty State 조건부 렌더링 포함) */}
      {notes.length > 0 ? (
        <ConceptGrid>
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} onClick={handleNoteClick} />
          ))}
        </ConceptGrid>
      ) : (
        <EmptyNotesState onCreateClick={handleCreateClick} />
      )}
    </div>
  );
}
