/**
 * NoteEditorPage.jsx
 *
 * 역할:
 *  - useNoteEditor 훅에서 모든 상태/핸들러를 가져와 하위 컴포넌트에 전달
 *  - 레이아웃 구성: Header / EditorPanel / Divider / (PreviewPanel | ChatPanel) / FAB
 *  - FAB 클릭 시 채팅 패널 토글 (아이콘: MessageSquare ↔ FileText)
 *
 * Props:
 *  - onBack: () => void  — 뒤로가기 버튼 클릭 시 호출 (노트 상세 화면으로 이동)
 */

import { useNavigate, useParams } from "react-router-dom";
import { MessageSquare, FileText } from "lucide-react";
import { useNoteEditor } from "../../hooks/Concepts/Noteeditorpage";
import NoteEditorHeader from "../../components/Concepts/NoteUpdatePage/NoteEditorHeader";
import EditorPanel from "../../components/Concepts/NoteUpdatePage/EditorPanel";
import PreviewPanel from "../../components/Concepts/NoteUpdatePage/PreviewPanel";
import ChatPanel from "../../components/Concepts/NoteUpdatePage/ChatPanel/ChatPanel";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function NoteEditorPage() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  if (!noteId) {
    return <NotFoundPage />;
  }

  const {
    markdown,
    setMarkdown,
    isDirty,
    chatOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    pendingNote,
    handleSave,
    handleToggleChat,
    handleSend,
    handleAccept,
    handleReject,
  } = useNoteEditor({ noteId });

  const onBack = () => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-zinc-100">
      {/* ── 헤더 ── */}
      <NoteEditorHeader isDirty={isDirty} onSave={handleSave} onBack={onBack} />

      {/* ── 바디 ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽: Monaco 에디터 — 채팅 열리면 슬라이드아웃 */}
        <EditorPanel
          markdown={markdown}
          onChange={setMarkdown}
          chatOpen={chatOpen}
          isLoading={isLoading}
        />

        {/* 구분선 — 항상 표시 (에디터↔미리보기, 미리보기↔채팅 모두 동일) */}
        <div className="flex-shrink-0 w-px bg-zinc-200" />

        {/* 미리보기 — 채팅 열려도 왼쪽에 유지 */}
        <PreviewPanel markdown={markdown} isLoading={isLoading}/>

        {/* 채팅 구분선 — 채팅 열릴 때만 표시 */}
        <div
          className={`flex-shrink-0 bg-zinc-200 transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] ${
            chatOpen ? "w-px opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* 채팅 패널 — 오른쪽에서 슬라이드인 */}
        <ChatPanel
          chatOpen={chatOpen}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          onSend={handleSend}
          pendingNote={pendingNote}
          currentMarkdown={markdown}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>

      {/* ── FAB: 채팅 ↔ 에디터 토글 ── */}
      <button
        onClick={handleToggleChat}
        title={chatOpen ? "에디터로 돌아가기" : "AI 채팅 열기"}
        className={`fixed bottom-7 right-7 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-200 ${
          isLoading
            ? "bg-zinc-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95"
        } text-white`}
      >
        {chatOpen ? <FileText size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
}
