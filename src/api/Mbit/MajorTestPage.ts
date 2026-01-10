import { supabase } from "../../db/supabase/supabase";
import { Major } from "../../types/pages/Mbit/Mbit";

/**
 * [MajorTestService]
 * 전공 테스트 질문 로드 및 결과 계산 후 상세 데이터 조회를 담당합니다.
 */
export const MajorTestService = {
  /**
   * [전공 테스트 질문지 로드]
   * 테이블: major_questions
   * 역할: DB에 저장된 전공 적합성 검사 질문과 선택지 데이터를 가져옵니다.
   */
  async getMajorQuestions() {
    try {
      const { data, error } = await supabase
        .from("major_questions")
        .select("*")
        .order("major_question_id", { ascending: true });

      if (error) throw error;

      // DB 데이터를 컴포넌트 형식에 맞게 매핑
      return data.map((q) => ({
        id: q.major_question_id,
        question: q.major_question_content,
        // options는 DB에 JSONB 타입으로 저장하거나 별도 매핑 테이블을 권장합니다.
        options: q.major_question_options,
      }));
    } catch (error) {
      console.error("[MajorTestService Error]:", error);
      throw new Error("질문지를 불러오지 못했습니다.");
    }
  },

  /**
   * [테스트 결과 전공 상세 정보 조회]
   * 테이블: majors
   * 역할: 계산된 전공 이름(예: 'Frontend')을 바탕으로 실제 DB의 전공 상세 정보를 가져옵니다.
   */
  async getMajorResultDetail(majorName: string): Promise<Major | null> {
    const { data, error } = await supabase
      .from("majors")
      .select("*")
      .ilike("major_name", `%${majorName}%`) // 이름 기반 검색
      .single();

    if (error) {
      console.error("Result fetch error:", error);
      return null;
    }

    // 이전 MajorService에서 정의한 매핑 로직 적용 (생략 가능)
    return data as unknown as Major;
  },
};
