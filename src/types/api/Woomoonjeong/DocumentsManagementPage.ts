import { WOOMOONJEONG_HIERARCHY } from "../../../constants/Woomoonjeong/woomoonjeong";

/**
 * [그룹 생성 파라미터]
 */
export interface CreateGroupParams {
  group_name: string;
  group_description: string;
  user_id: string;
}

/**
 * [분야 생성 파라미터]
 */
export interface CreateFieldParams {
  field_name: string;
  field_description: string;
  group_id: string;
  field_is_recommendation: boolean;
}

/**
 * [분야 이름 수정 파라미터]
 */
export interface UpdateFieldNameParams {
  fieldId: string;
  newName: string;
}

/**
 * [핀 생성 파라미터]
 */
export interface CreatePinParams {
  pin_title: string;
  pin_description: string;
  pin_url: string;
  pin_label?: string[];
  field_id: string;
}

/**
 * [링크 카운트 업데이트 파라미터]
 */
export interface UpsertLinkCountParams {
  url: string;
}

/**
 * [삭제 파라미터]
 */
export interface DeleteItemParams {
  type: WOOMOONJEONG_HIERARCHY;
  id: string;
}

/**
 * [문서 검색 파라미터]
 */
export interface SearchDocumentsParams {
  query: string;
}
