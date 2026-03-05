/**
 * [GetNoteDetailParams]
 * 노트 상세 조회 파라미터
 */
export interface GetNoteDetailParams {
  noteId: string;
}

/**
 * [DeleteNoteDetailParams]
 * 노트 삭제 파라미터
 */
export interface DeleteNoteDetailParams {
  noteId: string;
}

/**
 * [SummarizeNoteWithAIParams]
 * AI 노트 요약 파라미터
 */
export interface SummarizeNoteWithAIParams {
  content: string;
}

export interface NoteDetailResponse {
  noteId: string;
  title: string;
  lastUpdated: string;
  content: string;
  conceptNames: string[];
  toolNames: string[];
  libraryNames: string[];
  packageManagerNames: string[];
  thirdPartyNames: string[];
}
