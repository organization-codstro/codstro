import type { AuthResponse } from "@supabase/supabase-js";

/**
 * [AuthService Types]
 * AuthService에서 사용하는 params 및 반환 타입 정의
 */

export interface SignUpParams {
  email: string;
  password: string;
  name: string;
  profileFile?: File | null;
}

export type SignUpResponse = AuthResponse["data"];
