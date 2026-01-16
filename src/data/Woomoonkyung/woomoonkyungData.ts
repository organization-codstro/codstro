// Woomoonkyung Study Planning Data Types and Mock Data

import { TechStack } from "../../types/pages/Woomoonjeong/SortableNodeItem/sortableNodeItem";
import {
  StudyPlan,
  StudyPlanNode,
} from "../../types/pages/Woomoonkyung/Woomoonkyung";

// // Mock Data
export const techStacks: TechStack[] = [
  {
    tech_stack_id: "1",
    tech_stack_name: "JavaScript",
    tech_stack_img_url:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    tech_stack_created_date: "2024-01-15T09:00:00Z",
  },
  {
    tech_stack_id: "2",
    tech_stack_name: "React",
    tech_stack_img_url:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    tech_stack_created_date: "2024-01-16T10:00:00Z",
  },
  {
    tech_stack_id: "3",
    tech_stack_name: "Node.js",
    tech_stack_img_url:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    tech_stack_created_date: "2024-01-17T11:00:00Z",
  },
  {
    tech_stack_id: "4",
    tech_stack_name: "TypeScript",
    tech_stack_img_url:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    tech_stack_created_date: "2024-01-18T12:00:00Z",
  },
  {
    tech_stack_id: "5",
    tech_stack_name: "Python",
    tech_stack_img_url:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    tech_stack_created_date: "2024-01-19T13:00:00Z",
  },
  {
    tech_stack_id: "6",
    tech_stack_name: "CSS",
    tech_stack_img_url:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    tech_stack_created_date: "2024-01-20T14:00:00Z",
  },
  {
    tech_stack_id: "7",
    tech_stack_name: "HTML",
    tech_stack_img_url:
      "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
    tech_stack_created_date: "2024-01-21T15:00:00Z",
  },
  {
    tech_stack_id: "8",
    tech_stack_name: "Vue.js",
    tech_stack_img_url:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
    tech_stack_created_date: "2024-01-22T16:00:00Z",
  },
];
export const studyPlans: StudyPlan[] = [
  {
    study_plan_id: "1",
    study_plan_name: "Frontend Development Mastery",
    study_plan_description:
      "Complete frontend development learning path from basics to advanced",
    study_plan_image_url:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    study_plan_start_date: "2024-01-15",
    study_plan_end_date: "2024-04-15",
    study_plan_is_archived: false,
    study_plan_state: "in progress",
    created_at: "2024-01-15T09:00:00Z",
    user_id: "1",
    study_plan_is_recommendation: false,
  },
  {
    study_plan_id: "2",
    study_plan_name: "Backend Development with Node.js",
    study_plan_description:
      "Learn server-side development with Node.js and databases",
    study_plan_image_url:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    study_plan_start_date: "2024-02-01",
    study_plan_end_date: "2024-05-01",
    study_plan_is_archived: false,
    study_plan_state: "waiting",
    created_at: "2024-01-20T10:00:00Z",
    user_id: "1",
    study_plan_is_recommendation: false,
  },
  {
    study_plan_id: "3",
    study_plan_name: "Python Programming Basics",
    study_plan_description:
      "Introduction to Python programming and data structures",
    study_plan_image_url:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    study_plan_start_date: "2023-10-01",
    study_plan_end_date: "2023-12-31",
    study_plan_is_archived: true,
    study_plan_state: "done",
    created_at: "2023-09-25T08:00:00Z",
    user_id: "1",
    study_plan_is_recommendation: true,
  },
];

export const studyPlanNodes: StudyPlanNode[] = [
  {
    study_plan_node_id: "1",
    study_plan_id: "1",
    study_plan_node_name: "HTML Fundamentals",
    study_plan_node_description:
      "Learn HTML structure, semantic elements, and best practices",
    study_plan_node_start_date: "2024-01-15",
    study_plan_node_end_date: "2024-01-25",
    study_plan_node_completed: true,
    study_plan_node_position: 1,
    tech_stack_id: "7",
    tech_stack_name: "HTML",
    tech_stack_img_url: "https://cdn.simpleicons.org/html5/E34F26",
  },
  {
    study_plan_node_id: "2",
    study_plan_id: "1",
    study_plan_node_name: "CSS Styling",
    study_plan_node_description:
      "Master CSS selectors, layouts, and responsive design",
    study_plan_node_start_date: "2024-01-26",
    study_plan_node_end_date: "2024-02-10",
    study_plan_node_completed: true,
    study_plan_node_position: 2,
    tech_stack_id: "6",
    tech_stack_name: "CSS",
    tech_stack_img_url: "https://cdn.simpleicons.org/css/1572B6",
  },
  {
    study_plan_node_id: "3",
    study_plan_id: "1",
    study_plan_node_name: "JavaScript Basics",
    study_plan_node_description:
      "Learn JavaScript fundamentals, DOM manipulation, and ES6+",
    study_plan_node_start_date: "2024-02-11",
    study_plan_node_end_date: "2024-03-05",
    study_plan_node_completed: false,
    study_plan_node_position: 3,
    tech_stack_id: "1",
    tech_stack_name: "JavaScript",
    tech_stack_img_url: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    study_plan_node_id: "4",
    study_plan_id: "1",
    study_plan_node_name: "React Framework",
    study_plan_node_description:
      "Build interactive UIs with React components and hooks",
    study_plan_node_start_date: "2024-03-06",
    study_plan_node_end_date: "2024-04-15",
    study_plan_node_completed: false,
    study_plan_node_position: 4,
    tech_stack_id: "2",
    tech_stack_name: "React",
    tech_stack_img_url: "https://cdn.simpleicons.org/react/61DAFB",
  },

  // Backend Development
  {
    study_plan_node_id: "5",
    study_plan_id: "2",
    study_plan_node_name: "Node.js Fundamentals",
    study_plan_node_description: "Learn Node.js runtime and core modules",
    study_plan_node_start_date: "2024-02-01",
    study_plan_node_end_date: "2024-02-20",
    study_plan_node_completed: false,
    study_plan_node_position: 1,
    tech_stack_id: "3",
    tech_stack_name: "Node.js",
    tech_stack_img_url: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    study_plan_node_id: "6",
    study_plan_id: "2",
    study_plan_node_name: "Express.js Framework",
    study_plan_node_description: "Build REST APIs with Express.js",
    study_plan_node_start_date: "2024-02-21",
    study_plan_node_end_date: "2024-03-15",
    study_plan_node_completed: false,
    study_plan_node_position: 2,
    tech_stack_id: "3",
    tech_stack_name: "Express",
    tech_stack_img_url: "https://cdn.simpleicons.org/express/000000",
  },
];

export const stateColors = {
  waiting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "in progress": "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-green-100 text-green-700 border-green-200",
};

export const bookmarkedPlans = [
  {
    study_plan_id: "1",
    is_bookmarked: true,
  },
  {
    study_plan_id: "2",
    is_bookmarked: false,
  },
  {
    study_plan_id: "3",
    is_bookmarked: true,
  },
];

export const recommendedStudyPlans = studyPlans;
export const recommendedStudyPlanNodes = studyPlanNodes;
