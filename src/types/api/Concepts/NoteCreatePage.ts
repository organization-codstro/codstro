/**
 * [GetNoteByIdParams]
 * 단일 노트 조회 파라미터
 */
export interface GetNoteByIdParams {
  noteId: string;
}

/**
 * [SaveNoteParams]
 * 노트 생성/수정 파라미터
 */
export interface SaveNoteParams {
  id?: string;
  title: string;
  content: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: string;
  conceptIds: string[];
}

/**
 * [GenerateNoteContentParams]
 * AI 노트 본문 생성 파라미터
 */
export interface GenerateNoteContentParams {
  concepts: string[];
}

/**
 * [DeleteNoteParams]
 * 노트 삭제 파라미터
 */
export interface DeleteNoteParams {
  noteId: string;
}
