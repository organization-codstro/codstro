import { NOTICE_TYPE } from "../../../constants/Notice/notice";

export interface NoticeListItemResponse {
  notice_id: string;
  notice_title: string;
  notice_content: string; // preview 대용으로 앞부분 사용
  notice_type: NOTICE_TYPE;
  created_at: string;
}

/**
 * [GetNoticesByTypeParams]
 * 카테고리별 공지사항 조회를 위한 파라미터
 */
export interface GetNoticesByTypeParams {
  type: NOTICE_TYPE;
}
