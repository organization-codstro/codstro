import { ProjectPage, Todo } from "../../../common/projectPlanning";

export interface ProjectPagesViewProps {
  pages: Array<ProjectPage & { todos: Todo[] }>;
}
