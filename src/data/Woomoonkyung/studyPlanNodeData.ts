import { StudyPlanNode } from "./woomoonkyungData";

/* =========================
   🔹 예시 Study Plan Node 데이터
========================= */
export const existingNodes: StudyPlanNode[] = [
  {
    study_plan_node_id: "1",
    study_plan_id: "1",
    study_plan_node_name: "HTML & CSS Basics",
    description: "Learn semantic HTML and modern CSS",
    start_date: "2025-01-01",
    end_date: "2025-01-07",
    completed: true,
    position: 1,
    created_date: "2024-12-21",
    tech_stack_id: "html-css",
  },
  {
    study_plan_node_id: "2",
    study_plan_id: "2",
    study_plan_node_name: "JavaScript Core",
    description: "Closures, async/await, prototype",
    start_date: "2025-01-08",
    end_date: "2025-01-20",
    completed: false,
    position: 2,
    created_date: "2024-12-21",
    tech_stack_id: "javascript",
  },
];
