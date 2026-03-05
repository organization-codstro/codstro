import { ConceptItem } from "../../common/concepts";

/**
 * [GetNoteByIdParams]
 * 단일 노트 조회 파라미터
 */
export interface GetNoteByIdParams {
  noteId: string;
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

export interface GenerateNoteContentParams {
  concepts: string[];
}

export interface getNoteConceptsParams {
  NoteId: string;
}

export interface getNoteConceptsResponse {
  noteConceptIds: ConceptItem[];
}
