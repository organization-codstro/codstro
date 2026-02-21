//개념 정보
export interface Concept {
  id: string;
  name: string;
  type: string;
}

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
