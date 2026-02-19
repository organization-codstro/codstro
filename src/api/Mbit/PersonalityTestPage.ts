import { supabase } from "../../db/supabase/supabase";
import { PersonalityDetail } from "../../types/api/Mbit/Mbit";

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
        `,
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
  async getPersonalityByCode(code: string): Promise<PersonalityDetail | null> {
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
      name: data.mbit_type_name,
      code: data.mbit_type_code,
      participation: data.mbit_type_participation,
      risks: data.mbit_type_risks,
      thought: data.mbit_type_thought,
      approach: data.mbit_type_approach,
      recommendedJob: data.mbit_type_recommended_job,
      recommendedReason: data.mbit_type_recommended_reason,
      collaborativeStyle: data.mbit_type_collaborative_style,
      strengths: data.mbit_type_strengths,
      weaknesses: data.mbit_type_weaknesses,
      stressManagement: data.mbit_type_stress_management,
      morningGreetings: data.mbit_type_morning_greetings,
      nightGreetings: data.mbit_type_night_greetings,
      createdAt: data.mbit_type_created_at,
    };
  },
};
