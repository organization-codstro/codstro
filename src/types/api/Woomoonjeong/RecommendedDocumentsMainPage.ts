/**
 * [추천 핀 목록 조회 파라미터]
 */
export interface GetRecommendedPinsParams {
  searchQuery?: string;
}

/**
 * [추천 분야 목록 조회 파라미터]
 */
export interface GetRecommendedFieldsParams {
  searchQuery?: string;
}

/**
 * [추천 핀 추가 파라미터]
 */
export interface AddRecommendedPinToMyFieldParams {
  pin_title: string;
  pin_description: string;
  pin_url: string;
  pin_label?: string;
  field_id: string;
}

/**
 * [추천 분야 추가 파라미터]
 */
export interface AddRecommendedFieldToMyGroupParams {
  field_name: string;
  field_description: string;
  group_id: string;
}

/**
 * [링크 클릭 추적 파라미터]
 */
export interface TrackLinkClickParams {
  url: string;
}
