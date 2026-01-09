/**
 * [Function: handle_new_user]
 * Auth.users에 새 사용자가 추가되면 public.users 프로필을 생성합니다.
 * 참조 테이블: auth.users -> public.users
 */
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    user_id, 
    user_email, 
    user_name, 
    user_profile_url, 
    user_join_date, 
    user_points
  )
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    now(), 
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;