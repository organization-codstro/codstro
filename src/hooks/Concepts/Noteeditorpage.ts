/**
 * useNoteEditor.ts
 *
 * NoteEditor의 모든 상태와 비즈니스 로직을 담당하는 커스텀 훅.
 *
 * 관리 항목:
 *  - markdown          : 현재 에디터의 마크다운 내용
 *  - savedMarkdown     : 마지막으로 저장된 마크다운 (dirty 감지용)
 *  - isDirty           : 미저장 변경 여부
 *  - chatOpen          : 채팅 패널 열림/닫힘
 *  - messages          : 채팅 메시지 목록 [{ role, content }]
 *  - inputValue        : 채팅 입력창 현재 값
 *  - isLoading         : AI 응답 대기 중 여부
 *
 * 제공 핸들러:
 *  - handleSave        : 현재 마크다운을 저장 (savedMarkdown 갱신)
 *  - handleToggleChat  : 채팅 패널 토글 (로딩 중 불가)
 *  - handleSend        : 메시지 전송 → Edge Function 호출 → 응답 반영
 *  - setMarkdown       : 에디터 내용 변경
 *  - setInputValue     : 채팅 입력창 내용 변경
 *
 * Props:
 *  - noteId            : Edge Function에 전달할 노트 UUID (필수)
 *  - initialMarkdown   : 에디터 초기 마크다운 내용
 */

//todo : setMarkdown, setSavedMarkdown 에 id로 기존 마크다운 가져와서 넣는 함수 실행

import { useState, useEffect, useCallback } from "react";
import { UpdateChatMessage } from "../../types/common/Concepts";
import { UseNoteEditorProps } from "../../types/hooks/Concepts/Noteeditorpage";
import { NoteUpdatePageService } from "../../api/Concept/NoteUpdatePage";
import {
  GetNoteContentByIdParams,
  GetNoteContentByIdResponse,
} from "../../types/api/Concept/NoteUpdatePage";

export function useNoteEditor({ noteId }: UseNoteEditorProps) {
  const [markdown, setMarkdown] = useState<string>("");
  const [savedMarkdown, setSavedMarkdown] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<UpdateChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // AI가 제안한 수정안 — null이면 대기 중인 수정 없음
  const [pendingNote, setPendingNote] = useState<string | null>(null);

  // ── 변경 감지 ────────────────────────────────────────────────────────
  useEffect(() => {
    setIsDirty(markdown !== savedMarkdown);
  }, [markdown, savedMarkdown]);

  // ── 페이지 이탈 경고 ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ── 노트id 의 마크다운 가져와 저장 ─────────────────────────────────────
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const params: GetNoteContentByIdParams = { noteId };
        const result: GetNoteContentByIdResponse =
          await NoteUpdatePageService.getNoteContentById(params);
        setMarkdown(result.content);
        setSavedMarkdown(result.content);
      } catch (err) {
        console.error("Failed to fetch note content:", err);
      }
    };

    fetchContent();
  }, [noteId]);

  // ── 저장 ─────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    try {
      await NoteUpdatePageService.saveNote({ noteId, content: markdown });
      setSavedMarkdown(markdown);
      setIsDirty(false);
    } catch (err) {
      console.error("[handleSave] Failed to save note:", err);
    }
  }, [markdown, noteId]);

  // ── 채팅 토글 ────────────────────────────────────────────────────────
  const handleToggleChat = useCallback(() => {
    if (isLoading) return;
    setChatOpen((v) => !v);
  }, [isLoading]);

  // ── 메시지 전송 ──────────────────────────────────────────────────────
  // 매 요청마다 전체 대화 히스토리(nextMessages)를 Edge Function에 전송합니다.
  // updatedNote가 반환되면 에디터에 즉시 반영하고 isDirty를 true로 만듭니다.
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const nextMessages: UpdateChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const result = await NoteUpdatePageService.callAI({
        noteId,
        messages: nextMessages,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply },
      ]);

      // 수정안이 있으면 pendingNote에 보관 (에디터 즉시 반영 X)
      if (result.updatedNote) {
        setPendingNote(result.updatedNote);
      }
    } catch (err) {
      console.error("[useNoteEditor] callAI failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, noteId]);

  // ── 수락: pendingNote를 에디터에 반영 ────────────────────────────────
  const handleAccept = useCallback(() => {
    if (!pendingNote) return;
    setMarkdown(pendingNote);
    setPendingNote(null);
  }, [pendingNote]);

  // ── 거절: pendingNote 폐기 ───────────────────────────────────────────
  const handleReject = useCallback(() => {
    setPendingNote(null);
  }, []);

  return {
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
  };
}
