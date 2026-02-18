/**
 * [GetOrDrawTodayFortuneParams]
 * 오늘의 운세 조회/생성 요청 파라미터
 */
export interface GetOrDrawTodayFortuneParams {
  userId: string;
}

/**
 * [DeveloperFortuneRecord]
 * developer_fortunes 테이블 원본 데이터 타입
 */
export interface DeveloperFortuneRecord {
  developer_fortune_id: string;
  fortune_code: number;
  fortune_name: string;
  fortune_summary: string;
  fortune_description: string;
  fortune_category_message: string;
  fortune_color_gradient: string;
}
