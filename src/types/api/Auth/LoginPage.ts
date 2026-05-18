import type { User } from "@supabase/supabase-js";
/**
 * [AuthService Types]
 * AuthService에서 사용하는 params 및 반환 타입 정의
 */

export interface SignInParams {
  email: string;
  password: string;
}

export type SignInResponse = User | null;

export type GetCurrentUserResponse = User | null;
