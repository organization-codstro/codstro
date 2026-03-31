import { ProjectPage, ProjectPageWithTodos, ProjectTodo } from "../../../common/ProjectPlanning";

export interface ProjectPagesSectionProps {
  projectId : string
  pages: Array<ProjectPage & { todos: ProjectTodo[] }>;
  expandedPage: string | null;
  setExpandedPage: (id: string | null) => void;
  getStatusColor: (status: string) => string;
  onUpdatePage?: (
    pageId: string,
    updates: Partial<ProjectPage & { todos: ProjectTodo[] }>,
  ) => void;
  onUpdateTodo?: (
    pageId: string,
    todoId: string,
    updates: Partial<ProjectTodo>,
  ) => void;
  onDeleteTodo?: (pageId: string, todoId: string) => void;
  onDeletePage?: (pageId: string) => void; // 페이지 삭제 추가
  onAddTodo?: (pageId: string, newTodo: ProjectTodo) => void;
  onAddPage?: (newPage: ProjectPage & { todos: ProjectTodo[] }) => void;
  onSave?: (pages: ProjectPageWithTodos[]) => Promise<void>;
}
