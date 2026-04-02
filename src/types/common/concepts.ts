import { MATERIAL_TYPE } from "../../constants/Concepts/concepts";

//개념 정보
export interface Concept {
  id: string;
  name: string;
  type: string;
}

/**
 * 노트 생성, 업데이트 페이지에서 note_concepts 테이블 채우기 위해 내려 보네는 개념 자료 아이템
 * 노트 업데이트 페이지에서 노트에 포함되어 있던 개념들 확인하기 위해 조회후 db 함수에서 반환하는 아이템
 */
export type ConceptItem = {
  id: string; // concept id
  type?: MATERIAL_TYPE;
  name?: string;
};

export interface LibraryDescriptionMaterial {
  id: string;
  name: string;
  description: string;
  category: string[];
  content: string;
  documentUrl: string;
  includedLanguage: string;
  representativeImageUrl?: string;
}

//관련 개념
export interface RelatedConcept {
  id: string;
  name: string;
  type?: string;
}

//패키지 매니저 자료
export interface PackageManagerMaterial {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string[];
  documentUrl: string;
  representativeImageUrl: string;
  imageUrls: string[];
  isUnderstood: boolean;
  relatedMaterials?: RelatedConcept[]; // 관련 자료의 ID 배열
}

//리스트 패이지에서 나오는 페키지 매니저 자료
export interface PackageManagerSummary {
  id: string;
  name: string;
  description: string;
  category: string[];
  representativeImageUrl?: string;
}

/**
 * [GetConceptsByType]
 * 자료 타입에 따라 최신꺼 10개 반환하는 api 파라미터
 */
export interface GetConceptsByType {
  type: MATERIAL_TYPE | "all";
  page: number;
}

/**
 * [updateNoteMessage]
 * 노트 업데이트 할때 chat에 사용하는 메세지 타입
 */
export type UpdateNoteChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface AskConceptChatParams {
  material_id: string;
  material_type: MATERIAL_TYPE;
  messages: { role: "user" | "assistant"; content: string }[];
}
