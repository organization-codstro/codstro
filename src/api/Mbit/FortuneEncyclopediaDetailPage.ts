// services/FortuneService.ts
import { supabase } from "../../db/supabase/supabase";
import { Fortune } from "../../types/common/Mbit";

/**
 * [FortuneEncyclopediaService]
 * 개발 운세 관련 데이터 처리를 담당하는 서비스
 */
export const FortuneEncyclopediaDetailService = {
  /**
   * [특정 운세 상세 조회]
   * @param fortuneId - developer_fortune_id
   * 테이블: developer_fortunes
   */
  async getFortuneById(fortuneId: string): Promise<Fortune> {
    const { data, error } = await supabase
      .from("developer_fortunes")
      .select(
        `
        id: developer_fortune_id,
        code: developer_fortune_code,
        name: developer_fortune_name,
        summary: developer_fortune_one_line_summary,
        description: developer_fortune_description,
        categoryMessage: developer_fortune_category_message
      `,
      )
      .eq("developer_fortune_id", fortuneId)
      .single();

    if (error) {
      console.error("Error fetching fortune detail:", error.message);
      throw new Error("운세 정보를 불러오지 못했습니다.");
    }

    if (!data) {
      throw new Error("해당 운세를 찾을 수 없습니다.");
    }

    return data as Fortune;
  },
};
