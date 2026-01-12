// services/PersonalityTestService.ts

import { supabase } from "../../db/supabase/supabase";

import {
  Personality,
  PersonalityTestQuestion,
  GetPersonalityResultParams,
} from "../../types/api/Mbit/PersonalityTestPage";

/**
 * [PersonalityTestService]
 * MBIT 성격 테스트 질문 로드 및 결과 계산 데이터 조회를 담당합니다.
 */
export const PersonalityTestService = {
  /**
   * [MBIT 테스트 질문지 조회]
   * 테이블: mbit_questions
   */
  async getTestQuestions(): Promise<PersonalityTestQuestion[]> {
    const { data, error } = await supabase
      .from("mbit_questions")
      .select("*")
      .order("mbit_questions_id", { ascending: true });

    if (error) throw error;

    return (data || []).map((q) => {
      const traits = q.mbit_questions_trait.split("|");

      return {
        id: q.mbit_questions_id,
        question: q.mbit_questions_content,
        options: [
          {
            text: q.mbit_questions_option_1,
            type: traits[0],
          },
          {
            text: q.mbit_questions_option_2,
            type: traits[1],
          },
        ],
      };
    });
  },

  /**
   * [MBIT 결과 상세 데이터 조회]
   * 테이블: mbit_types
   */
  async getPersonalityResult(
    params: GetPersonalityResultParams
  ): Promise<Personality | null> {
    const { typeCode } = params;

    const { data, error } = await supabase
      .from("mbit_types")
      .select(
        `
        id:mbit_types_id,
        type:mbit_type_code,
        name:mbit_type_name,
        description:mbit_type_description,
        detailedDescription:mbit_type_detailed_description,
        strengths:mbit_type_strengths,
        weaknesses:mbit_type_weaknesses,
        workStyle:mbit_type_collaborative_style,
        idealProjects:mbit_type_ideal_projects,
        famousDevelopers:mbit_type_famous_developers
        `
      )
      .eq("mbit_type_code", typeCode)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
      idealProjects: data.idealProjects || [],
      famousDevelopers: data.famousDevelopers || [],
    };
  },
};
