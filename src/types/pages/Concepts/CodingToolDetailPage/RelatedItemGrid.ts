import { RelatedConcept } from "../../../common/concepts";

export interface RelatedItemGridProps {
  title?: string;
  items?: RelatedConcept[];
  basePath: string; // 이동할 경로의 기본 주소 (예: "/coding-tools" 또는 "/basic-concepts")
}
