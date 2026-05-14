import { supabase } from "../../db/supabase/supabase";
import { GetPersonalityByCodeParams } from "../../types/api/Mbit/PersonalityEncyclopediaListPage";
import { Personality } from "../../types/common/Mbit";

/**
 * [PersonalityEncyclopediaService]
 * MBIT 성격 유형 도감 및 상세 정보를 관리하는 서비스
 */
export const PersonalityEncyclopediaListService = {
  /**
   * [성격 유형 전체 목록 조회]
   * 테이블: mbit_types
   * 역할: DB에 저장된 16가지 MBIT 성격 유형의 요약 정보를 가져옵니다.
   */
  /**
   * [성격 유형 전체 목록 조회]
   * 테이블: mbit_types
   */
  async getAllPersonalities(): Promise<Personality[]> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select(
        `
        id:mbit_type_id,
        code:mbit_type_code,
        name:mbit_type_name,
        description:mbit_type_description,
        participation:mbit_type_participation,
        strengths:mbit_type_strengths,
        weaknesses:mbit_type_weaknesses,
        workStyle:mbit_type_collaborative_style,
        approach:mbit_type_approach,
        recommendedJob:mbit_type_recommended_job,
        risks:mbit_type_risks,
        thought:mbit_type_thought,
        stressManagement:mbit_type_stress_management,
        collaborativeStyle:mbit_type_collaborative_style,
        morningGreetings:mbit_type_morning_greetings,
        nightGreetings:mbit_type_night_greetings,
        createdAt:created_at
        `,
      )
      .order("mbit_type_id", { ascending: true });

    if (error) throw error;

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [특정 MBIT 코드로 결과 조회]
   * @param code 'PASD', 'IETH' 등의 MBIT 결과 코드
   */
  async getPersonalityByCode(
    params: GetPersonalityByCodeParams,
  ): Promise<Personality | null> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select("*")
      .eq("mbit_type_code", params.code)
      .single();

    if (error || !data) return null;
    return data;
  },
};
