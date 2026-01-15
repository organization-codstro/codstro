export const majorTestQuestions = [
  {
    id: "1",
    question: "What interests you most?",
    options: [
      { text: "Building user interfaces and experiences", major: "Frontend" },
      { text: "Server logic and databases", major: "Backend" },
      { text: "Mobile apps and cross-platform", major: "Mobile" },
      { text: "Data analysis and machine learning", major: "Data Science" },
    ],
  },
  {
    id: "2",
    question: "Which sounds more exciting?",
    options: [
      { text: "Creating beautiful, interactive websites", major: "Frontend" },
      { text: "Optimizing APIs and databases", major: "Backend" },
      { text: "Developing iOS/Android apps", major: "Mobile" },
      { text: "Training AI models", major: "Data Science" },
    ],
  },
  {
    id: "3",
    question: "Your preferred tools:",
    options: [
      { text: "React, CSS, Design tools", major: "Frontend" },
      { text: "Node.js, Python, SQL", major: "Backend" },
      { text: "Swift, Kotlin, Flutter", major: "Mobile" },
      { text: "Python, Jupyter, TensorFlow", major: "Data Science" },
    ],
  },
];

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
export type MajorQuestionAxis = "E" | "P" | "C" | "R" | "L" | "V" | "B" | "A";

export interface MajorTestQuestionRow {
  major_question_id: string;
  major_question_content: string;
  major_question_axis: MajorQuestionAxis;
  major_question_trait: string;
  major_question_score_value: number[];
}

export const majorTestQuestionRows: MajorTestQuestionRow[] = [
  {
    major_question_id: "Q1",
    major_question_content:
      "사람들과 협업하며 빠르게 프로토타입을 만들어 보는 것을 즐긴다.",
    major_question_axis: "E",
    major_question_trait: "Frontend",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
  {
    major_question_id: "Q2",
    major_question_content:
      "API 설계나 데이터베이스 모델링 같은 보이지 않는 구조를 다듬는 일이 흥미롭다.",
    major_question_axis: "L",
    major_question_trait: "Backend",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
  {
    major_question_id: "Q3",
    major_question_content:
      "새로운 모바일 기기 기능을 활용하여 사용자 경험을 설계하는 것이 즐겁다.",
    major_question_axis: "B",
    major_question_trait: "Mobile",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
  {
    major_question_id: "Q4",
    major_question_content:
      "데이터로부터 인사이트를 찾고 모델을 만들어 검증하는 과정이 흥미롭다.",
    major_question_axis: "V",
    major_question_trait: "Data Science",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
  {
    major_question_id: "Q5",
    major_question_content:
      "성능 최적화와 확장 가능한 시스템 아키텍처 설계에 관심이 많다.",
    major_question_axis: "C",
    major_question_trait: "Backend",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
  {
    major_question_id: "Q6",
    major_question_content:
      "픽셀 단위의 디테일과 인터랙션에 시간을 들이는 편이다.",
    major_question_axis: "A",
    major_question_trait: "Frontend",
    major_question_score_value: [1, 2, 3, 4, 5],
  },
];
