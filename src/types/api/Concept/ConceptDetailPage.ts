/**
 * LibraryDetailService 전용 타입 정의
 * 서비스 로직과 타입을 분리하여
 * 유지보수성과 재사용성을 높이기 위한 목적
 */

/**
 * 라이브러리 상세 조회 파라미터
 */
export interface GetConceptDetailParams {
  conceptId: string;
  userId: string;
}



/**
 * 라이브러리 Todo 생성 파라미터
 */
export interface AddConceptTodoParams {
  userId: string;
  conceptName: string;
  type: string;
}

interface RelatedItem {
  id: string;
  name: string;
  type: string;
}

export interface ConceptDetailResponse {
  id: string;
  name: string;
  field: string;
  category: string[];
  tags: string[];
  officialSite: string | null;
  description: string;
  content: string;
  relatedConcepts: RelatedItem[];
}

export interface DeleteConceptDetailParams {
  conceptId : string;
}