import { supabase } from "../../db/supabase/supabase";
import { MbitTypeDetail } from "../../types/api/Mbit/PersonalityEncyclopediaDetailPage";

/**
 * [PersonalityEncyclopediaService]
 * MBIT 성격 유형 도감 및 상세 정보를 관리하는 서비스
 */
export const PersonalityEncyclopediaDetailService = {
  /**
   * [특정 성격 유형 상세 조회]
   * @param mbitTypeId - mbit_type_id
   * 테이블: mbit_types
   */
  async getPersonalityById(mbitTypeId: string): Promise<MbitTypeDetail> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select(
        `
        id:mbit_type_id,
        name:mbit_type_name,
        code:mbit_type_code,
        participation:mbit_type_participation,
        risks:mbit_type_risks,
        thought:mbit_type_thought,
        approach:mbit_type_approach,
        recommendedJob:mbit_type_recommended_job,
        recommendedReason:mbit_type_recommended_reason,
        collaborativeStyle:mbit_type_collaborative_style,
        strengths:mbit_type_strengths,
        weaknesses:mbit_type_weaknesses,
        strathManagement:mbit_type_strath_management,
        morningGreetings:mbit_type_morning_greetings,
        nightGreetings:mbit_type_night_greetings,
        userId:user_id,
        createdAt:created_at,
        updatedAt:updated_at
        `,
      )
      .eq("mbit_type_id", mbitTypeId)
      .single();

    if (error) {
      console.error("Error fetching MBIT type detail:", error.message);
      throw new Error("MBIT 성격 유형 정보를 불러오지 못했습니다.");
    }

    if (!data) {
      throw new Error("해당 MBIT 성격 유형을 찾을 수 없습니다.");
    }

    return data as MbitTypeDetail;
  },
};
