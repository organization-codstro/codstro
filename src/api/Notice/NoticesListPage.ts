import { supabase } from "../../db/supabase/supabase";
import {
  NoticeListItemResponse,
  GetNoticesByTypeParams,
} from "../../types/api/Notice/NoticesListPage";

export const NoticesListService = {
  /**
   * [전체 공지사항 목록 조회]
   * 상단 고정(is_pinned) 우선, 그 다음 최신순(created_at)으로 정렬하여 가져옵니다.
   */
  async getAllNotices(): Promise<NoticeListItemResponse[]> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select(
          `
          notices_id,
          notices_title,
          notice_content,
          notice_type,
          notice_created_date,
          is_pinned
        `
        )
        .order("is_pinned", { ascending: false })
        .order("notice_created_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("[getAllNotices Error]:", error);
      throw error;
    }
  },

  /**
   * [카테고리별 공지사항 필터링]
   * @param params 공지 타입
   */
  async getNoticesByType(
    params: GetNoticesByTypeParams
  ): Promise<NoticeListItemResponse[]> {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("notice_type", params.type)
        .order("notice_created_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("[getNoticesByType Error]:", error);
      throw error;
    }
  },

  /**
   * [신규 공지사항 여부 확인 (AI 활용 가능 영역)]
   * 최근 3일 이내에 작성된 공지인지 체크하여 'NEW' 배지를 표시하기 위한 로직
   */
  isNewNotice(createdDate: string): boolean {
    const today = new Date();
    const created = new Date(createdDate);
    const diffTime = Math.abs(today.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  },
};
