import { supabase } from "../../db/supabase/supabase";
import { Major } from "../../types/Mbit/Mbit";

/**
 * [MajorService]
 * 전공 도감 및 전공 관련 데이터 처리를 담당하는 서비스
 */
export const MajorService = {
  /**
   * [전공 목록 조회]
   * 테이블: majors
   * 역할: 도감 리스트에 표시할 모든 전공 데이터를 가져옵니다.
   */
  async getAllMajors(): Promise<Major[]> {
    try {
      const { data, error } = await supabase
        .from("majors")
        .select("*")
        .order("major_id", { ascending: true });

      if (error) throw error;

      // DB 컬럼명을 프론트엔드 Major 타입에 맞게 매핑
      return data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        detailedDescription: item.detailedDescription,
        focus: item.focus,
        careers: item.careers,
        color: item.color,
        salaryRange: item.salaryRange,
        jobOutlook: item.jobOutlook,
        // 배열형 데이터 처리 (PostgreSQL의 text[] 타입 활용)
        keySkills: item.keySkills || [],
        learningPath: item.learningPath || [],
        famousCompanies: item.famousCompanies || [],
        dayInLife: item.dayInLife || [],
        // 아이콘은 클라이언트사이드 매핑 테이블을 사용
      })) as Major[];
    } catch (error) {
      console.error("[MajorService Error]:", error);
      throw new Error("전공 정보를 불러오는 데 실패했습니다.");
    }
  },

  /**
   * [특정 전공 상세 조회]
   * @param majorId 조회할 전공 ID
   */
  async getMajorById(majorId: number): Promise<Major | null> {
    const { data, error } = await supabase
      .from("majors")
      .select("*")
      .eq("major_id", majorId)
      .single();

    if (error) return null;
    return data as unknown as Major;
  },
};
