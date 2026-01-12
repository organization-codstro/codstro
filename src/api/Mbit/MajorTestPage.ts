import { supabase } from "../../db/supabase/supabase";
import {
  MajorQuestionResponse,
  GetMajorResultDetailParams,
  Major,
} from "../../types/api/Mbit/MajorTestPage";

/**
 * [MajorTestService]
 * 전공 테스트 질문 로드 및 결과 계산 후 상세 데이터 조회
 */
export const MajorTestService = {
  /**
   * [전공 테스트 질문지 조회]
   * table: major_questions
   */
  async getMajorQuestions(): Promise<MajorQuestionResponse[]> {
    const { data, error } = await supabase
      .from("major_questions")
      .select(
        `
        id:major_question_id,
        question:major_question_content,
        options:major_question_options
        `
      )
      .order("major_question_id", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * [테스트 결과 전공 상세 조회]
   * table: majors
   */
  async getMajorResultDetail(
    params: GetMajorResultDetailParams
  ): Promise<Major | null> {
    const { majorName } = params;

    const { data, error } = await supabase
      .from("majors")
      .select(
        `
        id:major_id,
        name:major_name,
        description:major_description,
        detailedDescription:major_detailed_description,
        focus:major_focus,
        careers:major_careers,
        color:major_color,
        salaryRange:major_salary_range,
        jobOutlook:major_job_outlook,
        keySkills:major_key_skills,
        learningPath:major_learning_path,
        famousCompanies:major_famous_companies,
        dayInLife:major_day_in_life
        `
      )
      .ilike("major_name", `%${majorName}%`)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      icon: null,
      keySkills: data.keySkills || [],
      learningPath: data.learningPath || [],
      famousCompanies: data.famousCompanies || [],
      dayInLife: data.dayInLife || [],
    };
  },
};
