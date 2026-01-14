// types/pages/Mbit/Mbit.ts

export interface Fortune {
  id: string;
  code: string;
  name: string;
  summary: string;
  description: string;
  categoryMessage: string;
  color: string;
}

/**
 * 유저가 오늘 뽑은 운세 응답 타입
 * user_fortune + developer_fortunes join 결과
 */
export interface UserTodayFortune {
  user_fortune_id: string;
  user_id: string;
  user_fortune_create_date: string;
  developer_fortune_id: number;
  developer_fortunes: Fortune;
}

/**
 * Params
 */
export interface GetTodayUserFortuneParams {
  userId: string;
}
