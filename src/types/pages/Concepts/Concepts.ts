import { MATERIAL_TYPE } from "../../../constants/Concepts/concepts";

/**
 * [GetConceptsByType]
 * 자료 타입에 따라 최신꺼 10개 반환하는 api 파라미터
 */
export interface GetConceptsByType {
  type: MATERIAL_TYPE | "all";
  page: number;
}
