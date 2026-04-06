import { ConceptItem } from "../../common/Concepts";

/**
 * [GetNoteByIdParams]
 * 단일 노트 조회 파라미터
 */
export interface GetNoteByIdParams {
  noteId: string;
}

/**
 * [CreateNoteParams]
 * 노트 생성 파라미터
 */
export interface CreateNoteParams {
  title: string;
  prompt: string;
  description: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: string;
  concepts: ConceptItem[];
}

/**
 * [GetConceptsByType]
 * 자료 타입에 따라 최신꺼 10개 반환하는 api 파라미터
 */
export interface GetConceptsByType {
  type: string;
  page: number;
}