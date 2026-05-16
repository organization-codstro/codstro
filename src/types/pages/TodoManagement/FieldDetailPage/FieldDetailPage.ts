/**
 * [분야 상세 응답 데이터 타입]
 */
export interface FieldDetailData {
  field_id: string;
  field_name: string;
  field_description: string;
  field_created_date: string;
  groups: {
    group_id: string;
    group_name: string;
    group_description: string;
  };
  pins: any[];
}
