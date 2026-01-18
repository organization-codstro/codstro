import { supabase } from "../../db/supabase/supabase";
import { Major } from "../../types/api/Mbit/Mbit";

/**
 * [MajorTestService]
 * 전공 적합성 검사 질문 로드 및 결과 계산 상세 정보 조회를 담당합니다.
 */
export const MajorTestService = {
  /**
   * [전공 테스트 질문지 조회]
   * 테이블: major_questions
   * 역할: DB에 저장된 척도형 질문(score_value 배열 포함)을 가져옵니다.
   */
  async getMajorTestQuestions() {
    try {
      const { data, error } = await supabase
        .from("major_questions")
        .select(
          `
          major_question_id,
          major_question_content,
          major_question_axis,
          major_question_trait,
          major_question_score_value
        `,
        )
        .order("major_question_id", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[MajorTestService Error]:", error);
      throw new Error("질문지를 불러오지 못했습니다.");
    }
  },

  /**
   * [최종 결과 전공 데이터 상세 조회]
   * 테이블: majors
   * 역할: 점수 계산으로 도출된 전공명(trait)을 기반으로 해당 전공의 상세 도감 데이터를 가져옵니다.
   */
  async getMajorDetailByTrait(trait: string): Promise<Major | null> {
    const { data, error } = await supabase
      .from("majors")
      .select("*")
      .eq("major_name", trait)
      .single();

    if (error || !data) {
      console.error("Major detail fetch error:", error);
      return null;
    }

    return {
      id: data.major_id,
      name: data.major_name,
      description: data.major_description,
      jobOutlook: data.major_job_outlook,
      majorStrengths: data.major_strengths,
      majorWeaknesses: data.major_weaknesses,
      majorStrathManagement: data.major_strath_management,
      annualIncome: data.major_annual_income,
    };
  },
};
