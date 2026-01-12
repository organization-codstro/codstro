export type NoticeTypeProps = "update" | "maintenance" | "event" | "general";

export interface NoticeListItemResponse {
  notices_id: string;
  notices_title: string;
  notice_content: string; // preview 대용으로 앞부분 사용
  notice_type: NoticeTypeProps;
  notice_created_date: string;
  is_pinned: boolean; // 중요 공지 여부 (기존 Mock 데이터의 isPinned 대응)
}

/**
 * [GetNoticesByTypeParams]
 * 카테고리별 공지사항 조회를 위한 파라미터
 */
export interface GetNoticesByTypeParams {
  type: NoticeTypeProps;
}
