import { StudyPlanNode } from "../../types/Woomoonkyung/Woomoonkyung";

/* =========================
   🔹 예시 Study Plan Node 데이터
========================= */
export const existingNodes: StudyPlanNode[] = [
  {
    study_plan_node_id: 1,
    study_plan_id: 1,
    study_plan_node_name: "HTML & CSS Basics",
    description: "Learn semantic HTML and modern CSS",
    start_date: "2025-01-01",
    end_date: "2025-01-07",
    completed: true,
    position: 1,
    created_date: "2024-12-21",
    tech_stack_id: 1,
    tech_stack_name: "JavaScript",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    study_plan_node_id: 2,
    study_plan_id: 2,
    study_plan_node_name: "JavaScript Core",
    description: "Closures, async/await, prototype",
    start_date: "2025-01-08",
    end_date: "2025-01-20",
    completed: false,
    position: 2,
    created_date: "2024-12-21",
    tech_stack_id: 2,
    tech_stack_name: "JavaScript",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
];

// WoomoonkyungCreateNode - 노드 설정 화면에서 사용
export const mockPlanInfo = {
  study_plan_id: 1,
  study_plan_name: "React 마스터하기",
  study_plan_description: "React를 기초부터 고급까지 학습하는 계획",
};

export const mockTechStacks = [
  {
    tech_stack_id: 1,
    tech_stack_name: "JavaScript",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
  {
    tech_stack_id: 2,
    tech_stack_name: "React",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
  {
    tech_stack_id: 3,
    tech_stack_name: "TypeScript",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
  {
    tech_stack_id: 4,
    tech_stack_name: "CSS",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
  {
    tech_stack_id: 5,
    tech_stack_name: "Node.js",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
  {
    tech_stack_id: 6,
    tech_stack_name: "Python",
    tech_stack_img_url:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tech_stack_created_date: "2024-01-01",
  },
];
