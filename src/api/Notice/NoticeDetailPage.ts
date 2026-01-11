import { supabase } from "../../db/supabase/supabase";
import { NoticeResponse } from "../../types/api/Notice/NoticeDetailPage";

export const NoticeService = {
  /**
   * [모든 공지사항 목록 조회]
   * 'notices' 테이블의 모든 데이터를 최신순으로 가져옵니다.
   */
  async getNotices(): Promise<NoticeResponse[]> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("notice_created_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("[getNotices Error]:", error);
      throw error;
    }
  },

  /**
   * [공지사항 상세 조회]
   * @param noticeId 조회할 공지의 UUID
   * 'notices' 테이블에서 ID가 일치하는 단일 행을 반환합니다.
   */
  async getNoticeById(noticeId: string): Promise<NoticeResponse | null> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("notices_id", noticeId)
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
   * @param userId 유저 ID
   * @param noticeId 공지 ID
   * 'user_notice_reads' 테이블에 읽음 기록을 생성하거나 확인합니다.
   */
  async markAsRead(userId: number, noticeId: string): Promise<void> {
    try {
      const { error } = await supabase.from("user_notice_reads").upsert(
        {
          user_id: userId,
          notices_id: noticeId,
          is_read: true,
          read_at: new Date().toISOString(),
        },
        { onConflict: "user_id, notices_id" } // 중복 읽음 방지
      );

      if (error) throw error;
    } catch (error) {
      console.error("[markAsRead Error]:", error);
    }
  },

  /**
   * [유저별 읽음 상태 포함 공지 목록 조회]
   * @param userId 유저 ID
   * 공지 목록과 해당 유저의 읽음 여부를 조인하여 가져옵니다.
   */
  async getNoticesWithReadStatus(userId: number) {
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
        .eq("user_notice_reads.user_id", userId)
        .order("notice_created_date", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getNoticesWithReadStatus Error]:", error);
      throw error;
    }
  },
};
