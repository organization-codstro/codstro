import { ProjectPage, Todo } from "../project";

export interface ProjectPagesViewProps {
  pages: Array<ProjectPage & { todos: Todo[] }>;
}
