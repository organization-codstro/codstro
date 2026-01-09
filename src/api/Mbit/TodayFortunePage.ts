import { supabase } from "../../db/supabase/supabase";
import { Fortune } from "../../types/Mbit/Mbit";

/**
 * [FortuneService]
 * 오늘의 운세 뽑기 및 당일 운세 기록 관리를 담당하는 서비스
 */
export const FortuneService = {
  /**
   * [오늘의 운세 조회 및 생성]
   * 테이블: user_fortune, developer_fortunes
   * 역할: 유저가 오늘 이미 뽑은 운세가 있는지 확인하고, 없으면 새로 뽑아 DB에 저장합니다.
   */
  async getOrDrawTodayFortune(userId: string): Promise<Fortune> {
    const today = new Date().toISOString().split("T")[0];

    try {
      // 1. 오늘 이미 뽑은 기록이 있는지 확인
      const { data: existingRecord, error: fetchError } = await supabase
        .from("user_fortune")
        .select(
          `
          developer_fortunes (
            developer_fortune_id,
            fortune_code,
            fortune_name,
            fortune_summary,
            fortune_description,
            fortune_category_message,
            fortune_color_gradient
          )
        `
        )
        .eq("user_id", userId)
        .eq("user_fortune_create_date", today)
        .maybeSingle();

      if (existingRecord?.developer_fortunes) {
        return this.mapToFortune(existingRecord.developer_fortunes);
      }

      // 2. 기록이 없다면 전체 운세 중 랜덤으로 하나 선택
      const { data: allFortunes, error: allErr } = await supabase
        .from("developer_fortunes")
        .select("*");

      if (allErr || !allFortunes) throw allErr;

      const randomFortune =
        allFortunes[Math.floor(Math.random() * allFortunes.length)];

      // 3. 선택된 운세를 유저의 오늘 운세로 저장
      const { error: insertError } = await supabase
        .from("user_fortune")
        .insert({
          user_id: userId,
          developer_fortune_id: randomFortune.developer_fortune_id,
          user_fortune_create_date: today,
        });

      if (insertError) throw insertError;

      return this.mapToFortune(randomFortune);
    } catch (error) {
      console.error("[FortuneService Error]:", error);
      throw new Error("오늘의 운세를 가져오는데 실패했습니다.");
    }
  },

  /**
   * DB 데이터를 프론트엔드 Fortune 타입으로 변환
   */
  mapToFortune(data: any): Fortune {
    return {
      id: data.developer_fortune_id,
      code: data.fortune_code,
      name: data.fortune_name,
      summary: data.fortune_summary,
      description: data.fortune_description,
      categoryMessage: data.fortune_category_message,
      color: data.fortune_color_gradient,
    };
  },
};
