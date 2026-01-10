interface RelatedItem {
  id: string;
  name: string;
  type: string;
}

export interface RelatedItemGridProps {
  title?: string;
  items?: RelatedItem[];
  basePath: string; // 이동할 경로의 기본 주소 (예: "/coding-tools" 또는 "/basic-concepts")
}
