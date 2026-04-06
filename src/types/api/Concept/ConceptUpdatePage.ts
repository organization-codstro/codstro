import { ConceptItem, UpdateChatMessage } from "../../common/Concepts";

/**
 * [GetConceptByIdParams]
 * 단일 컨셉 조회 파라미터
 */
export interface GetConceptContentByIdParams {
  conceptId: string;
}

export interface GetConceptContentByIdResponse {
  content: string;
}

/**
 * [UpdateConceptParams]
 * 컨셉 수정 파라미터
 */
export interface UpdateConceptParams {
  id: string;
  title: string;
  content: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: string;
  concept: ConceptItem[];
  description: string;
}

/**
 * [UpdateConceptAIRequest]
 * 컨셉 업데이트 chat 파라미터 (입력 타입)
 */
export interface ConceptUpdateAIRequest {
  conceptId: string;
  messages: UpdateChatMessage[];
}

/**
 * [UpdateConceptAIResponse]
 * 컨셉 업데이트 chat 반환 타입
 */
export interface ConceptUpdateAIResponse {
  reply: string;
  updatedConcept: string | null;
}
