import { supabase } from "../../db/supabase/supabase";
import {
  NoticeResponse,
  GetNoticeByIdParams,
  MarkNoticeAsReadParams,
  GetNoticesWithReadStatusParams,
} from "../../types/api/Notice/NoticeDetailPage";

export const NoticeDetailService = {
  /**
   * [모든 공지사항 목록 조회]
   * 'notices' 테이블의 모든 데이터를 최신순으로 가져옵니다.
   */
  async getNotices(): Promise<NoticeResponse[]> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("[getNotices Error]:", error);
      throw error;
    }
  },

  /**
   * [공지사항 상세 조회]
   * @param params 조회 파라미터
   * 'notices' 테이블에서 ID가 일치하는 단일 행을 반환합니다.
   */
  async getNoticeById(
    params: GetNoticeByIdParams
  ): Promise<NoticeResponse | null> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("notice_id", params.noticeId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getNoticeById Error]:", error);
      return null;
    }
  },

  /**
   * [공지사항 읽음 상태 확인 및 업데이트]
   * @param params 유저 ID와 공지 ID
   * 'user_notice_reads' 테이블에 읽음 기록을 생성하거나 확인합니다.
   */
  async markAsRead(params: MarkNoticeAsReadParams): Promise<void> {
    try {
      const { error } = await supabase.from("user_notice_reads").upsert(
        {
          user_id: params.userId,
          notices_id: params.noticeId,
          is_read: true,
          read_at: new Date().toISOString(),
        },
        { onConflict: "user_id, notices_id" }
      );

      if (error) throw error;
    } catch (error) {
      console.error("[markAsRead Error]:", error);
    }
  },

  /**
   * [유저별 읽음 상태 포함 공지 목록 조회]
   * @param params 유저 ID
   * 공지 목록과 해당 유저의 읽음 여부를 조인하여 가져옵니다.
   */
  async getNoticesWithReadStatus(params: GetNoticesWithReadStatusParams) {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select(
          `
          *,
          user_notice_reads!left (
            is_read
          )
        `
        )
        .eq("user_notice_reads.user_id", params.userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getNoticesWithReadStatus Error]:", error);
      throw error;
    }
  },
};
