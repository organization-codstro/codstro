import { supabase } from "../../db/supabase/supabase";
import { Major } from "../../types/common/Mbit";

/**
 * [MajorEncyclopediaService]
 * 전공 도감 및 전공 관련 데이터 처리를 담당하는 서비스
 */
export const MajorEncyclopediaDetailService = {
  /**
   * [특정 전공 상세 조회]
   * @param majorId 조회할 전공 ID
   */
  async getMajorById(majorId: string): Promise<Major | null> {
    const { data, error } = await supabase
      .from("majors")
      .select(
        `
        major_id,
        major_name,
        major_description,
        major_recommended_occupation,
        major_strengths,
        major_weaknesses,
        major_stress_management,
        major_annual_income
      `,
      )
      .eq("major_id", majorId)
      .single();

    if (error) return null;
    return data as unknown as Major;
  },
};
