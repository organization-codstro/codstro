export const personalityTestQuestionData = [
  {
    id: "1",
    question: "When starting a new project, do you prefer to:",
    options: [
      { text: "Plan everything in detail before coding", type: "P" },
      { text: "Start coding immediately and figure it out", type: "I" },
    ],
  },
  {
    id: "2",
    question: "How do you approach debugging?",
    options: [
      { text: "Systematic analysis and logging", type: "A" },
      { text: "Try different solutions until it works", type: "E" },
    ],
  },
  {
    id: "3",
    question: "Your ideal work environment is:",
    options: [
      { text: "Quiet and focused, working alone", type: "S" },
      { text: "Collaborative with team discussions", type: "T" },
    ],
  },
  {
    id: "4",
    question: "When learning new technology:",
    options: [
      { text: "Read documentation thoroughly first", type: "D" },
      { text: "Jump into tutorials and examples", type: "H" },
    ],
  },
];

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
export type MbitAxisCode = "E" | "P" | "C" | "R" | "L" | "V" | "B" | "A";

export interface MbitQuestionRow {
  mbit_questions_id: string;
  mbit_questions_content: string;
  mbit_questions_axis: MbitAxisCode;
  mbit_questions_trait: MbitAxisCode;
  mbit_questions_score_value: number[];
}

export const mbitQuestionRows: MbitQuestionRow[] = [
  {
    mbit_questions_id: "M1",
    mbit_questions_content:
      "팀 활동에 적극적으로 참여하고 의견을 제시하는 편이다.",
    mbit_questions_axis: "E",
    mbit_questions_trait: "E",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M2",
    mbit_questions_content: "위험을 감수하기보다 안전한 선택을 선호한다.",
    mbit_questions_axis: "C",
    mbit_questions_trait: "C",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M3",
    mbit_questions_content: "논리적 분석보다 직관적 통찰에 의존하는 편이다.",
    mbit_questions_axis: "V",
    mbit_questions_trait: "V",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M4",
    mbit_questions_content:
      "새로운 방법을 시도하기보다 검증된 절차를 따르는 편이다.",
    mbit_questions_axis: "B",
    mbit_questions_trait: "B",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M5",
    mbit_questions_content: "혼자 집중해서 일하는 시간이 더 생산적이다.",
    mbit_questions_axis: "P",
    mbit_questions_trait: "P",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M6",
    mbit_questions_content:
      "도전적인 목표를 위해 일정 수준의 리스크를 감수할 수 있다.",
    mbit_questions_axis: "R",
    mbit_questions_trait: "R",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M7",
    mbit_questions_content: "사실과 데이터에 기반한 의사결정을 선호한다.",
    mbit_questions_axis: "L",
    mbit_questions_trait: "L",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
  {
    mbit_questions_id: "M8",
    mbit_questions_content:
      "새로운 도구나 프레임워크를 빠르게 시도해보는 것을 즐긴다.",
    mbit_questions_axis: "A",
    mbit_questions_trait: "A",
    mbit_questions_score_value: [1, 2, 3, 4, 5],
  },
];
