import { ConceptItem, UpdateChatMessage } from "../../common/Concepts";

/**
 * [GetNoteByIdParams]
 * 단일 노트 조회 파라미터
 */
export interface GetNoteContentByIdParams {
  noteId: string;
}

export interface GetNoteContentByIdResponse {
  content: string;
}

/**
 * [SaveNoteParams]
 * 노트 수정 파라미터
 */
export interface UpdateNoteParams {
  id: string;
  title: string;
  content: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: string;
  concept: ConceptItem[];
  description: string;
}

/**
 * [SaveNoteParams]
 * 노트 업데이트 chat 파라미터 (입력 타입)
 */
export interface NoteUpdateAIRequest {
  noteId: string;
  messages: UpdateChatMessage[];
}

/**
 * [SaveNoteParams]
 * 노트 업데이트 chat 반환 타입
 */
export interface NoteUpdateAIResponse {
  reply: string;
  updatedNote: string | null;
}
