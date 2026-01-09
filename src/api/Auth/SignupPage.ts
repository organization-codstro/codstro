import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../db/firebase/firebase';
import { supabase } from '../../db/supabase/supabase';

export const AuthService = {
  /**
   * [회원가입 및 프로필 생성]
   * 1. (선택) Firebase Storage에 프로필 이미지 업로드
   * 2. Supabase Auth에 계정 생성 (메타데이터로 이름/이미지 전달)
   * 3. DB 트리거에 의해 public.users 테이블에 데이터 자동 생성
   */
  async signUp(email: string, password: string, name: string, profileFile?: File | null) {
    try {
      let profileUrl = null;

      // [Firebase] 이미지 파일이 있다면 업로드 진행
      if (profileFile) {
        const storageRef = ref(storage, `profiles/${Date.now()}_${profileFile.name}`);
        const snapshot = await uploadBytes(storageRef, profileFile);
        profileUrl = await getDownloadURL(snapshot.ref);
      }

      // [Supabase] Auth 회원가입
      // user_metadata에 저장된 값은 DB 트리거에서 new.raw_user_meta_data로 접근 가능합니다.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            avatar_url: profileUrl,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('SignUp Error:', error);
      throw new Error(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.');
    }
  },
};

