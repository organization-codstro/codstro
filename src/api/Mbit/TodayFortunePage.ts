import { supabase } from "../../db/supabase/supabase";
import { GetOrDrawTodayFortuneParams } from "../../types/api/Mbit/TodayFortunePage";
import { Fortune } from "../../types/common/Mbit";

/**
 * [TodayFortuneService]
 * 오늘의 운세 뽑기 및 당일 운세 기록 관리를 담당하는 서비스
 */
export const TodayFortuneService = {
  /**
   * [오늘의 운세 조회 및 생성]
   * 테이블: user_fortune, developer_fortunes
   * 역할: 유저가 오늘 이미 뽑은 운세가 있는지 확인하고, 없으면 새로 뽑아 DB에 저장합니다.
   */
  async getOrDrawTodayFortune(
    params: GetOrDrawTodayFortuneParams,
  ): Promise<Fortune> {
    const { userId } = params;
    const today = new Date().toISOString().split("T")[0];

    try {
      // 1. 오늘 이미 뽑은 기록이 있는지 확인
      const { data: existingRecord } = await supabase
        .from("user_fortune")
        .select(
          `
          developer_fortunes (
            id : developer_fortune_id,
            code : fortune_code,
            name : fortune_name,
            summary: fortune_summary,
            description: fortune_description,
            message : fortune_category_message,  
          )
        `,
        )
        .eq("user_id", userId)
        .eq("user_fortune_create_date", today)
        .maybeSingle();

      // 2. 전체 운세 조회 후 랜덤 선택
      const { data: allFortunes, error } = await supabase
        .from("developer_fortunes")
        .select("*");

      if (error || !allFortunes) throw error;

      const randomFortune =
        allFortunes[Math.floor(Math.random() * allFortunes.length)];

      // 3. 유저 오늘 운세로 저장
      const { error: insertError } = await supabase
        .from("user_fortune")
        .insert({
          user_id: userId,
          developer_fortune_id: randomFortune.developer_fortune_id,
          user_fortune_create_date: today,
        });

      if (insertError) throw insertError;

      return randomFortune;
    } catch (error) {
      console.error("[FortuneService Error]:", error);
      throw new Error("오늘의 운세를 가져오는데 실패했습니다.");
    }
  },
};
