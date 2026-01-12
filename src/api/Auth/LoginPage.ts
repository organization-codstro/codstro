import { supabase } from "../../db/supabase/supabase";
import {
  SignInParams,
  SignInResponse,
  GetCurrentUserResponse,
} from "../../types/api/Auth/LoginPage";

/**
 * [AuthService]
 * 사용자의 인증 정보 및 세션을 관리하는 서비스 레이어입니다.
 */
export const LoginService = {
  /**
   * [로그인]
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @table auth.users (Supabase 내부 테이블 사용)
   * @returns 로그인 성공 시 user 객체 반환
   */
  async signIn(params: SignInParams): Promise<SignInResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      // 에러 메시지를 한국어로 변환하거나 그대로 throw
      throw new Error(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다."
      );
    }
  },

  /**
   * [현재 세션 확인]
   * 앱 로드 시 현재 로그인된 상태인지 체크합니다.
   */
  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) return null;
    return session?.user ?? null;
  },
};
