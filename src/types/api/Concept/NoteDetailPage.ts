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

export interface NoteDetailResponse {
  noteId: string;
  title: string;
  labels: string[];
  description: string;
  lastUpdated: string;
  content: string;
  concepts: string[];
}

// updateNoteMeta 파라미터 타입
export interface UpdateNoteMetaParams {
  noteId: string;
  title: string;
  description: string;
  labels: string[];
}
