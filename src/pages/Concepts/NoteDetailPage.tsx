import { useNavigate, useParams } from "react-router-dom";
import { note } from "../../data/Concepts/notes";
import BackButton from "../../components/Concepts/BackButton";
import NoteDetailHeader from "../../components/Concepts/NoteDetailPage/NoteDetailHeader";
import NoteActionButtons from "../../components/Concepts/NoteDetailPage/NoteActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";

export default function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  // 데이터 예외 처리
  if (!note) return <p className="p-8 text-center">Note not found.</p>;

  const handleEdit = () => {
    navigate(`/notes/${note.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 노트를 삭제하시겠습니까?")) {
      // TODO: 삭제 API 호출 로직
      console.log("Note deleted:", note.id);
      navigate("/notes");
    }
  };

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/notes" label="Back to Notes" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-start justify-between mb-6">
          {/* 2. 헤더 정보 (제목, 태그, 날짜) */}
          <NoteDetailHeader
            title={note.title}
            concepts={note.concepts}
            lastUpdated={note.lastUpdated}
          />

          {/* 3. 액션 버튼 (수정, 삭제) */}
          <NoteActionButtons onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        {/* 4. 본문 영역 */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={note.content} />
        </div>
      </div>
    </div>
  );
}
