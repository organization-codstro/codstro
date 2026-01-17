/**

* AI 페르소나의 기본 정보를 정의
*/
export interface AIPersona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_gender: string;
  ai_persona_personality: string;
  ai_persona_preferred_features: string;
  ai_persona_image_url?: string;
}
