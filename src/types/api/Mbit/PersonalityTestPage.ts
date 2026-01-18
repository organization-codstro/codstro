/**
 * [PersonalityTestQuestionOption]
 * MBIT 질문 선택지 타입
 */
export interface PersonalityTestQuestionOption {
  text: string;
  type: string;
}

/**
 * [PersonalityTestQuestion]
 * MBIT 테스트 질문 타입
 */
export interface PersonalityTestQuestion {
  id: string;
  question: string;
  options: PersonalityTestQuestionOption[];
}

/**
 * [GetPersonalityResultParams]
 * MBIT 결과 조회 파라미터
 */
export interface GetPersonalityResultParams {
  typeCode: string;
}
