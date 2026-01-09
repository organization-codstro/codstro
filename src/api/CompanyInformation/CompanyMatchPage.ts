import { createClient } from "@supabase/supabase-js";
import { generateAiContent } from "../Gemini/Gemini";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * [함수 역할]: 특정 유저와 특정 회사의 AI 매칭 상세 결과(점수, 분석 내용, 개선 제안 등)를 조회합니다.
 * [참조 테이블]: company_user_matches, companys
 * [설명]: 회사의 이름과 매칭 데이터를 함께 가져오기 위해 JOIN 쿼리를 사용합니다.
 */
export const getCompanyMatchDetail = async (
  userId: number,
  companyId: number
) => {
  try {
    const { data, error } = await supabase
      .from("company_user_matches")
      .select(
        `
        *,
        companys (
          company_name
        )
      `
      )
      .eq("user_id", userId)
      .eq("company_id", companyId)
      .maybeSingle(); // 결과가 없어도 에러를 던지지 않고 null 반환

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching match detail:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저의 모든 회사 매칭 이력을 조회합니다.
 * [참조 테이블]: company_user_matches
 * [설명]: 매칭 리스트 페이지 등에서 전체적인 현황을 보여줄 때 사용합니다.
 */
export const getAllUserMatches = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from("company_user_matches")
      .select(
        `
        company_user_matche_id,
        match_rate,
        company_user_matche_created_date,
        company_id,
        companys (
          company_name,
          company_industry
        )
      `
      )
      .eq("user_id", userId)
      .order("company_user_matche_created_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching all matches:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 새로운 AI 매칭 결과를 저장합니다.
 * [참조 테이블]: company_user_matches
 * [설명]: AI 분석이 완료된 후 결과를 DB에 기록할 때 사용합니다.
 */
export const createMatchResult = async (matchData: {
  userId: number;
  companyId: number;
  companyName: string;
  matchRate: number;
  reason: string;
  suggestions: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("company_user_matches")
      .insert([
        {
          user_id: matchData.userId,
          company_id: matchData.companyId,
          company_user_matche_name: `${
            matchData.companyName
          } - ${new Date().toLocaleDateString()}`,
          match_rate: matchData.matchRate,
          company_user_matche_reason: matchData.reason,
          company_user_matche_suggestions: matchData.suggestions,
          company_user_matche_created_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating match result:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저 프로필과 회사 정보를 비교하여 매칭 리포트를 생성합니다.
 * [활용 페이지]: CompanyMatch
 */
export const generateAiMatchReport = async (
  companyName: string,
  companyValues: string,
  userMajor: string
) => {
  const prompt = `
    당신은 전문 커리어 컨설턴트입니다. 
    회사명: ${companyName}
    회사가치: ${companyValues}
    유저전공: ${userMajor}
    
    위 정보를 바탕으로 유저와 회사의 매칭 분석 리포트를 마크다운 형식으로 작성해주세요.
    내용에는 ## Strengths, ## Good Fits, ## Areas to Develop를 포함하고, 
    마지막에 match_rate(0~100 사이의 숫자)를 'SCORE: 숫자' 형식으로 포함해주세요.
  `;
  return await generateAiContent(prompt);
};
