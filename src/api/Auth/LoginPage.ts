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
      throw new Error(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.",
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

  /**
   * [현재 로그인된 유저 ID 가져오기]
   * Supabase가 자동으로 관리하는 세션에서 유저 ID를 가져옵니다.
   * @returns 현재 로그인된 사용자의 ID 반환
   */
  async getCurrentUserId(): Promise<string | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      const userId = user?.id;
      return userId ?? null;
    } catch (error) {
      console.error("유저 ID 조회 실패:", error);
      return null;
    }
  },

  /**
   * [리프레시 토큰으로 액세스 토큰 갱신]
   * @returns 새로운 액세스 토큰 반환
   */
  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        throw new Error("리프레시 토큰이 없습니다.");
      }

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) throw error;

      // 새로운 토큰을 로컬스토리지에 저장
      if (data.session) {
        localStorage.setItem("access_token", data.session.access_token);
        localStorage.setItem("refresh_token", data.session.refresh_token);
        return data.session.access_token;
      }

      return null;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      // 리프레시 실패 시 로컬스토리지 클리어
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  },

  /**
   * [로그아웃]
   * 세션을 종료하고 로컬스토리지의 토큰을 삭제합니다.
   */
  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 로컬스토리지 토큰 삭제
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  },
};
