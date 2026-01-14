export interface PackageManagerMaterial {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string[];
  documentUrl: string;
  representativeImageUrl: string;
  imageUrls: string[];
  isUnderstood?: boolean;
  relatedMaterials?: string[]; // 관련 자료의 ID 배열
}

export interface PackageManagerMaterialsListPageProps {
  materials: PackageManagerMaterial[];
}
