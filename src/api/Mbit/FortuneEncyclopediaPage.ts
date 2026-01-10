import { supabase } from "../../db/supabase/supabase";
import { Fortune } from "../../types/pages/Mbit/Mbit";

/**
 * [FortuneService]
 * 개발 운세 관련 데이터 처리를 담당하는 서비스
 */
export const FortuneService = {
  /**
   * [도감용 모든 운세 목록 조회]
   * 테이블: developer_fortunes
   * 역할: DB에 등록된 모든 개발 운세 종류를 가져와 도감 리스트를 구성합니다.
   */
  async getAllFortunes(): Promise<Fortune[]> {
    const { data, error } = await supabase
      .from("developer_fortunes")
      .select(
        `
        id: developer_fortune_id,
        code: fortune_code,
        name: fortune_name,
        summary: fortune_summary,
        description: fortune_description,
        categoryMessage: fortune_category_message,
        color: fortune_color_gradient
      `
      )
      .order("fortune_code", { ascending: true });

    if (error) {
      console.error("Error fetching fortunes:", error.message);
      throw new Error("운세 목록을 불러오지 못했습니다.");
    }

    return data as Fortune[];
  },

  /**
   * [유저의 오늘 운세 확인/생성]
   * 테이블: user_fortune, developer_fortunes
   * 역할: 유저가 오늘 뽑은 운세가 있는지 확인하고, 없다면 새로 뽑아 저장합니다.
   */
  async getTodayUserFortune(userId: string) {
    const today = new Date().toISOString().split("T")[0];

    // 1. 이미 오늘 뽑은 운세가 있는지 확인
    const { data: existingFortune, error: fetchError } = await supabase
      .from("user_fortune")
      .select("*, developer_fortunes(*)")
      .eq("user_id", userId)
      .eq("user_fortune_create_date", today)
      .single();

    if (existingFortune) return existingFortune;

    const allFortunes = await this.getAllFortunes();
    const randomIndex = Math.floor(Math.random() * allFortunes.length);
    const selectedFortuneId = allFortunes[randomIndex].id;

    const { data: newFortune, error: insertError } = await supabase
      .from("user_fortune")
      .insert({
        user_id: userId,
        developer_fortune_id: selectedFortuneId,
        user_fortune_create_date: today,
      })
      .select("*, developer_fortunes(*)")
      .single();

    if (insertError) throw insertError;
    return newFortune;
  },
};
