import { ProjectPage, Todo } from "./project";

export interface ProjectPagesSectionProps {
  pages: Array<ProjectPage& { todos: Todo[] }>;
  expandedPage: number | null;
  setExpandedPage: (id: number | null) => void;
  getStatusColor: (status: string) => string;
  onUpdatePage?: (
    pageId: number,
    updates: Partial<ProjectPage & { todos: Todo[] }>
  ) => void;
  onUpdateTodo?: (
    pageId: number,
    todoId: number,
    updates: Partial<Todo>
  ) => void;
  onDeleteTodo?: (pageId: number, todoId: number) => void;
  onDeletePage?: (pageId: number) => void; // 페이지 삭제 추가
  onAddTodo?: (pageId: number, newTodo: Todo) => void;
}
