/**
 * ConceptUpdatePage.jsx
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
import { useConceptEditor } from "../../hooks/Concepts/Concepteditorpage";
import ConceptEditorHeader from "../../components/Concept/ConceptUpdatePage/ConceptEditorHeader";
import EditorPanel from "../../components/Concept/ConceptUpdatePage/EditorPanel";
import PreviewPanel from "../../components/Concept/ConceptUpdatePage/PreviewPanel";
import ChatPanel from "../../components/Concept/ConceptUpdatePage/ChatPanel/ChatPanel";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function ConceptUpdatePage() {
  const navigate = useNavigate();
  const { conceptId } = useParams<{ conceptId: string }>();

  const editor = useConceptEditor({
    conceptId: conceptId ?? "",
  });

  if (!conceptId) {
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
    pendingConcept,
    handleSave,
    handleToggleChat,
    handleSend,
    handleAccept,
    handleReject,
  } = editor;

  const onBack = () => {
    navigate(`/concepts/${conceptId}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-zinc-100">
      <ConceptEditorHeader
        isDirty={isDirty}
        onSave={handleSave}
        onBack={onBack}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorPanel
          markdown={markdown}
          onChange={setMarkdown}
          chatOpen={chatOpen}
          isLoading={isLoading}
        />

        <div className="flex-shrink-0 w-px bg-zinc-200" />

        <PreviewPanel markdown={markdown} isLoading={isLoading} />

        <div
          className={`flex-shrink-0 bg-zinc-200 transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] ${
            chatOpen ? "w-px opacity-100" : "w-0 opacity-0"
          }`}
        />

        <ChatPanel
          chatOpen={chatOpen}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          onSend={handleSend}
          pendingConcept={pendingConcept}
          currentMarkdown={markdown}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>

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
