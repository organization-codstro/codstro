import { supabase } from "../../db/supabase/supabase";
import {
  Fortune,
  FortuneCategoryMessage,
  FortuneRow,
} from "../../types/common/Mbit";

/**
 * [TodayFortuneService]
 * 오늘의 운세 조회 및 저장 서비스
 */
export const TodayFortuneService = {
  /**
   * 오늘 이미 뽑은 운세 조회
   */
  async getTodayFortune(userId: string): Promise<Fortune | null> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("user_fortunes")
      .select(
        `
      developer_fortunes (
        developer_fortune_id,
        developer_fortune_code,
        developer_fortune_name,
        developer_fortune_one_line_summary,
        developer_fortune_description,
        developer_fortune_category_message
      )
    `,
      )
      .eq("user_id", userId)
      .eq("created_at", today)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data?.developer_fortunes) {
      return null;
    }
    // Supabase join은 배열 또는 단일 객체로 추론될 수 있음
    const fortune = (
      Array.isArray(data.developer_fortunes)
        ? data.developer_fortunes[0]
        : data.developer_fortunes
    ) as FortuneRow;

    return {
      id: fortune.developer_fortune_id,
      code: Number(fortune.developer_fortune_code),
      name: fortune.developer_fortune_name,
      summary: fortune.developer_fortune_one_line_summary,
      description: fortune.developer_fortune_description,
      categoryMessage:
        fortune.developer_fortune_category_message as unknown as FortuneCategoryMessage,
    };
  },

  /**
   * 랜덤 운세 뽑기
   */
  async drawFortune(userId: string): Promise<Fortune> {
    const today = new Date().toISOString().split("T")[0];

    /**
     * 전체 운세 조회
     */
    const { data: fortunes, error: fetchError } = await supabase.from(
      "developer_fortunes",
    ).select(`
        developer_fortune_id,
        developer_fortune_code,
        developer_fortune_name,
        developer_fortune_one_line_summary,
        developer_fortune_description,
        developer_fortune_category_message
      `);

    if (fetchError) {
      throw fetchError;
    }

    if (!fortunes || fortunes.length === 0) {
      throw new Error("운세 데이터가 존재하지 않습니다.");
    }

    /**
     * 랜덤 선택
     */
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    /**
     * 유저 운세 저장
     */
    const { error: insertError } = await supabase.from("user_fortunes").insert({
      user_id: userId,
      developer_fortune_id: randomFortune.developer_fortune_id,
      created_at: today,
    });

    if (insertError) {
      throw insertError;
    }

    return {
      id: randomFortune.developer_fortune_id,
      code: randomFortune.developer_fortune_code,
      name: randomFortune.developer_fortune_name,
      summary: randomFortune.developer_fortune_one_line_summary,
      description: randomFortune.developer_fortune_description,
      categoryMessage: randomFortune.developer_fortune_category_message,
    };
  },
};
