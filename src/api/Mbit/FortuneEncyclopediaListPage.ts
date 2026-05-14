// services/FortuneService.ts
import { supabase } from "../../db/supabase/supabase";
import { FortuneList } from "../../types/common/Mbit";

/**
 * [FortuneEncyclopediaService]
 * 개발 운세 관련 데이터 처리를 담당하는 서비스
 */
export const FortuneEncyclopediaListService = {
  /**
   * [도감용 모든 운세 목록 조회]
   * 테이블: developer_fortunes
   * getFortunesByCodeRange 가 있어서 지금은 사용하지 않음
   */
  // async getAllFortunes(): Promise<Fortune[]> {
  //   const { data, error } = await supabase
  //     .from("developer_fortunes")
  //     .select(
  //       `
  //       id: developer_fortune_id,
  //       code: developer_fortune_code,
  //       name: developer_fortune_name,
  //       summary: developer_fortune_one_line_summary,
  //       description: developer_fortune_description,
  //       categoryMessage: developer_fortune_category_message
  //     `,
  //     )
  //     .order("developer_fortune_code", { ascending: true });
  //   if (error) {
  //     console.error("Error fetching fortunes:", error.message);
  //     throw new Error("운세 목록을 불러오지 못했습니다.");
  //   }
  //   return data as Fortune[];
  // },

  /**
   * [특정 코드 대역 운세 조회]
   *
   * 전달받은 code 값을 기준으로
   * 해당 숫자 대역에 속하는 developer_fortune_code 운세들을 반환합니다.
   *
   * 예:
   * 100 → 100 ~ 199
   * 200 → 200 ~ 299
   *
   * @param code - 시작 코드 (예: 100, 200, 300)
   * @returns Promise<Fortune[]>
   */
  async getFortunesByCodeRange(code: number): Promise<FortuneList[]> {
    const { data, error } = await supabase
      .from("developer_fortunes")
      .select(
        `
      id: developer_fortune_id,
      code: developer_fortune_code,
      name: developer_fortune_name,
      summary: developer_fortune_one_line_summary
    `,
      )
      .gte("developer_fortune_code", code)
      .lt("developer_fortune_code", code + 100)
      .order("developer_fortune_code", { ascending: true });

    if (error) {
      console.error("Error fetching fortunes by code range:", error.message);
      throw new Error("해당 코드 대역의 운세를 불러오지 못했습니다.");
    }

    return data;
  },
};
