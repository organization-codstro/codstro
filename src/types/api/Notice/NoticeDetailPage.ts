import { NOTICE_TYPE } from "../../../constants/Notice/notice";

export interface NoticeResponse {
  notices_id: string;
  notice_title: string;
  notice_content: string;
  notice_type: NOTICE_TYPE;
  notice_created_date: string;
  notice_updated_date: string;
}

/**
 * [GetNoticeByIdParams]
 * 공지사항 상세 조회를 위한 파라미터
 */
export interface GetNoticeByIdParams {
  noticeId: string;
}

/**
 * [MarkNoticeAsReadParams]
 * 공지사항 읽음 상태 업데이트를 위한 파라미터
 */
export interface MarkNoticeAsReadParams {
  userId: string;
  noticeId: string;
}

/**
 * [GetNoticesWithReadStatusParams]
 * 유저별 읽음 상태 포함 공지 목록 조회 파라미터
 */
export interface GetNoticesWithReadStatusParams {
  userId: string;
}
