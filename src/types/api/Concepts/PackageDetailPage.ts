export interface RelatedMaterial {
  id: string;
  name: string;
}

export interface PackageManagerDetail {
  id: number;
  name: string;
  description: string;
  content: string;
  category: string[]; // DB의 text[] 타입 매핑
  documentUrl: string | null;
  representativeImageUrl: string | null;
  isUnderstood: boolean;
  relatedMaterials: RelatedMaterial[];
}
