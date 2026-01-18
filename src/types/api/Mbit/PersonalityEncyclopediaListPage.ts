export interface Personality {
  id: string;
  type: string;
  name: string;
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  idealProjects: string[];
  famousDevelopers: string[];
}

/**
 * [PersonalitySummaryResponse]
 * MBIT 성격 유형 도감 리스트용 타입
 */
export interface PersonalitySummaryResponse {
  id: string;
  type: string;
  name: string;
  description: string;
  participation: string;
  strengths: string;
  weaknesses: string;
  workStyle: string;
  approach: string;
  recommendedJob: string;
}

/**
 * [GetPersonalityByCodeParams]
 * 특정 MBIT 코드로 성격 유형 조회 파라미터
 */
export interface GetPersonalityByCodeParams {
  code: string;
}
