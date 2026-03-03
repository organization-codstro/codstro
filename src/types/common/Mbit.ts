export interface Fortune {
  id: string;
  code: number;
  name: string;
  summary: string;
  description: string;
  categoryMessage: {
    daily: string;
    meeting: string;
    development: string;
  };
}

export interface FortuneList {
  id: string;
  code: number;
  name: string;
  summary: string;
}

export interface Major {
  major_id: string; // uuid
  major_name: string;
  major_description: string;
  major_recommended_occupation: string;
  major_strengths: string;
  major_weaknesses: string;
  major_stress_management: string;
  major_annual_income: number;
  created_at?: string;
  updated_at?: string;
}

export interface Personality {
  id: string;
  name: string;
  code: string;
  participation: string;
  risks: string;
  thought: string;
  approach: string;
  /**권장 직무 */
  recommendedJob: string;
  /**협업 스타일 */
  collaborativeStyle: string;
  /**강점 */
  strengths: string;
  /**약점 */
  weaknesses: string;
  /**스트래스 관리법 */
  stressManagement: string;
  /**아침인사 */
  morningGreetings: string;
  /**저녁 인사 */
  nightGreetings: string;
  createdAt: string;
}

//질문 타입
export interface QuestionOption {
  text: string;
  type: string;
}
