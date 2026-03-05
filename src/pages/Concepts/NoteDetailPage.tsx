import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { NoteDetailResponse } from "../../types/api/Concepts/NoteDetailPage";
import { NoteDetailService } from "../../api/Concepts/NoteDetailPage";

// 컴포넌트
import BackButton from "../../components/Concepts/BackButton";
import NoteDetailHeader from "../../components/Concepts/NoteDetailPage/NoteDetailHeader";
import NoteActionButtons from "../../components/Concepts/NoteDetailPage/NoteActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";

export default function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [note, setNote] = useState<NoteDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // 2. 초기 데이터 로드
  useEffect(() => {
    const fetchNoteDetail = async () => {
      if (!noteId) return;
      try {
        setIsLoading(true);
        const data = await NoteDetailService.getNoteDetail({ noteId });
        setNote(data);
      } catch (error: any) {
        toast.error("노트를 불러오는 데 실패했습니다.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoteDetail();
  }, [noteId]);

  // 3. 핸들러 로직

  // 수정 페이지 이동
  const handleEdit = () => {
    if (!note) return;
    navigate(`/notes/${note.noteId}/edit`);
  };

  // 노트 삭제
  const handleDelete = async () => {
    if (!noteId || !window.confirm("정말로 이 노트를 삭제하시겠습니까?"))
      return;

    try {
      setIsDeleting(true);
      await NoteDetailService.deleteNote({ noteId });
      toast.success("노트가 삭제되었습니다.");
      navigate("/notes");
    } catch (error) {
      toast.error("노트 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 4. 예외 및 로딩 처리 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="mt-4 text-gray-500">노트 내용을 불러오는 중...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-5xl p-8 mx-auto text-center">
        <p className="mb-4 text-gray-600">노트를 찾을 수 없습니다.</p>
        <BackButton to="/notes" label="Back to Notes list" />
      </div>
    );
  }

  // 서비스에서 온 중첩된 개념 데이터를 문자열 배열로 변환
  const formattedConcepts: string[] = [
    ...(note.conceptNames || []),
    ...(note.toolNames || []),
    ...(note.libraryNames || []),
    ...(note.packageManagerNames || []),
    ...(note.thirdPartyNames || []),
  ];

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/notes" label="Back to Notes" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start justify-between mb-6">
          {/* 2. 헤더 정보 (제목, 가공된 개념 배열, 날짜) */}
          <NoteDetailHeader
            title={note.title}
            concepts={formattedConcepts}
            lastUpdated={note.lastUpdated}
          />

          {/* 3. 액션 버튼 (수정, 삭제) */}
          <NoteActionButtons
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>

        {/* 구분선 */}
        <hr className="mb-8 border-gray-100" />

        {/* 4. 본문 영역 */}
        <div className="prose max-w-none min-h-[400px]">
          <MarkdownRenderer content={note.content || "내용이 없습니다."} />
        </div>
      </div>
    </div>
  );
}
