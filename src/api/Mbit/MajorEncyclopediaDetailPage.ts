import { supabase } from "../../db/supabase/supabase";
import { Major } from "../../types/api/Mbit/Mbit";

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
        id: major_id,
        name: major_name,
        description: major_description,
        annualIncome: major_annual_income,
        jobOutlook: major_recommended_occupation,
        majorStrengths: major_strengths,
        majorWeaknesses: major_weaknesses,
        majorStrathManagement: major_strath_management
      `,
      )
      .eq("major_id", majorId)
      .single();

    if (error) return null;
    return data as unknown as Major;
  },
};
