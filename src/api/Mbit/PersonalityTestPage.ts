import { supabase } from "../../db/supabase/supabase";
import { Personality } from "../../types/api/Mbit/PersonalityTestPage";

/**
 * [PersonalityTestService]
 * MBIT 검사 질문지 로드 및 축 쌍 비교를 통한 최종 결과 상세 정보 조회를 담당합니다.
 */
export const PersonalityTestService = {
  /**
   * [MBIT 테스트 질문지 조회]
   * 테이블: mbit_questions
   * 역할: 척도형(number[]) 데이터가 포함된 MBIT 질문 리스트를 가져옵니다.
   */
  async getMbitQuestions() {
    try {
      const { data, error } = await supabase
        .from("mbit_questions")
        .select(
          `
          mbit_questions_id,
          mbit_questions_content,
          mbit_questions_axis,
          mbit_questions_trait,
          mbit_questions_score_value
        `
        )
        .order("mbit_questions_id", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[PersonalityTestService Error]:", error);
      throw new Error("MBIT 질문지를 불러오지 못했습니다.");
    }
  },

  /**
   * [MBIT 결과 상세 데이터 조회]
   * 테이블: mbit_types
   * 역할: 계산된 4자리 코드(예: ECLB)를 기반으로 성격 유형의 상세 도감 데이터를 가져옵니다.
   */
  async getPersonalityByCode(code: string): Promise<Personality | null> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select("*")
      .eq("mbit_type_code", code)
      .single();

    if (error || !data) {
      console.error("Personality fetch error:", error);
      return null;
    }

    return {
      id: data.mbit_type_id,
      type: data.mbit_type_code,
      name: data.mbit_type_name,
      description: data.mbit_type_description,
      detailedDescription: data.mbit_type_detailed_description,
      strengths: data.mbit_type_strengths,
      weaknesses: data.mbit_type_weaknesses,
      workStyle: data.mbit_type_collaborative_style,
      idealProjects: data.mbit_type_ideal_projects,
      famousDevelopers: data.mbit_type_famous_developers,
    };
  },
};
