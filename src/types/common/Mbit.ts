/**
 * MBIT 검사 – 질문 테이블 스키마 (척도형)
 * - mbit_questions_id: string; 고유 ID
 * - mbit_questions_content: string; 질문 내용
 * - mbit_questions_axis: 'E'|'P'|'C'|'R'|'L'|'V'|'B'|'A' 중 하나; 축(참여, 리스크, 사고, 접근) 기준의 단일 특성 코드
 * - mbit_questions_trait: string; 선택 시 점수를 가산할 MBIT 코드 (E|P|C|R|L|V|B|A)
 * - mbit_questions_score_value: number[]; 척도 값 배열 (예: [1,2,3,4,5])
 *
 * 검사/채점 방식
 * - 각 문항은 척도 선택(예: [1,2,3,4,5])으로 응답합니다.
 * - 선택한 값(예: 4)을 해당 문항의 mbit_questions_trait 점수에 가산합니다.
 * - 모든 문항 응답 후 축 쌍(E/P, C/R, L/V, B/A)에서 더 큰 점수를 가진 코드를 선택해 4글자 결과를 만듭니다.
 */
export type MbitAxisCode =
  | "E"
  | "P"
  | "C"
  | "S"
  | "L"
  | "N"
  | "B"
  | "A"
  | "T"
  | "I";
export interface MbitQuestionRow {
  mbit_questions_id: string;
  mbit_questions_content: string;
  mbit_questions_axis: MbitAxisCode;
  mbit_questions_trait: MbitAxisCode;
  mbit_questions_score_value: number[];
}

/**
 * Major Test Question Table Schema
 * - major_question_id: string; 고유 ID
 * - major_question_content: string; 질문 내용
 * - major_question_axis: 'E'|'P'|'C'|'R'|'L'|'V'|'B'|'A'; 검사 축 (참여(E/P), 리스크(C/R), 사고(L/V), 접근(B/A))
 * - major_question_trait: string; 질문에 긍정(동의) 응답 시 가산될 전공(예: 'Frontend', 'Backend', 'Mobile', 'Data Science' 등)
 * - major_question_score_value: number[]; 선택형 척도(예: [1,2,3,4,5])
 *   - 배열 길이만큼 선택지가 생성되고, 선택된 자리의 값을 점수로 가산합니다.
 *
 * 검사 방식
 * - 각 문항은 동의/비동의로 응답합니다.
 * - 동의 시 해당 문항의 major_question_trait에 major_question_score_value 만큼 점수를 가산합니다.
 * - 비동의 시 점수 변화는 없습니다.
 */

export interface MajorTestQuestionRow {
  major_question_id: string;
  major_question_content: string;
  major_question_axis: string;
  major_question_trait: string;
  major_question_score_value: number[];
}

export interface FortuneCategoryMessage {
  daily: string;
  meeting: string;
  development: string;
}

export interface Fortune {
  id: string;
  code: number;
  name: string;
  summary: string;
  description: string;
  categoryMessage: FortuneCategoryMessage;
}

export interface FortuneRow {
  developer_fortune_id: string;
  developer_fortune_code: string;
  developer_fortune_name: string;
  developer_fortune_one_line_summary: string;
  developer_fortune_description: string;
  developer_fortune_category_message: string;
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

export type MbitAxisResult = {
  axis: string;
  winner: string;
  loser: string;
  winnerScore: number;
  loserScore: number;
  winnerRatio: number;
  loserRatio: number;
};

export type PersonalityTestResultData = {
  personality: Personality;
  axisResults: MbitAxisResult[];
  finalCode: string;
};
