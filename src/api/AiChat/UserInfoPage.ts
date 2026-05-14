// services/UserRecordService.ts
import { supabase } from "../../db/supabase/supabase";
import {
  GetUserRecordParams,
  GetUserRecordResponse,
  UpdateUserRecordParams,
  UpdateUserRecordResponse,
  GenerateUserSummaryParams,
  GenerateUserSummaryResponse,
} from "../../types/api/AiChat/UserInfoPage";

/**
 * 유저 활동 기록(ai_user_records) 관리를 위한 서비스
 */
export const UserInfoService = {
  /**
   * [유저 기록 조회]
   * 특정 유저의 AI 기반 활동 요약 기록을 가져옵니다.
   * 참조 테이블: ai_user_records
   */
  async getUserRecord(
    params: GetUserRecordParams,
  ): Promise<GetUserRecordResponse> {
    const { data, error } = await supabase
      .from("ai_user_records")
      .select("*")
      .eq("user_id", params.userId)
      .maybeSingle();

    if (error) throw new Error(`[getUserRecord Error]: ${error.message}`);
    return data;
  },

  /**
   * [유저 기록 생성]
   * 해당하는 유저에 대항하는 기록이 없으면 생성합니다.
   */
  async createUserRecord(params: { userId: string; summary: string }) {
    const { data, error } = await supabase
      .from("ai_user_records")
      .insert({
        user_id: params.userId,
        ai_user_record_summary: params.summary,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  /**
   * [유저 기록 업데이트]
   * 유저가 직접 수정한 요약본 내용을 저장합니다.
   * 수정 시 created_at 현재 시간으로 갱신합니다.
   * 참조 테이블: ai_user_records
   */
  async updateUserRecord(
    params: UpdateUserRecordParams,
  ): Promise<UpdateUserRecordResponse> {
    const { data, error } = await supabase
      .from("ai_user_records")
      .update({
        ai_user_record_summary: params.summary,
        created_at: new Date().toISOString(),
      })
      .eq("ai_user_record_id", params.recordId)
      .select()
      .maybeSingle();

    if (error) throw new Error(`[updateUserRecord Error]: ${error.message}`);
    return data;
  },
};

/**
 * [UserInfo, 여러 서비스에서 사용 하기는 하는데 방법이랑 구조 설정해서 만들기]
 * 유저의 최근 대화 내역을 바탕으로 AI가 유저 레코드를 자동 생성합니다.
 */
export const AiSummaryService = {
  async generateUserSummary(
    params: GenerateUserSummaryParams,
  ): Promise<GenerateUserSummaryResponse> {
    const prompt = `
      Based on the following recent conversation history:
      ${params.recentMessages.join("\n")}
      
      Summarize the user's interests, personality traits, and preferences in 3-4 sentences.
      Language: Korean.
    `;

    const { data, error } = await supabase.functions.invoke(
      "gemini-summarize",
      {
        body: { prompt, userId: params.userId },
      },
    );

    if (error) throw new Error(`[Summary Error]: ${error.message}`);
    return data.summary;
  },
};
