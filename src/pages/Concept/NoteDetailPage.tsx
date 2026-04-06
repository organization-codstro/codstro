import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { NoteDetailResponse } from "../../types/api/Concept/NoteDetailPage";
import { NoteDetailService } from "../../api/Concept/NoteDetailPage";

// 컴포넌트
import BackButton from "../../components/Concept/BackButton";
import NoteDetailHeader from "../../components/Concept/NoteDetailPage/NoteDetailHeader";
import NoteActionButtons from "../../components/Concept/NoteDetailPage/NoteActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import NotFoundPage from "../NotFound/NotFoundPage";
import NoteEditMetaModal from "../../components/Concept/NoteDetailPage/Noteeditmetamodal";

export default function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [note, setNote] = useState<NoteDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmMode, setDeleteConfirmMode] = useState(false);
  const deleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 기본 정보 수정 모달
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);
  const [isSavingMeta, setIsSavingMeta] = useState(false);

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

  // 마크다운 수정 페이지 이동
  const handleEdit = () => {
    if (!note) return;
    navigate(`/notes/${note.noteId}/edit`);
  };

  // 기본 정보 수정 모달 저장
  const handleSaveMeta = async (data: {
    title: string;
    description: string;
    labels: string[];
  }) => {
    if (!noteId) return;
    try {
      setIsSavingMeta(true);
      await NoteDetailService.updateNoteMeta({
        noteId,
        title: data.title,
        description: data.description,
        labels: data.labels,
      });
      // 로컬 상태 업데이트 (재요청 없이 반영)
      setNote((prev) =>
        prev
          ? {
              ...prev,
              title: data.title,
              description: data.description,
              labels: data.labels,
            }
          : prev,
      );
      toast.success("노트 정보가 수정되었습니다.");
      setIsMetaModalOpen(false);
    } catch (error) {
      toast.error("노트 정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSavingMeta(false);
    }
  };

  // 노트 삭제
  const handleDelete = async () => {
    if (!noteId) return;

    // 1단계: 확인 모드 진입 (3초 타이머)
    if (!deleteConfirmMode) {
      setDeleteConfirmMode(true);
      deleteTimerRef.current = setTimeout(() => {
        setDeleteConfirmMode(false);
      }, 3000);
      return;
    }

    // 2단계: 확인 모드에서 한 번 더 누르면 실제 삭제
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    setDeleteConfirmMode(false);

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

  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    };
  }, []);

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
    return <NotFoundPage />;
  }


  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/notes" label="Back to Notes" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start justify-between mb-6">
          {/* 2. 헤더 정보 */}
          <NoteDetailHeader
            title={note.title}
            concepts={note.concepts}
            lastUpdated={note.lastUpdated}
          />

          {/* 3. 액션 버튼 */}
          <NoteActionButtons
            onEdit={handleEdit}
            onEditMeta={() => setIsMetaModalOpen(true)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            deleteConfirmMode={deleteConfirmMode}
          />
        </div>

        <hr className="mb-8 border-gray-100" />

        {/* 4. 본문 영역 */}
        <div className="prose max-w-none min-h-[400px]">
          <MarkdownRenderer content={note.content || "내용이 없습니다."} />
        </div>
      </div>

      {/* 5. 기본 정보 수정 모달 */}
      <NoteEditMetaModal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        onSave={handleSaveMeta}
        initialTitle={note.title}
        initialDescription={note.description || ""}
        initialLabels={note.labels || []}
        isSaving={isSavingMeta}
      />
    </div>
  );
}
