/**
 * Concepteditorpage.jsx
 *
 * 역할:
 *  - useNoteEditor 훅에서 모든 상태/핸들러를 가져와 하위 컴포넌트에 전달
 *  - 레이아웃 구성: Header / EditorPanel / Divider / (PreviewPanel | ChatPanel) / FAB
 *  - FAB 클릭 시 채팅 패널 토글 (아이콘: MessageSquare ↔ FileText)
 *
 * Props:
 *  - onBack: () => void  — 뒤로가기 버튼 클릭 시 호출 (노트 상세 화면으로 이동)
 */

import { useState, useEffect, useCallback } from "react";
import { UpdateChatMessage } from "../../types/common/Concepts";
import { UseConceptEditorProps } from "../../types/hooks/Concepts/Concepteditorpage";
import { ConceptUpdatePageService } from "../../api/Concept/ConceptUpdatePage";
import {
  GetConceptContentByIdParams,
  GetConceptContentByIdResponse,
} from "../../types/api/Concept/ConceptUpdatePage";

export function useConceptEditor({ conceptId }: UseConceptEditorProps) {
  const [markdown, setMarkdown] = useState<string>("");
  const [savedMarkdown, setSavedMarkdown] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<UpdateChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pendingConcept, setPendingConcept] = useState<string | null>(null);

  useEffect(() => {
    setIsDirty(markdown !== savedMarkdown);
  }, [markdown, savedMarkdown]);

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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const params: GetConceptContentByIdParams = { conceptId };
        const result: GetConceptContentByIdResponse =
          await ConceptUpdatePageService.getConceptContentById(params);
        setMarkdown(result.content);
        setSavedMarkdown(result.content);
      } catch (err) {
        console.error("Failed to fetch concept content:", err);
      }
    };

    fetchContent();
  }, [conceptId]);

  const handleSave = useCallback(async () => {
    try {
      await ConceptUpdatePageService.saveConcept({
        conceptId,
        content: markdown,
      });
      setSavedMarkdown(markdown);
      setIsDirty(false);
    } catch (err) {
      console.error("[handleSave] Failed to save concept:", err);
    }
  }, [markdown, conceptId]);

  const handleToggleChat = useCallback(() => {
    if (isLoading) return;
    setChatOpen((v) => !v);
  }, [isLoading]);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: UpdateChatMessage = { role: "user", content: text };

    // 함수형 업데이트로 통일 — stale closure 방지
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // API에는 현재 messages + userMessage를 직접 조합해서 전달
      const snapshot = [...messages, userMessage];

      const result = await ConceptUpdatePageService.callAI({
        conceptId,
        messages: snapshot,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply },
      ]);

      if (result.updatedConcept) {
        setPendingConcept(result.updatedConcept);
      }
    } catch (err) {
      console.error("[useConceptEditor] callAI failed:", err);
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
  }, [inputValue, isLoading, messages, conceptId]);

  const handleAccept = useCallback(() => {
    if (!pendingConcept) return;
    setMarkdown(pendingConcept);
    setPendingConcept(null);
  }, [pendingConcept]);

  const handleReject = useCallback(() => {
    setPendingConcept(null);
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
    pendingConcept,
    handleSave,
    handleToggleChat,
    handleSend,
    handleAccept,
    handleReject,
  };
}
