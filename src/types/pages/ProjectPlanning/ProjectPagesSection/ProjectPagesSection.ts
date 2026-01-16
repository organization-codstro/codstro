import { ProjectPage, Todo } from "../project";


export interface ProjectPagesSectionProps {
  pages: Array<ProjectPage& { todos: Todo[] }>;
  expandedPage: string | null;
  setExpandedPage: (id: string | null) => void;
  getStatusColor: (status: string) => string;
  onUpdatePage?: (
    pageId: string,
    updates: Partial<ProjectPage & { todos: Todo[] }>
  ) => void;
  onUpdateTodo?: (
    pageId: string,
    todoId: string,
    updates: Partial<Todo>
  ) => void;
  onDeleteTodo?: (pageId: string, todoId: string) => void;
  onDeletePage?: (pageId: string) => void; // 페이지 삭제 추가
  onAddTodo?: (pageId: string, newTodo: Todo) => void;
}
