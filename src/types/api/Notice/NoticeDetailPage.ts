export type NoticeType = "update" | "maintenance" | "event" | "general";

export interface NoticeResponse {
  notices_id: number;
  notices_title: string;
  notice_content: string;
  notice_type: NoticeType;
  notice_created_date: string;
  notice_updated_date: string;
}

export interface NoticeReadStatus {
  is_read: boolean;
  read_at: string;
}
