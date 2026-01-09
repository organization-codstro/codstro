import { supabase } from "../../db/supabase/supabase";
import { Personality } from "../../types/Mbit/Mbit";

/**
 * [PersonalityService]
 * MBIT 성격 유형 도감 및 상세 정보를 관리하는 서비스
 */
export const PersonalityService = {
  /**
   * [성격 유형 전체 목록 조회]
   * 테이블: mbit_types
   * 역할: DB에 저장된 16가지 MBIT 성격 유형의 요약 정보를 가져옵니다.
   */
  async getAllPersonalities(): Promise<Personality[]> {
    try {
      const { data, error } = await supabase
        .from("mbit_types")
        .select("*")
        .order("mbit_types_id", { ascending: true });

      if (error) throw error;

      return data.map((item) => ({
        id: item.id,
        type: item.code,
        name: item.name,
        description: item.description, // 스키마 확장 필요
        detailedDescription: item.detailedDescription,
        strengths: item.strengths || [],
        weaknesses: item.weaknesses || [],
        workStyle: item.collaborative_style,
        idealProjects: item.idealProjects || [], // 스키마 확장 필요
        famousDevelopers: item.famousDevelopers || [], // 스키마 확장 필요
      })) as Personality[];
    } catch (error) {
      console.error("[PersonalityService Error]:", error);
      throw new Error("성격 유형 데이터를 불러오지 못했습니다.");
    }
  },

  /**
   * [특정 MBIT 코드로 결과 조회]
   * @param code 'PASD', 'IETH' 등의 MBIT 결과 코드
   */
  async getPersonalityByCode(code: string): Promise<Personality | null> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select("*")
      .eq("mbit_type_code", code)
      .single();

    if (error || !data) return null;
    return data as unknown as Personality;
  },
};
