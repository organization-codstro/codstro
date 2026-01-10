import { supabase } from "../../db/supabase/supabase";
import { Personality } from "../../types/pages/Mbit/Mbit";

/**
 * [PersonalityTestService]
 * MBIT 성격 테스트 질문 로드 및 결과 계산 데이터 조회를 담당합니다.
 */
export const PersonalityTestService = {
  /**
   * [MBIT 테스트 질문지 조회]
   * 테이블: mbit_questions
   * 역할: DB에 저장된 4개 축(참여, 리스크, 사고, 접근) 기준의 질문들을 가져옵니다.
   */
  async getTestQuestions() {
    try {
      const { data, error } = await supabase
        .from("mbit_questions")
        .select("*")
        .order("mbit_questions_id", { ascending: true });

      if (error) throw error;

      return data.map((q) => ({
        id: q.mbit_questions_id,
        question: q.mbit_questions_content,
        options: [
          {
            text: q.mbit_questions_option_1,
            type: q.mbit_questions_trait.split("|")[0],
          },
          {
            text: q.mbit_questions_option_2,
            type: q.mbit_questions_trait.split("|")[1],
          },
        ],
      }));
    } catch (error) {
      console.error("[PersonalityTestService Error]:", error);
      throw new Error("질문지를 불러오는 데 실패했습니다.");
    }
  },

  /**
   * [MBIT 결과 상세 데이터 조회]
   * 테이블: mbit_types
   * 역할: 생성된 4자리 코드(예: PASD)를 통해 성격 유형의 상세 정보를 가져옵니다.
   */
  async getPersonalityResult(typeCode: string): Promise<Personality | null> {
    const { data, error } = await supabase
      .from("mbit_types")
      .select("*")
      .eq("mbit_type_code", typeCode)
      .single();

    if (error || !data) {
      console.error("Result fetch error:", error);
      return null;
    }

    return {
      id: data.mbit_types_id,
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
