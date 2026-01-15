export interface PackageManagerSummary {
  id: string;
  name: string;
  description: string;
  category: string[]; // DB의 text[] 타입
  representativeImageUrl?: string;
}
