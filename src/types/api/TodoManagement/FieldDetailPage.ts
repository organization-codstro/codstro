import { FieldDetailService } from "../../../api/TodoManagement/FieldDetailPage";

/**
 * [분야 상세 정보 조회 파라미터]
 */
export interface GetFieldDetailWithPinsParams {
  fieldId: string;
}

/**
 * [분야 그룹 할당 파라미터]
 */
export interface AssignFieldToGroupParams {
  field_name: string;
  field_description: string;
  group_id: string;
  field_is_recommendation: boolean;
}

/**
 * [핀 조회 파라미터]
 */
export interface GetPinByIdParams {
  pinId: string;
}

/**
 * [분야 상세 정보 및 핀 목록 응답 타입]
 */
export type FieldDetailWithPins = Awaited<
  ReturnType<typeof FieldDetailService.getFieldDetailWithPins>
>;
