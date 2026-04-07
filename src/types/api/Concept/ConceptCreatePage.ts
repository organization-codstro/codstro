import { ConceptItem } from "../../common/Concepts";

/**
 * [GetNoteByIdParams]
 * 단일 개념 조회 파라미터
 */
export interface GetConceptByIdParams {
  conceptId: string;
}

/**
 * [CreateNoteParams]
 * 개념 생성 파라미터
 */
export interface CreateConceptParams {
  title: string;
  prompt: string;
  description: string;
  categories: string[]; // concepts 목록을 labels로 활용
  userId: string;
  concepts: ConceptItem[];
}
